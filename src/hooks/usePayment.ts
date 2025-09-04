// hooks/usePayment.ts
"use client";

import { v4 as uuidv4 } from "uuid";
import { useStore } from "@/store/useStore";
import { useCheckout } from "@/hooks/useCheckout";
import { showSwal } from "@/components/Alert";

export function usePayment() {
  const { clearCart, addTransaction, updateTransaction, cart, user } =
    useStore();
  const { mutate, isPending } = useCheckout();

  /**
   * currentPayment = transaksi yang sedang berlangsung (sementara)
   * sebelum benar-benar masuk ke daftar transaksi (transactions).
   * isinya data: id, orderId, items, total, status sementara, snapToken.
   *
   * setCurrentPayment = setter untuk mengubah/menghapus currentPayment.
   */
  const payWithSnap = (snapToken: string, orderId: string) => {
    const currentPayment = useStore.getState().currentPayment;
    const setCurrentPayment = useStore.getState().setCurrentPayment;

    // Pastikan Snap JS tersedia
    if (!window.snap)
      return showSwal({
        type: "info",
        title: "Informasi",
        icon: "error",
        text: "Pembayaran sedang tidak bisa dilakukan",
      });

    // Buka popup Snap Payment
    window.snap.pay(
      snapToken,
      {
        // ✅ Jika pembayaran sukses
        onSuccess: () => {
          if (currentPayment) {
            addTransaction({ ...currentPayment, status: "settlement" });
            setCurrentPayment(null);
          } else {
            updateTransaction(orderId, "settlement");
          }
          clearCart(); // kosongkan keranjang setelah berhasil
        },
        // 🕒 Jika masih menunggu pembayaran (pending)
        onPending: () => {
          if (currentPayment) {
            addTransaction(currentPayment);
            setCurrentPayment(null);
            clearCart();
          }
        },
        // ❌ Jika gagal/error
        onError: () => {
          if (currentPayment) {
            addTransaction({ ...currentPayment, status: "failed" });
          } else {
            updateTransaction(orderId, "failed");
          }

          setCurrentPayment(null);
        },
        // ⚠️ Jika user menutup popup tanpa bayar
        onClose: () => {
          console.log("Snap modal ditutup, token tetap ada");
          setCurrentPayment(null);
        },
      },
      {
        skipOrderSummary: true,
        autoClose: true,
      }
    );
  };

  /**
   * handleCheckout = fungsi utama untuk memulai proses checkout
   * - validasi user login
   * - request token + orderId dari backend (mutate)
   * - simpan transaksi sementara ke currentPayment
   * - jalankan Snap popup via payWithSnap
   */
  const handleCheckout = () => {
    if (!cart.length) return;
    if (!user)
      return showSwal({
        type: "info",
        title: "Informasi",
        icon: "warning",
        text: "Please login first.",
      });

    mutate(
      {
        items: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        username: user?.username ?? "Guest",
        email: user?.email ?? "guest@example.com",
      },
      {
        onSuccess: (res) => {
          // Simpan transaksi sementara (currentPayment) dengan status "pending" agar bisa diproses
          useStore.getState().setCurrentPayment({
            id: uuidv4(),
            orderId: res.orderId,
            items: cart,
            total: res.total,
            status: "pending",
            createdAt: Date.now(),
            snapToken: res.snapToken,
          });

          // Buka Snap Payment
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

  /**
   * cancelTransaction = membatalkan transaksi yang statusnya masih pending.
   * - hanya bisa cancel transaksi dengan status pending
   * - hapus snapToken supaya tidak bisa dipakai lagi
   */
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

    updateTransaction(orderId, "cancel");
  };

  return { handleCheckout, payWithSnap, cancelTransaction, isPending };
}
