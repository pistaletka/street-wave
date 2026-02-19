import crypto from "crypto";

const SERVER = process.env.PAYKEEPER_SERVER!;
const LOGIN = process.env.PAYKEEPER_LOGIN!;
const PASSWORD = process.env.PAYKEEPER_PASSWORD!;

const basicAuth = Buffer.from(`${LOGIN}:${PASSWORD}`).toString("base64");

async function pkFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${SERVER}${path}`, {
    ...options,
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayKeeper ${res.status}: ${text}`);
  }
  return res;
}

async function getToken(): Promise<string> {
  const res = await pkFetch("/info/settings/token/");
  const data = await res.json();
  return data.token;
}

interface CreateInvoiceParams {
  orderId: string;
  amount: number;
  clientId: string;
  clientEmail: string;
  clientPhone?: string;
  serviceDescription: string;
}

export async function createInvoice(
  params: CreateInvoiceParams
): Promise<string> {
  const token = await getToken();

  const body = new URLSearchParams({
    pay_amount: params.amount.toFixed(2),
    clientid: params.clientId,
    orderid: params.orderId,
    client_email: params.clientEmail,
    service_name: params.serviceDescription,
    token,
  });

  if (params.clientPhone) {
    body.set("client_phone", params.clientPhone);
  }

  const res = await pkFetch("/change/invoice/preview/", {
    method: "POST",
    body: body.toString(),
  });

  const data = await res.json();
  // data.invoice_id -> redirect URL
  const invoiceId = data.invoice_id;
  return `${SERVER}/bill/${invoiceId}/`;
}

export function verifyCallback(
  body: Record<string, string>,
  secret: string
): boolean {
  const { id, sum, clientid, orderid, key } = body;
  const expected = crypto
    .createHash("md5")
    .update(`${id}${sum}${clientid}${orderid}${secret}`)
    .digest("hex");
  return key === expected;
}
