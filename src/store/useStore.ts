import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItemProps = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

export type UserProps = {
  username: string;
  email: string;
};

export type TxStatus = "pending" | "success" | "cancel";

export type TransactionProps = {
  id: string;
  orderId: string;
  items: CartItemProps[];
  total: number;
  status: TxStatus;
  createdAt: number;
  snapToken?: string;
};

type StoreProps = {
  user: UserProps | null;
  cart: CartItemProps[];
  transactions: TransactionProps[];
  currentPayment: TransactionProps | null;
  setUser: (user: UserProps | null) => void;
  addToCart: (item: CartItemProps) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  setCurrentPayment: (tx: TransactionProps | null) => void;
  addTransaction: (tx: TransactionProps) => void;
  updateTransaction: (orderId: string, status: TxStatus) => void;
};

export const useStore = create<StoreProps>()(
  persist(
    (set, get) => ({
      user: null,
      cart: [],
      transactions: [],
      currentPayment: null,
      setUser: (user) => set({ user }),
      addToCart: (item) =>
        set((state) => {
          const idx = state.cart.findIndex((i) => i.id === item.id);

          if (idx !== -1) {
            const updated = [...state.cart];
            updated[idx] = {
              ...updated[idx],
              quantity: updated[idx].quantity + item.quantity,
            };
            return { cart: updated };
          }

          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (id) =>
        set((s) => ({ cart: s.cart.filter((i) => i.id !== id) })),
      updateQty: (id, quantity) =>
        set((s) => ({
          cart: s.cart.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
      clearCart: () => set({ cart: [] }),
      setCurrentPayment: (tx) => set({ currentPayment: tx }),
      addTransaction: (tx) =>
        set((s) => ({ transactions: [tx, ...s.transactions] })),
      updateTransaction: (orderId, status) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.orderId === orderId ? { ...t, status } : t
          ),
        })),
    }),
    {
      name: "ecom-demo-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
        transactions: state.transactions,
        currentPayment: state.currentPayment,
      }),
    }
  )
);
