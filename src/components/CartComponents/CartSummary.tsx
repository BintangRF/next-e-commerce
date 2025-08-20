"use client";

import React from "react";

type Props = {
  total: number;
  checkout: () => void;
};

export const CartSummary = ({ total, checkout }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-lg">Total</span>
        <span className="text-xl font-semibold">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={checkout}
        className="w-full md:w-auto px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
      >
        Checkout with Midtrans
      </button>
    </div>
  );
};
