"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "../lib/products";

export interface CartItem { product: Product; qty: number }

interface CartShape {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  addItem: (p: Product, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartCtx = createContext<CartShape | null>(null);

export function useCart(): CartShape {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try { const raw = localStorage.getItem("fable-cart"); if (raw) setItems(JSON.parse(raw)); } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) try { localStorage.setItem("fable-cart", JSON.stringify(items)); } catch {} }, [items, loaded]);

  const addItem = (p: Product, qty = 1) => {
    setItems(prev => {
      const ex = prev.find(i => i.product.id === p.id);
      return ex ? prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + qty } : i) : [...prev, { product: p, qty }];
    });
    setIsOpen(true);
  };
  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.product.id !== id));
  const setQty = (id: string, qty: number) => {
    if (qty <= 0) { removeItem(id); return; }
    setItems(prev => prev.map(i => i.product.id === id ? { ...i, qty } : i));
  };
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.product.price, 0);

  return (
    <CartCtx.Provider value={{ items, count, total, isOpen, addItem, removeItem, setQty, clear, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}>
      {children}
    </CartCtx.Provider>
  );
}
