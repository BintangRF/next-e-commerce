"use client";

import { usePayment } from "@/hooks/usePayment";
import React from "react";

type Props = {
  total: number;
};

export const CartSummary = ({ total }: Props) => {
  const { handleCheckout, isPending } = usePayment();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-lg">Total</span>
        <span className="text-xl font-semibold">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => handleCheckout()}
        disabled={isPending}
        className={`w-full md:w-auto px-5 py-2 rounded-xl text-white ${
          isPending
            ? "bg-gray-400 cursor-not-allowed!"
            : "bg-emerald-600 hover:bg-emerald-500"
        }`}
      >
        {isPending ? "Processing..." : "Checkout with Midtrans"}
      </button>
    </div>
  );
};
