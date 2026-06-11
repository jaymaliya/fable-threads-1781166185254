"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCart } from "../../components/cart-context";
import { formatINR } from "../../lib/products";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", address: "", pincode: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));
  const valid = form.name.trim() && form.phone.replace(/\D/g, "").length >= 10 && form.address.trim() && form.pincode.replace(/\D/g, "").length === 6;

  const placeOrder = () => {
    setOrderId("FB" + Date.now().toString().slice(-8));
    setPlaced(true);
    clear();
  };

  if (placed) return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
      <CheckCircle2 size={56} className="text-primary" strokeWidth={1.25} />
      <h1 className="mt-6 font-display text-3xl">Order placed</h1>
      <p className="mt-3 text-muted">Order <span className="text-ink font-medium">{orderId}</span> is confirmed. We&apos;ll reach out on your phone to arrange payment &amp; delivery.</p>
      <Link href="/" className="mt-8 rounded-brand bg-primary px-6 py-3 font-medium text-primary-ink">Back to store</Link>
    </main>
  );

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"><ArrowLeft size={16} /> Continue shopping</Link>
      <h1 className="mt-6 font-display text-3xl md:text-4xl">Checkout</h1>
      {items.length === 0 ? (
        <p className="mt-8 text-muted">Your cart is empty. <Link href="/shop" className="text-primary underline underline-offset-4">Browse the shop</Link>.</p>
      ) : (
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            <input value={form.name} onChange={set("name")} placeholder="Full name" className="w-full rounded-brand border border-line bg-surface px-4 py-3 outline-none focus:border-primary" />
            <input value={form.phone} onChange={set("phone")} placeholder="Phone (10 digits)" inputMode="numeric" className="w-full rounded-brand border border-line bg-surface px-4 py-3 outline-none focus:border-primary" />
            <textarea value={form.address} onChange={set("address")} placeholder="Delivery address" rows={3} className="w-full rounded-brand border border-line bg-surface px-4 py-3 outline-none focus:border-primary" />
            <input value={form.pincode} onChange={set("pincode")} placeholder="Pincode" inputMode="numeric" className="w-full rounded-brand border border-line bg-surface px-4 py-3 outline-none focus:border-primary" />
            <button onClick={placeOrder} disabled={!valid}
              className="w-full rounded-brand bg-primary px-6 py-3.5 font-medium text-primary-ink transition-opacity duration-brand enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
              Place order — {formatINR(total)}
            </button>
            <p className="text-xs text-muted">Payment is collected on confirmation (UPI / COD).</p>
          </div>
          <aside className="h-fit rounded-brand border border-line bg-surface p-5">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="mb-3 flex items-center justify-between gap-3 text-sm">
                <span className="text-muted">{product.name} × {qty}</span>
                <span>{formatINR(product.price * qty)}</span>
              </div>
            ))}
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4 font-medium">
              <span>Total</span><span>{formatINR(total)}</span>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
