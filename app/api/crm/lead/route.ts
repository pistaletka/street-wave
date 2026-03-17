import { NextResponse } from "next/server";
import { createLead, type LeadSource } from "@/lib/amocrm";
import { notifyOwner, confirmToClient } from "@/lib/whatcrm";

const VALID_SOURCES: LeadSource[] = [
  "place-order",
  "brand-project",
  "live-customization",
  "general",
  "shop-order",
];

export async function POST(request: Request) {
  console.log("ENV_CHECK subdomain:", process.env.AMOCRM_SUBDOMAIN);
  console.log("ENV_CHECK token length:", process.env.AMOCRM_TOKEN?.length);
  console.log("ENV_CHECK token first 20:", process.env.AMOCRM_TOKEN?.slice(0, 20));
  try {
    const body = await request.json();
    const { name, phone, email, source, leadName, price, note, customFields, tracking } = body;

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
      tracking,
    });

    // Fire-and-forget: send WhatCRM notifications (don't block response)
    notifyOwner({ source, name, phone, email, leadName, note }).catch(() => {});
    confirmToClient(phone).catch(() => {});

    return NextResponse.json({ success: true, leadId });
  } catch (err) {
    console.error("CRM lead creation error:", err);
    return NextResponse.json(
      { error: "Ошибка создания сделки в CRM" },
      { status: 500 }
    );
  }
}
