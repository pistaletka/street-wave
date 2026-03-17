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

  if (searchRes.ok && searchRes.status !== 204) {
    const text = await searchRes.text();
    const searchData = text ? JSON.parse(text) : null;
    if (searchData?._embedded?.contacts?.[0]) {
      const existingContact = searchData._embedded.contacts[0];
      const contactId = existingContact.id;

      // Update contact: name, phone, email
      const updateFields: { field_code: string; values: { value: string; enum_code?: string }[] }[] = [];
      if (data.phone) {
        updateFields.push({ field_code: "PHONE", values: [{ value: data.phone, enum_code: "WORK" }] });
      }
      if (data.email) {
        updateFields.push({ field_code: "EMAIL", values: [{ value: data.email, enum_code: "WORK" }] });
      }

      const updateBody: Record<string, unknown> = {};
      if (data.name && data.name !== existingContact.name) {
        updateBody.name = data.name;
      }
      if (updateFields.length > 0) {
        updateBody.custom_fields_values = updateFields;
      }

      if (Object.keys(updateBody).length > 0) {
        await fetch(`${baseUrl}/contacts/${contactId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateBody),
        });
      }

      return contactId;
    }
  }

  // Create new contact
  const customFields: { field_code: string; values: { value: string; enum_code?: string }[] }[] = [];
  if (data.phone) {
    customFields.push({ field_code: "PHONE", values: [{ value: data.phone, enum_code: "WORK" }] });
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
  | "live-customization"
  | "general"
  | "shop-order";

interface TrackingData {
  form_name?: string;
  metrika_client_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  yclid?: string;
  page_url?: string;
  page_title?: string;
  referrer?: string;
  lead_source_readable?: string;
}

interface CreateLeadParams {
  name: string;
  phone?: string;
  email?: string;
  source: LeadSource;
  leadName: string;
  price?: number;
  note?: string;
  customFields?: Record<string, string>;
  tracking?: TrackingData;
}

// Маппинг названий полей → ID полей в amoCRM
// После создания полей в amoCRM замените значения на реальные ID
const TRACKING_FIELD_IDS: Record<string, number> = {
  // Наши кастомные поля (уникальные)
  lead_source_readable: 3029943, // "Источник лида"
  metrika_client_id: 3029945,    // "Metrika Client ID"
  page_url: 3029959,             // "Страница заявки"
  form_name: 3029963,            // "Название формы"
  // Встроенные поля amoCRM (tracking_data)
  utm_source: 2073839,
  utm_medium: 2073835,
  utm_campaign: 2073837,
  utm_content: 2073833,
  utm_term: 2073841,
  yclid: 2073867,
  referrer: 2073847,
};

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

  // Формируем кастомные поля из трекинга
  const customFieldsValues: { field_id: number; values: { value?: string | number; enum_id?: number }[] }[] = [];
  if (params.tracking) {
    for (const [key, fieldId] of Object.entries(TRACKING_FIELD_IDS)) {
      const value = params.tracking[key as keyof TrackingData];
      if (fieldId && value) {
        customFieldsValues.push({
          field_id: fieldId,
          values: [{ value }],
        });
      }
    }
  }

  // Enum-поля из формы (Тип изделия, Кто закупает)
  if (params.customFields?.itemType) {
    customFieldsValues.push({
      field_id: 2264109, // Тип изделия (multiselect)
      values: [{ enum_id: Number(params.customFields.itemType) }],
    });
  }
  if (params.customFields?.ownItem) {
    customFieldsValues.push({
      field_id: 2264111, // Кто закупает (select)
      values: [{ enum_id: Number(params.customFields.ownItem) }],
    });
  }

  const leadData = await amoFetch("/leads", [
    {
      name: params.leadName,
      price: params.price || 0,
      custom_fields_values: customFieldsValues.length > 0 ? customFieldsValues : undefined,
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
