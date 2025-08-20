"use client";

import React from "react";
import { useStore } from "@/store/useStore";

export const ProductCard = ({ product }: { product: any }) => {
  const addToCart = useStore((s) => s.addToCart);

  return (
    <div className="bg-white/5 h-full border border-black/70 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mx-auto"
      />
      <h3 className="mt-3 font-medium line-clamp-2">{product.title}</h3>
      <p className="mt-1 text-sm opacity-80 line-clamp-2">{product.category}</p>
      <div className="mt-auto flex items-center justify-between pt-3">
        <span className="font-semibold">${product.price}</span>
        <button
          onClick={() =>
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              quantity: 1,
              image: product.image,
            })
          }
          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
};
