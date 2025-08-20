"use client";

import React from "react";
import { useStore } from "@/store/useStore";

type Props = {
  id: number;
  image?: string;
  title: string;
  price: number;
  quantity: number;
};

export const CartItem = ({ id, image, title, price, quantity }: Props) => {
  const { removeFromCart, updateQty } = useStore();

  const minQty = () => {
    if (quantity === 1) {
      removeFromCart(id);
    }

    updateQty(id, Math.max(1, quantity - 1));
  };

  const plusQty = () => {
    updateQty(id, quantity + 1);
  };

  return (
    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
      <img src={image} className="h-12 w-12 object-contain" alt={title} />
      <div className="flex-1">
        <p className="line-clamp-1">{title}</p>
        <p className="opacity-70 text-sm">${price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => minQty()}
          className="px-2 py-1 bg-white/10 rounded"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => plusQty()}
          className="px-2 py-1 bg-white/10 rounded"
        >
          +
        </button>
      </div>

      <button
        onClick={() => removeFromCart(id)}
        className="px-3 py-1 bg-rose-600 rounded-xl"
      >
        Remove
      </button>
    </li>
  );
};
