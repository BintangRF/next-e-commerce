# E-Commerce Portfolio

Website e-commerce sederhana untuk portofolio, menggunakan Next.js (App Router) dan beberapa library modern.

## Fitur

- Landing page menampilkan produk dari [FakeStoreAPI](https://fakestoreapi.com/).
- Register dan login user disimpan di **localStorage** (tidak pakai database).
- Cart & transaksi disimpan di localStorage.
- Checkout menggunakan **Midtrans Snap Sandbox**.
- Riwayat transaksi dengan status **success / pending / cancel**.
- Dark theme dengan TailwindCSS.
- Zustand dengan persist untuk menjaga state antar-refresh.

## Teknologi

- Next.js (App Router)
- TailwindCSS
- Zustand + Persist (localStorage)
- React Query
- React Hook Form
- Midtrans Snap Sandbox
- FakeStoreAPI (gratis)

## Setup

1. Clone repository

```bash
git clone <repo-url>
cd <repo-folder>
npm install
```

2. Tambahkan file `.env.local`

```env
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxxxxxx
```

> Ambil key dari [Midtrans Sandbox Dashboard](https://dashboard.sandbox.midtrans.com/)

3. Jalankan proyek

```bash
npm run dev
```

4. Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Folder

```
app/
  page.tsx              # Landing Page
  login/page.tsx        # Login Page
  register/page.tsx     # Register Page
  cart/page.tsx         # Cart & Checkout
  transactions/page.tsx # Transaction History
  api/
    checkout/route.ts   # Midtrans Snap API Route
    midtrans/callback/route.ts  # Optional webhook logger
components/
  Navbar.tsx
  ProductCard.tsx
  AuthForm.tsx
  TransactionCard.tsx
lib/
  api.ts                # React Query fetchers
  store.ts              # Zustand + Persist
types/
  global.d.ts           # global type declarations
```

## Cara Pakai

1. Register user atau login dengan akun yang sudah didaftarkan.
2. Tambahkan produk ke cart dari landing page.
3. Buka halaman `/cart` dan klik **Checkout with Midtrans**.
4. Pilih metode pembayaran sandbox.
5. Setelah selesai, cek `/transactions` untuk melihat status transaksi.

## Catatan

- Semua data disimpan di **localStorage**.
- Callback Midtrans hanya dicatat di console log (tanpa database).
- Untuk produksi, disarankan menyimpan transaksi di database dan verifikasi webhook.
