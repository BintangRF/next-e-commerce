"use client";

import { useStore } from "@/store/useStore";
import { CartList } from "@/components/CartComponents/CartList";
import { CartSummary } from "@/components/CartComponents/CartSummary";
import { Section } from "@/components/Section";
import { ShoppingCart } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { usePayment } from "@/hooks/usePayment";

export default function CartPage() {
  const { cart } = useStore();
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <Section>
      {/* Header */}
      <SectionTitle align="left">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-7 h-7 text-indigo-500" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Your Cart
          </h1>
        </div>
      </SectionTitle>

      <div className="mt-8">
        {!cart.length ? (
          <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-center">
            <ShoppingCart className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-lg font-medium text-gray-600">
              Your cart is empty
            </p>
            <p className="text-sm text-gray-400">
              Browse products and add them to your cart.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-4 md:p-6 space-y-4">
              <CartList />
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 h-fit sticky top-24">
              <CartSummary total={total} />
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
