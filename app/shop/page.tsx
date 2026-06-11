"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus, Eye } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useCart } from "../../components/cart-context";
import { PRODUCTS, formatINR } from "../../lib/products";

const FILTERS = ["ALL", ...Array.from(new Set(PRODUCTS.map((p: any) => p.tag).filter(Boolean)))];

export default function ShopPage() {
  const { addItem, openCart } = useCart();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = activeFilter === "ALL"
    ? PRODUCTS
    : PRODUCTS.filter((p: any) => p.tag === activeFilter);

  function handleAdd(product: any, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
    openCart();
  }

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navbar />

      {/* ── Shop Header ──────────────────────────────────────────────────── */}
      <section className="w-full bg-bg-base border-b border-border-line">
        <div className="px-4 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Left: headline block */}
          <div className="flex flex-col gap-3">
            <span className="font-body text-[11px] tracking-widest uppercase text-text-muted select-none">
              — THE DROP · 04 GRAPHICS
            </span>
            <h1
              className="font-display font-bold text-text-ink leading-[0.92] text-pretty"
              style={{ fontSize: "clamp(48px, 8vw, 88px)" }}
            >
              EVERY TEE
              <br />
              <em className="not-italic text-text-muted">IS A</em>{" "}
              STATEMENT.
            </h1>
            <p className="font-body text-[16px] text-text-muted leading-[1.5] max-w-sm text-pretty mt-1">
              Four graphics. One heavy drop. Pick the thought you've been carrying.
            </p>
          </div>

          {/* Right: spec strip */}
          <div className="flex flex-row md:flex-col gap-6 md:gap-2 md:items-end text-right">
            {[
              ["240 GSM", "ring-spun cotton"],
              ["Free ship", "over ₹599"],
              ["COD", "available"],
            ].map(([val, label]) => (
              <div key={val} className="flex flex-col items-end">
                <span className="font-display font-bold text-[22px] text-text-ink leading-none">
                  {val}
                </span>
                <span className="font-body text-[12px] text-text-muted tracking-wide uppercase leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter pills — full width rule above */}
        <div className="border-t border-border-line px-4 md:px-10 py-4 flex flex-row gap-0 overflow-x-auto scrollbar-hide">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
              className={[
                "relative font-display font-bold text-[13px] tracking-widest uppercase px-5 py-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary whitespace-nowrap",
                activeFilter === f
                  ? "bg-bg-primary text-text-primary-ink"
                  : "bg-transparent text-text-muted hover:text-text-ink",
              ].join(" ")}
            >
              {f}
              {activeFilter === f && (
                <motion.span
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-bg-primary"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── Product Grid ─────────────────────────────────────────────────── */}
      <main className="flex-1 w-full bg-bg-base">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full"
          >
            {filtered.map((product: any, i: number) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                isAdded={addedId === product.id}
                onAdd={handleAdd}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="font-display font-bold text-[40px] text-text-muted uppercase">
              Nothing here yet.
            </span>
            <button
              onClick={() => setActiveFilter("ALL")}
              className="font-body text-[14px] text-text-ink underline underline-offset-4 hover:text-bg-primary transition-colors duration-200"
            >
              See all tees →
            </button>
          </div>
        )}

        {/* Utility ribbon — specs bar */}
        <div className="w-full border-t border-border-line bg-bg-surface">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border-line">
            {[
              ["240 GSM", "Heavyweight cotton every drop"],
              ["Pre-shrunk", "True to size, oversized drop-shoulder"],
              ["48 hrs", "Dispatch after order confirmed"],
              ["7 days", "Return window from delivery"],
            ].map(([val, label]) => (
              <div
                key={val}
                className="flex flex-col gap-1 px-6 md:px-8 py-6"
              >
                <span className="font-display font-bold text-[26px] md:text-[32px] text-text-ink leading-none">
                  {val}
                </span>
                <span className="font-body text-[12px] uppercase tracking-widest text-text-muted leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Editorial Band ───────────────────────────────────────────────── */}
      <section className="w-full bg-bg-surface border-t border-border-line px-4 md:px-10 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 max-w-none">
          <div className="flex flex-col gap-3 max-w-lg">
            <span className="font-body text-[11px] tracking-widest uppercase text-text-muted select-none">
              — HOW IT WORKS
            </span>
            <h2
              className="font-display font-bold text-text-ink leading-[0.95] text-pretty"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
            >
              COLD WASH.{" "}
              <em className="not-italic text-text-muted">INSIDE-OUT.</em>
              <br />
              ALWAYS.
            </h2>
            <p className="font-body text-[15px] text-text-muted leading-[1.6] text-pretty">
              The print is the product. Wash cold inside-out, skip the dryer, the graphic stays raw.
              240 GSM ring-spun cotton — it holds its shape through a semester of Mondays.
            </p>
          </div>

          <div className="flex flex-col gap-0 border border-border-line">
            {[
              ["Fabric", "240 GSM 100% ring-spun cotton, pre-shrunk"],
              ["Fit", "Oversized drop-shoulder, true to size"],
              ["Care", "Cold machine wash inside-out, no tumble dry"],
              ["Shipping", "Free over ₹599 · COD · 7-day returns"],
            ].map(([key, val], i) => (
              <div
                key={key}
                className={[
                  "flex flex-row gap-4 px-6 py-4",
                  i < 3 ? "border-b border-border-line" : "",
                ].join(" ")}
              >
                <span className="font-body text-[12px] uppercase tracking-widest text-text-muted w-20 shrink-0 pt-0.5">
                  {key}
                </span>
                <span className="font-body text-[14px] text-text-ink leading-[1.5]">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ── Product Card ─────────────────────────────────────────────────────────── */
function ProductCard({
  product,
  index,
  isAdded,
  onAdd,
}: {
  product: any;
  index: number;
  isAdded: boolean;
  onAdd: (product: any, e: React.MouseEvent) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.07 }}
      className="relative group border-r border-b border-border-line last:border-r-0 even-of-type:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/product?id=${product.id}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary"
        aria-label={`View ${product.name}`}
      >
        {/* Image container */}
        <div className="relative overflow-hidden bg-bg-surface aspect-[4/5] w-full">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{
              scale: hovered ? 1.04 : 1,
              filter: hovered ? "brightness(0.88)" : "brightness(1)",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Tag badge */}
          {product.tag && (
            <div className="absolute top-3 left-3 bg-bg-ink text-text-primary-ink font-display font-bold text-[11px] tracking-widest uppercase px-2.5 py-1 select-none">
              {product.tag}
            </div>
          )}

          {/* Hover overlay actions */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 flex flex-row"
              >
                <button
                  onClick={(e) => onAdd(product, e)}
                  aria-label={`Add ${product.name} to cart`}
                  className="flex-1 flex items-center justify-center gap-2 bg-bg-primary text-text-primary-ink font-display font-bold text-[13px] tracking-widest uppercase py-3.5 hover:bg-bg-ink transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary focus-visible:ring-inset"
                >
                  <Plus size={14} />
                  {isAdded ? "ADDED" : "ADD"}
                </button>
                <div className="w-px bg-border-line shrink-0" />
                <div className="flex items-center justify-center bg-bg-ink text-text-primary-ink px-4 py-3.5">
                  <Eye size={16} aria-label="View product" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card footer */}
        <div className="px-4 py-4 bg-bg-base flex flex-col gap-1">
          <div className="flex flex-row items-start justify-between gap-2">
            {/* Name with sliding underline */}
            <div className="relative inline-block">
              <span className="font-display font-bold text-[18px] text-text-ink leading-tight tracking-tight">
                {product.name}
              </span>
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] bg-bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: hovered ? "100%" : "0%" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
            <ArrowUpRight
              size={16}
              className={`shrink-0 mt-0.5 transition-colors duration-200 ${
                hovered ? "text-bg-primary" : "text-text-muted"
              }`}
            />
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <span className="font-body font-medium text-[15px] text-text-primary leading-none">
              {formatINR(product.price)}
            </span>
            {product.description && (
              <span className="font-body text-[12px] text-text-muted leading-snug text-right max-w-[120px] truncate">
                240 GSM · Oversized
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}