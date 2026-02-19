import { NextResponse } from "next/server";
import { createLead, type LeadSource } from "@/lib/amocrm";

const VALID_SOURCES: LeadSource[] = [
  "place-order",
  "brand-project",
  "general",
  "shop-order",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, source, leadName, price, note, customFields } = body;

    if (!name || !source || !leadName) {
      return NextResponse.json(
        { error: "Обязательные поля: name, source, leadName" },
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
    });

    return NextResponse.json({ success: true, leadId });
  } catch (err) {
    console.error("CRM lead creation error:", err);
    return NextResponse.json(
      { error: "Ошибка создания сделки в CRM" },
      { status: 500 }
    );
  }
}
