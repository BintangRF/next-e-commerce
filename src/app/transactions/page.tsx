"use client";

import { useStore } from "@/store/useStore";
import { usePayment } from "@/hooks/usePayment";
import { Section } from "@/components/Section";
import { ReceiptText, PackageX } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import React from "react";
import { TransactionTable } from "@/components/TransactionComponents/TransactionTable";

export default function TransactionsPage() {
  const transactions = useStore((s) => s.transactions);

  return (
    <Section>
      {/* Header */}
      <SectionTitle align="left">
        <div className="flex items-center gap-2">
          <ReceiptText className="w-6 h-6 text-green-400" />
          <h1 className="text-2xl font-bold tracking-tight">
            Transaction History
          </h1>
        </div>
      </SectionTitle>

      <div className="mt-8">
        {/* Empty State */}
        {!transactions.length ? (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl opacity-70 border border-dashed border-gray-300 bg-gray-50">
            <PackageX className="w-12 h-12 mb-4 text-red-400 animate-pulse" />
            <p className="text-lg font-medium">No transactions yet</p>
            <p className="text-sm text-muted-foreground">
              Your transactions will appear here after purchase.
            </p>
          </div>
        ) : (
          <TransactionTable transactions={transactions} />
        )}
      </div>
    </Section>
  );
}
