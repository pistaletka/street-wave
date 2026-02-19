import { NextResponse } from "next/server";
import { verifyCallback } from "@/lib/paykeeper";

const SECRET = process.env.PAYKEEPER_PASSWORD!;

export async function POST(request: Request) {
  try {
    const text = await request.text();
    const params = Object.fromEntries(new URLSearchParams(text));

    const isValid = verifyCallback(params, SECRET);

    if (!isValid) {
      console.error("PayKeeper callback: invalid signature", params);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 403 }
      );
    }

    const { id, orderid } = params;
    console.log(`Payment confirmed: PayKeeper ID=${id}, Order=${orderid}`);

    // TODO: mark products as sold in content/products/index.json
    // In production, this would update a database.

    // PayKeeper expects "OK" + invoice id in response
    return new NextResponse(`OK ${id}`, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    console.error("PayKeeper callback error:", err);
    return NextResponse.json(
      { error: "Callback processing error" },
      { status: 500 }
    );
  }
}
