import { NextResponse } from "next/server";
import { createInvoice } from "@/lib/paykeeper";
import { createLead } from "@/lib/amocrm";
import { notifyOwner, confirmToClient } from "@/lib/whatcrm";
import { generateOrderId } from "@/lib/generateOrderId";
import { formatPrice } from "@/lib/formatPrice";
import productsIndex from "@/content/products/index.json";
import type { BuyerInfo, OrderItem } from "@/types/order";

interface RequestBody {
  items: OrderItem[];
  buyer: BuyerInfo;
  total: number;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { items, buyer, total } = body;

    if (!items?.length || !buyer?.name || !buyer?.email || !buyer?.phone || !buyer?.address) {
      return NextResponse.json(
        { error: "Заполните все обязательные поля" },
        { status: 400 }
      );
    }

    // Validate prices against source of truth
    let verifiedTotal = 0;
    for (const item of items) {
      const product = productsIndex.find((p) => p.slug === item.slug);
      if (!product) {
        return NextResponse.json(
          { error: `Товар "${item.slug}" не найден` },
          { status: 400 }
        );
      }
      if (product.status === "sold") {
        return NextResponse.json(
          { error: `Товар "${product.title}" уже продан` },
          { status: 400 }
        );
      }
      if (product.price !== item.price) {
        return NextResponse.json(
          { error: `Неверная цена для "${product.title}"` },
          { status: 400 }
        );
      }
      verifiedTotal += product.price;
    }

    if (verifiedTotal !== total) {
      return NextResponse.json(
        { error: "Неверная итоговая сумма" },
        { status: 400 }
      );
    }

    const orderId = generateOrderId();

    // Create lead in AmoCRM
    const itemsList = items.map((i) => `${i.title} — ${formatPrice(i.price)}`).join("\n");
    try {
      await createLead({
        name: buyer.name,
        phone: buyer.phone,
        email: buyer.email,
        source: "shop-order",
        leadName: `Магазин: заказ ${orderId}`,
        price: verifiedTotal,
        note: [
          `Заказ: ${orderId}`,
          `Товары:\n${itemsList}`,
          `Адрес: ${buyer.address}`,
          buyer.comment ? `Комментарий: ${buyer.comment}` : "",
        ]
          .filter(Boolean)
          .join("\n\n"),
      });
    } catch (crmErr) {
      console.error("CRM lead creation failed (non-blocking):", crmErr);
    }

    // Fire-and-forget: WhatCRM notifications
    notifyOwner({
      source: "shop-order",
      name: buyer.name,
      phone: buyer.phone,
      email: buyer.email,
      leadName: `Магазин: заказ ${orderId}`,
      note: `Товары:\n${itemsList}\n\nСумма: ${formatPrice(verifiedTotal)}`,
    }).catch(() => {});
    confirmToClient(buyer.phone).catch(() => {});

    // Create PayKeeper invoice
    const paymentUrl = await createInvoice({
      orderId,
      amount: verifiedTotal,
      clientId: buyer.name,
      clientEmail: buyer.email,
      clientPhone: buyer.phone,
      serviceDescription: `Заказ ${orderId}: ${items.map((i) => i.title).join(", ")}`,
    });

    return NextResponse.json({ paymentUrl, orderId });
  } catch (err) {
    console.error("Payment create error:", err);
    return NextResponse.json(
      { error: "Ошибка при создании заказа" },
      { status: 500 }
    );
  }
}
