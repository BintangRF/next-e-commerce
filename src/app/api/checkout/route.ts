import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const order_id = "Order-" + uuidv4();

    const parameter = {
      transaction_details: {
        order_id,
        gross_amount: body.total,
      },
      credit_card: { secure: true },
      customer_details: {
        first_name: body.username ?? "Guest",
        email: body.email ?? "guest@example.com",
      },
    } as any;

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      snapToken: transaction.token,
      redirectUrl: transaction.redirect_url,
      orderId: order_id,
    });
  } catch (error: any) {
    console.error("Checkout error: ", error);
    return NextResponse.json(
      { error: error?.message ?? "Unknown Error" },
      { status: 500 }
    );
  }
}
