const SUBDOMAIN = process.env.AMOCRM_SUBDOMAIN!;
const TOKEN = process.env.AMOCRM_TOKEN!;

const baseUrl = `https://${SUBDOMAIN}.amocrm.ru/api/v4`;

async function amoFetch(path: string, body: unknown) {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AmoCRM ${res.status}: ${text}`);
  }
  return res.json();
}

interface ContactData {
  name: string;
  phone?: string;
  email?: string;
}

async function findOrCreateContact(data: ContactData): Promise<number> {
  // Try to find by email or phone
  const query = data.email || data.phone || data.name;
  const searchRes = await fetch(
    `${baseUrl}/contacts?query=${encodeURIComponent(query)}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );

  if (searchRes.ok) {
    const searchData = await searchRes.json();
    if (searchData?._embedded?.contacts?.[0]) {
      return searchData._embedded.contacts[0].id;
    }
  }

  // Create new contact
  const customFields: { field_code: string; values: { value: string }[] }[] = [];
  if (data.phone) {
    customFields.push({ field_code: "PHONE", values: [{ value: data.phone }] });
  }
  if (data.email) {
    customFields.push({ field_code: "EMAIL", values: [{ value: data.email }] });
  }

  const created = await amoFetch("/contacts", [
    {
      name: data.name,
      custom_fields_values: customFields.length > 0 ? customFields : undefined,
    },
  ]);

  return created._embedded.contacts[0].id;
}

export type LeadSource =
  | "place-order"
  | "brand-project"
  | "general"
  | "shop-order";

interface CreateLeadParams {
  name: string;
  phone?: string;
  email?: string;
  source: LeadSource;
  leadName: string;
  price?: number;
  note?: string;
  customFields?: Record<string, string>;
}

export async function createLead(params: CreateLeadParams): Promise<number> {
  const contactId = await findOrCreateContact({
    name: params.name,
    phone: params.phone,
    email: params.email,
  });

  const tags = [
    { name: "сайт" },
    { name: params.source },
  ];

  const leadData = await amoFetch("/leads", [
    {
      name: params.leadName,
      price: params.price || 0,
      _embedded: {
        tags,
        contacts: [{ id: contactId }],
      },
    },
  ]);

  const leadId: number = leadData._embedded.leads[0].id;

  // Add note if provided
  if (params.note) {
    await amoFetch(`/leads/${leadId}/notes`, [
      {
        note_type: "common",
        params: { text: params.note },
      },
    ]);
  }

  return leadId;
}
