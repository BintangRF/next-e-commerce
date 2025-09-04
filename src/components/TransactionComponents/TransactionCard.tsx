import { usePayment } from "@/hooks/usePayment";
import { TransactionProps } from "@/store/useStore";
import React from "react";

export const TransactionCard = ({ tx }: { tx: TransactionProps }) => {
  const { payWithSnap, cancelTransaction } = usePayment();

  return (
    <div className="bg-white/50 border border-black/70 rounded-2xl p-4 backdrop-blur-2xl shadow-lg flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span
          className={
            "px-2 py-1 rounded text-xs text-white font-semibold " +
            (tx.status === "settlement"
              ? "bg-emerald-600"
              : tx.status === "pending"
              ? "bg-amber-600"
              : "bg-rose-600")
          }
        >
          {tx.status}
        </span>
      </div>

      <div className="mt-3 text-sm space-y-1 flex-1">
        {tx.items.map((i) => (
          <div key={i.id} className="flex justify-between">
            <span className="line-clamp-1">
              {i.title} × {i.quantity}
            </span>
            <span>${(i.price * i.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-white/10 pt-3">
        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-semibold">${tx.total.toFixed(2)}</span>
        </div>
        <p className="mt-2 opacity-60 text-xs">
          {new Date(tx.createdAt).toLocaleString()}
        </p>
      </div>

      {tx.status === "pending" && tx.snapToken && (
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={() => payWithSnap(tx.snapToken!, tx.orderId)}
            className="w-full rounded-lg bg-amber-500 text-white py-2 text-sm font-medium hover:bg-amber-600"
          >
            Continue Payment
          </button>

          <button
            onClick={() => {
              const confirmed = window.confirm(
                "Apakah kamu yakin ingin membatalkan transaksi ini?"
              );
              if (confirmed) cancelTransaction(tx.orderId);
            }}
            className="w-full rounded-lg bg-rose-500 text-white py-2 text-sm font-medium hover:bg-rose-600"
          >
            Cancel Transaction
          </button>
        </div>
      )}
    </div>
  );
};
