// hooks/usePayment.ts
"use client";

import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useCheckout } from "@/hooks/useCheckout";
import { showSwal } from "@/components/Alert";

export function usePayment() {
  const {
    clearCart,
    transactions,
    addTransaction,
    updateTransaction,
    cart,
    user,
  } = useStore();
  const router = useRouter();
  const { mutate } = useCheckout();

  const payWithSnap = (snapToken: string, orderId: string) => {
    if (!window.snap)
      return showSwal({
        type: "info",
        title: "Informasi",
        icon: "error",
        text: "Pembayaran sedang tidak bisa dilakukan",
      });

    window.snap.pay(snapToken, {
      onSuccess: () => {
        updateTransaction(orderId, "success");
        clearCart();
        window.location.href = "/transactions";
      },
      onPending: () => {
        updateTransaction(orderId, "pending");
        clearCart();
        window.location.href = "/transactions";
      },
      onError: () => {
        updateTransaction(orderId, "cancel");
        clearCart();
        window.location.href = "/transactions";
      },
      onClose: () => {
        console.log("Snap modal ditutup, token tetap ada");
      },
    });
  };

  const handleCheckout = (total: number) => {
    if (!total) return;
    if (!user)
      return showSwal({
        type: "info",
        title: "Informasi",
        icon: "warning",
        text: "Please login first.",
      });

    mutate(
      {
        total: Math.round(total),
        username: user?.username ?? "Guest",
        email: user?.email ?? "guest@example.com",
      },
      {
        onSuccess: (res) => {
          addTransaction({
            id: uuidv4(),
            orderId: res.orderId,
            items: cart,
            total,
            status: "pending",
            createdAt: Date.now(),
            snapToken: res.snapToken,
          });

          payWithSnap(res.snapToken, res.orderId);
        },
        onError: (err) => {
          console.error("Checkout error:", err);
          showSwal({
            type: "info",
            title: "Informasi",
            icon: "error",
            text: "Checkout gagal, coba lagi nanti.",
          });
        },
      }
    );
  };

  const cancelTransaction = (orderId: string) => {
    const tx = useStore
      .getState()
      .transactions.find((t) => orderId === t.orderId);

    if (!tx)
      return showSwal({
        type: "info",
        title: "Informasi",
        icon: "warning",
        text: "Transaksi tidak ditemukan.",
      });

    if (tx.status !== "pending")
      return showSwal({
        type: "info",
        title: "Informasi",
        icon: "warning",
        text: "Hanya transaksi pending yang bisa dibatalkan.",
      });

    if (tx) tx.snapToken = undefined;

    updateTransaction(orderId, "cancel");
  };

  return { handleCheckout, payWithSnap, cancelTransaction };
}
