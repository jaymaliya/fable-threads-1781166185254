"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-context";
import { formatINR } from "../lib/products";

export default function CartDrawer() {
  const { items, total, isOpen, closeCart, setQty, removeItem } = useCart();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart} className="fixed inset-0 z-40 bg-black/50" />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface border-l border-line">
            <div className="flex items-center justify-between border-b border-line p-5">
              <h2 className="font-display text-xl">Your cart</h2>
              <button onClick={closeCart} aria-label="Close cart" className="rounded-brand p-2 hover:bg-primary-soft transition-colors duration-brand"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-muted">
                  <ShoppingBag size={36} strokeWidth={1.25} />
                  <p>Nothing here yet.</p>
                </div>
              ) : items.map(({ product, qty }) => (
                <div key={product.id} className="mb-5 flex gap-4">
                  <img src={product.image} alt={product.name} className="h-20 w-20 rounded-brand object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium leading-snug">{product.name}</p>
                      <button onClick={() => removeItem(product.id)} aria-label="Remove" className="text-muted hover:text-ink"><X size={16} /></button>
                    </div>
                    <p className="mt-1 text-sm text-muted">{formatINR(product.price)}</p>
                    <div className="mt-2 inline-flex items-center gap-3 rounded-brand border border-line px-2 py-1">
                      <button onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease"><Minus size={14} /></button>
                      <span className="min-w-5 text-center text-sm">{qty}</span>
                      <button onClick={() => setQty(product.id, qty + 1)} aria-label="Increase"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <div className="border-t border-line p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-muted">Total</span>
                  <span className="font-display text-xl">{formatINR(total)}</span>
                </div>
                <Link href="/checkout" onClick={closeCart}
                  className="block w-full rounded-brand bg-primary px-6 py-3.5 text-center font-medium text-primary-ink transition-opacity duration-brand hover:opacity-90">
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
