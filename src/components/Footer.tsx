"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0e141b] text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="text-xl font-bold text-white">
            NextStore
          </Link>
          <p className="mt-3 text-sm opacity-70 leading-relaxed">
            Belanja dengan cerdas bersama Shop. Produk terbaik dengan pengalaman
            modern dan transparan.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-white mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-green-400 transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/transactions"
                className="hover:text-green-400 transition-colors"
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="hover:text-green-400 transition-colors"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-white mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/terms"
                className="hover:text-green-400 transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-green-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Shop. All rights reserved.
      </div>
    </footer>
  );
}
