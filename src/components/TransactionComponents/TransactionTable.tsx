import React from "react";
import { usePayment } from "@/hooks/usePayment";
import { showSwal } from "../Alert";

interface TransactionTableProps {
  transactions: any[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const { payWithSnap, cancelTransaction } = usePayment();

  const handleConfirmCancle = async (orderId: string) => {
    const confirmed = await showSwal({
      type: "confirm",
      title: "Cancle Transaksi?",
      text: "Apakah kamu yakin ingin membatalkan transaksi ini?",
    });

    if (confirmed) {
      cancelTransaction(orderId);
    } else {
      console.log("Batal menghapus");
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Items
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions?.map((tx: any, index: number) => (
            <tr
              key={tx.id}
              className="odd:bg-white/50 even:bg-gray-100/50 hover:bg-gray-200 transition-colors duration-150"
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2 text-sm">
                <ul className="space-y-1">
                  {tx.items.map((i: any) => (
                    <li key={i.id} className="truncate">
                      {i.title} × {i.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 text-right font-semibold">
                ${tx.total.toFixed(2)}
              </td>
              <td className="px-4 py-2 text-sm opacity-70">
                {new Date(tx.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${
                    tx.status === "success"
                      ? "bg-emerald-600"
                      : tx.status === "pending"
                      ? "bg-amber-600"
                      : "bg-rose-600"
                  }`}
                >
                  {tx.status}
                </span>
              </td>
              <td className="px-4 py-2 text-center space-x-2 flex flex-col items-center justify-center gap-1">
                {tx.status === "pending" && tx.snapToken && (
                  <>
                    <button
                      onClick={() => payWithSnap(tx.snapToken!, tx.orderId)}
                      className="px-2 py-1 rounded bg-amber-500 text-white text-xs font-medium hover:bg-amber-600 transition-colors"
                    >
                      Continue
                    </button>
                    <button
                      onClick={() => {
                        handleConfirmCancle(tx.orderId);
                      }}
                      className="px-2 py-1 rounded bg-rose-500 text-white text-xs font-medium hover:bg-rose-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
