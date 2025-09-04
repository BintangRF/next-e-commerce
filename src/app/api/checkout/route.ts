import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data: allProducts } = await axios.get(
      "https://fakestoreapi.com/products"
    );

    // hitung total
    let gross_amount = 0;
    const item_details = body.items.map(
      (cartItem: { id: number; quantity: number }) => {
        const product = allProducts.find((p: any) => p.id === cartItem.id);

        if (!product)
          throw new Error(`Product dengan id ${cartItem.id} tidak ada`);

        const price = Math.round(product.price);

        const subTotal = price * cartItem.quantity;
        gross_amount += Math.round(subTotal);

        return {
          id: String(product.id),
          price,
          quantity: cartItem.quantity,
          name: product.title.substring(0, 50),
        };
      }
    );

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const order_id = "Order-" + uuidv4();

    const parameter = {
      transaction_details: {
        order_id,
        gross_amount,
      },
      item_details,
      credit_card: { secure: true },
      customer_details: {
        first_name: body.username ?? "Guest",
        email: body.email ?? "guest@example.com",
      },
      callbacks: {
        finish: "/payment-notification",
        error: "/payment-notification",
        pending: "/payment-notification",
      },
      finish_redirect_url: "/payment-notification",
      pending_redirect_url: "/payment-notification",
      error_redirect_url: "/payment-notification",
    } as any;

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      snapToken: transaction.token,
      orderId: order_id,
      total: Math.round(gross_amount),
    });
  } catch (error: any) {
    console.error("Checkout error: ", error);
    return NextResponse.json(
      { error: error?.message ?? "Unknown Error" },
      { status: 500 }
    );
  }
}
