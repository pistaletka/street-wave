import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createLead, type LeadSource } from "@/lib/amocrm";
import { notifyOwner, confirmToClient } from "@/lib/whatcrm";
import { confirmByEmail } from "@/lib/email";
import { isValidPhone } from "@/lib/validatePhone";

const VALID_SOURCES: LeadSource[] = [
  "place-order",
  "brand-project",
  "live-customization",
  "live-event",
  "general",
  "contacts",
  "shop-order",
];

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get("sw-locale")?.value || "ru";

    const body = await request.json();
    const { name, phone, email, source, leadName, price, note, customFields, tracking } = body;

    if (!name || !source || !leadName) {
      return NextResponse.json(
        { error: "Обязательные поля: name, source, leadName" },
        { status: 400 }
      );
    }

    if (phone && !isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Некорректный номер телефона" },
        { status: 400 }
      );
    }

    if (!VALID_SOURCES.includes(source)) {
      return NextResponse.json(
        { error: `Неизвестный source: ${source}` },
        { status: 400 }
      );
    }

    const leadId = await createLead({
      name,
      phone,
      email,
      source,
      leadName,
      price,
      note,
      customFields,
      tracking,
    });

    // Fire-and-forget: send notifications (don't block response)
    notifyOwner({ source, name, phone, email, leadName, note }).catch(() => {});
    confirmToClient(phone).catch(() => {});
    if (email) confirmByEmail({ to: email, name, source, locale }).catch(() => {});

    return NextResponse.json({ success: true, leadId });
  } catch (err) {
    console.error("CRM lead creation error:", err);
    return NextResponse.json(
      { error: "Ошибка создания сделки в CRM" },
      { status: 500 }
    );
  }
}
