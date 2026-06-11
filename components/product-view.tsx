"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, RotateCcw, Truck, Shield, ArrowRight, ChevronDown } from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useCart } from "./cart-context";
import { PRODUCTS, formatINR, type Product } from "../lib/products";

const SIZES = ["S", "M", "L", "XL", "XXL"];

const SELLING_POINTS: Record<string, string[]> = {
  p1: [
    "The mountain line-art is hand-drawn, not vectorised — each print carries slight variation, like a limited run should.",
    "Ecru base makes the forest-green ink look worn-in from the first wear, not fresh off a rack.",
    "Cut to drop off the shoulder so the back graphic sits flat and reads the way it was drawn.",
  ],
  p2: [
    "Botanical etching is water-based printed on 240 GSM cotton — the white stays white through fifty washes.",
    "Arch lettering wraps the daisy like it was typeset in 1912. Intentional, not ironic.",
    "The kind of tee you reach for when you need to feel like you've got your head on straight.",
  ],
  p3: [
    "Full-chest photo print on a washed black base — the city-night image absorbs into the fabric rather than sitting on top.",
    "Condensed caps at the collar, fine serif below. Two type voices, one mood: the last song before you pull over.",
    "Heavy enough to carry the print. Light enough to wear every night of the week.",
  ],
  p4: [
    "Left-chest block stamp sits exactly where a pocket would be — quiet placement, loud message.",
    "Navy holds its depth through repeated machine washes. The words stay sharp when everything else fades.",
    "Four words. No punctuation needed. Wear it when you'd rather not explain yourself.",
  ],
};

const PRODUCT_STATS: Record<string, { value: string; label: string }[]> = {
  p1: [
    { value: "240 GSM", label: "Heavyweight cotton" },
    { value: "4.9", label: "Rated by 112 buyers" },
    { value: "Ecru", label: "Off-white base" },
  ],
  p2: [
    { value: "240 GSM", label: "Heavyweight cotton" },
    { value: "4.8", label: "Rated by 89 buyers" },
    { value: "Est. 2021", label: "Original stamp" },
  ],
  p3: [
    { value: "240 GSM", label: "Heavyweight cotton" },
    { value: "4.8", label: "Rated by 76 buyers" },
    { value: "Washed", label: "Black base" },
  ],
  p4: [
    { value: "240 GSM", label: "Heavyweight cotton" },
    { value: "4.7", label: "Rated by 63 buyers" },
    { value: "Navy", label: "Deep navy base" },
  ],
};

const PRODUCT_REVIEWS: Record<
  string,
  { name: string; city: string; rating: string; text: string }[]
> = {
  p1: [
    {
      name: "Kabir Negi",
      city: "Dehradun",
      rating: "4.9",
      text: "Wore it three days straight after it arrived. The green ink on ecru looks like it's been mine for years, not three days. The back graphic hits every time someone sees it.",
    },
    {
      name: "Tanisha Rout",
      city: "Bhubaneswar",
      rating: "5.0",
      text: "Flat-laid this against white linen for a shoot and it looked like a magazine page. The line-art photographs like it was drawn for that exact frame.",
    },
    {
      name: "Yusuf Tamboli",
      city: "Pune",
      rating: "4.8",
      text: "Discovered threads through a repost, ordered the same night. This one carries a whole feeling. You don't need to explain it to anyone who gets it.",
    },
  ],
  p2: [
    {
      name: "Tanisha Rout",
      city: "Bhubaneswar",
      rating: "5.0",
      text: "The botanical print stays crisp even after cold washes. The arched type is doing something architecturally satisfying that I can't fully articulate.",
    },
    {
      name: "Kabir Negi",
      city: "Dehradun",
      rating: "4.8",
      text: "Bought this during a rough semester. The sentence on the back is the exact thing I needed to carry that week. Still wearing it.",
    },
    {
      name: "Yusuf Tamboli",
      city: "Pune",
      rating: "4.7",
      text: "White tee that doesn't look cheap. The daisy etching is detailed enough that you keep noticing new lines in it. Solid print quality.",
    },
  ],
  p3: [
    {
      name: "Yusuf Tamboli",
      city: "Pune",
      rating: "4.9",
      text: "Night-shift worker energy — this one's for the 2 AM drives home. The photo print doesn't crack or peel after three months of weekly wears.",
    },
    {
      name: "Kabir Negi",
      city: "Dehradun",
      rating: "4.8",
      text: "Closest a tee has ever come to an album cover. The condensed caps hit hard. Wore it to a concert and three people asked where it was from.",
    },
    {
      name: "Tanisha Rout",
      city: "Bhubaneswar",
      rating: "4.7",
      text: "The washed black base is the right call — not a harsh black, so the photo print reads like it belongs on the fabric. Very considered.",
    },
  ],
  p4: [
    {
      name: "Kabir Negi",
      city: "Dehradun",
      rating: "4.7",
      text: "Four words. I don't need to say more either. The stamp placement is perfect — noticeable but not loud. Navy doesn't fade ugly.",
    },
    {
      name: "Yusuf Tamboli",
      city: "Pune",
      rating: "4.8",
      text: "Minimal doesn't have to mean boring. The block text has enough weight that it reads as a statement, not a whisper. Good cotton.",
    },
    {
      name: "Tanisha Rout",
      city: "Bhubaneswar",
      rating: "4.6",
      text: "Wore it to a design critique and got three comments about the chest stamp. The navy photographs dark and rich — doesn't go grey in photos.",
    },
  ],
};

export default function ProductView({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(false);

  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id);
  const sellingPoints = SELLING_POINTS[product.id] ?? [];
  const productStats = PRODUCT_STATS[product.id] ?? [];
  const reviews = PRODUCT_REVIEWS[product.id] ?? [];

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 1800);
      return;
    }
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
    openCart();
  }

  return (
    <div className="min-h-screen bg-bg-base flex flex-col font-body">
      <Navbar />

      {/* ── ANNOUNCEMENT RIBBON ─────────────────────────────────────── */}
      <div className="w-full bg-bg-primary text-text-primary-ink overflow-hidden py-2.5 select-none">
        <div className="flex gap-0 whitespace-nowrap">
          {[0, 1].map((run) => (
            <motion.span
              key={run}
              className="inline-flex shrink-0 gap-12 pr-12 font-display font-bold text-[11px] tracking-widest uppercase"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            >
              {[
                "240 GSM 100% cotton",
                "Shipped from Delhi",
                "COD available",
                "7-day returns",
                "Free shipping over ₹599",
                "Dispatched in 48 hrs",
              ].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-4">
                  {item}
                  <span className="inline-block w-1 h-1 bg-text-primary-ink opacity-60" aria-hidden="true" />
                </span>
              ))}
            </motion.span>
          ))}
        </div>
      </div>

      <main className="flex-1">
        {/* ── PRODUCT HERO ────────────────────────────────────────────── */}
        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[92vh]">

            {/* LEFT — Full-bleed image */}
            <motion.div
              className="relative w-full bg-bg-surface overflow-hidden"
              style={{ minHeight: "56vw", maxHeight: "100vh" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                style={{ minHeight: "420px" }}
              />
              {/* Flat badge — zero radius, ink fill */}
              <span className="absolute top-5 left-5 bg-bg-ink text-text-primary-ink font-display font-bold text-[11px] tracking-widest uppercase px-3 py-1.5 select-none shadow-brand">
                {product.tag}
              </span>
              {/* Stat pills anchored bottom-left — brief.stats as designed moments */}
              <div className="absolute bottom-0 left-0 right-0 flex divide-x divide-border-line bg-bg-base/90">
                {productStats.map((stat, i) => (
                  <div key={i} className="flex-1 px-4 py-3 text-center">
                    <p className="font-display font-bold text-text-primary text-[18px] leading-none tabular-nums">
                      {stat.value}
                    </p>
                    <p className="font-body text-text-muted text-[11px] tracking-wide uppercase mt-0.5 leading-none">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Product info */}
            <motion.div
              className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 md:py-20 bg-bg-base"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow with drop index */}
              <p className="font-body text-text-muted text-[11px] tracking-widest uppercase mb-4 select-none">
                — 01 · threads · graphic tee
              </p>

              {/* Name — italic on last word for type contrast */}
              <h1
                className="font-display font-bold text-text-ink text-pretty leading-[0.92] mb-2"
                style={{ fontSize: "clamp(42px, 6vw, 72px)" }}
              >
                {product.name.split(" ").map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <em key={i} className="italic text-text-ink">{word}</em>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h1>

              {/* Price — the one green moment in the form */}
              <p className="font-body font-medium text-text-primary text-[22px] mb-6 tabular-nums">
                {formatINR(product.price)}
              </p>

              {/* Description */}
              <p className="font-body text-text-ink text-[16px] leading-relaxed mb-6 max-w-[480px] text-pretty">
                {product.description}
              </p>

              {/* Selling points — brief copy as manifesto list */}
              <ul className="flex flex-col gap-3 mb-8 max-w-[480px]">
                {sellingPoints.map((point, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mt-[7px] w-1.5 h-1.5 shrink-0 bg-bg-primary" aria-hidden="true" />
                    <p className="font-body text-[14px] text-text-muted leading-snug text-pretty">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>

              {/* 1px rule */}
              <div className="w-full h-px bg-border-line mb-8" />

              {/* Size selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-display font-bold text-[12px] tracking-widest uppercase text-text-ink">
                    — Select size
                  </p>
                  <AnimatePresence>
                    {sizeError && (
                      <motion.p
                        className="font-body text-[12px] text-text-accent"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        Pick a size first
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      aria-pressed={selectedSize === size}
                      aria-label={`Select size ${size}`}
                      className={[
                        "relative font-display font-bold text-[14px] tracking-widest uppercase px-5 py-3 border transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary focus-visible:ring-offset-2",
                        "overflow-hidden group",
                        selectedSize === size
                          ? "bg-bg-ink text-text-primary-ink border-bg-ink"
                          : "bg-bg-base text-text-ink border-border-line hover:border-bg-primary",
                      ].join(" ")}
                    >
                      {/* microbrand: 2px green underline slides in from left */}
                      {selectedSize !== size && (
                        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-bg-primary group-hover:w-full transition-all duration-200 ease-out" />
                      )}
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to cart */}
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className={[
                  "relative w-full flex items-center justify-center gap-3 px-8 py-5 font-display font-bold tracking-widest uppercase text-[16px] overflow-hidden group",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary focus-visible:ring-offset-2",
                  added
                    ? "bg-bg-primary text-text-primary-ink"
                    : "bg-bg-ink text-text-primary-ink",
                  "transition-colors duration-200 ease-out",
                ].join(" ")}
                aria-label="Add to cart"
              >
                {/* hover fill — green slides up from bottom */}
                {!added && (
                  <span className="absolute inset-0 bg-bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out" aria-hidden="true" />
                )}
                <span className="relative flex items-center gap-3">
                  <ShoppingBag size={20} aria-hidden="true" />
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        Dropped in your bag
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        Add to cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.button>

              {/* Trust row — brief.productDetails.shipping woven in */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {[
                  { icon: <Truck size={16} aria-hidden="true" />, text: "Free shipping over ₹599 · COD available" },
                  { icon: <RotateCcw size={16} aria-hidden="true" />, text: "7-day returns from delivery" },
                  { icon: <Shield size={16} aria-hidden="true" />, text: "Dispatched in 48 hrs from Delhi" },
                ].map(({ icon, text }, i) => (
                  <div key={i} className="flex items-start gap-2 text-text-muted flex-1">
                    <span className="mt-0.5 text-text-primary shrink-0">{icon}</span>
                    <p className="font-body text-[13px] leading-snug">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SPEC STRIP — Slam Jam dense utility block ──────────────── */}
        <section className="w-full bg-bg-surface border-t border-border-line">
          {/* Toggle header */}
          <button
            onClick={() => setSpecsOpen((v) => !v)}
            className="w-full flex items-center justify-between px-6 md:px-12 py-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary focus-visible:ring-inset"
            aria-expanded={specsOpen}
            aria-controls="spec-panel"
          >
            <p className="font-display font-bold text-[13px] tracking-widest uppercase text-text-ink select-none flex items-center gap-3">
              <span className="text-text-primary">—</span>
              02 · What you carry — fabric, fit &amp; care
            </p>
            <motion.span
              animate={{ rotate: specsOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-text-muted"
            >
              <ChevronDown size={18} aria-hidden="true" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {specsOpen && (
              <motion.div
                id="spec-panel"
                key="specs"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-border-line">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border-line">
                    {[
                      { label: "Fabric", value: "240 GSM 100% ring-spun cotton, pre-shrunk" },
                      { label: "Fit", value: "Oversized drop-shoulder, true to size" },
                      { label: "Care", value: "Cold machine wash inside-out, no tumble dry" },
                      { label: "Shipping", value: "Free over ₹599 · COD available · 7-day returns" },
                    ].map(({ label, value }, i) => (
                      <div key={i} className="py-8 px-6 md:px-10">
                        <p className="font-display font-bold text-[11px] tracking-widest uppercase text-text-primary mb-2 select-none">
                          {label}
                        </p>
                        <p className="font-body text-text-ink text-[15px] leading-snug">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── FULL-BLEED GRAPHIC MOMENT — Carne Bollente move ────────── */}
        <section
          className="w-full relative bg-bg-ink overflow-hidden"
          style={{ minHeight: "60vw", maxHeight: "90vh" }}
        >
          <motion.img
            src={product.image}
            alt={`${product.name} — back graphic, full bleed`}
            className="w-full h-full object-cover object-center"
            style={{ minHeight: "420px", maxHeight: "90vh" }}
            initial={{ scale: 1.04, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 bg-gradient-to-t from-bg-ink/85 via-bg-ink/20 to-transparent pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-body text-text-muted text-[11px] tracking-widest uppercase mb-3 select-none">
                — 03 · the graphic is the point
              </p>
              <h2
                className="font-display font-bold text-text-primary-ink text-pretty leading-[0.92] max-w-xl"
                style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
              >
                The back says <em className="italic text-text-accent">everything.</em>
                <br />The front keeps quiet.
              </h2>
            </motion.div>
          </div>
        </section>

        {/* ── REVIEWS — editorial, not templated ──────────────────────── */}
        <section className="w-full bg-bg-base py-20 md:py-28">
          <div className="w-full px-6 md:px-12">
            <div className="mb-12">
              <p className="font-body text-text-muted text-[11px] tracking-widest uppercase mb-3 select-none">
                — 04 · worn &amp; rated
              </p>
              <div className="flex items-end gap-6">
                <h2
                  className="font-display font-bold text-text-ink text-pretty leading-[0.92]"
                  style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
                >
                  Real buyers.{" "}
                  <em className="italic">Real Indian cities.</em>
                </h2>
                {/* Global stat pulled from brief.stats */}
                <p className="hidden md:block font-display font-bold text-text-primary text-[36px] leading-none tabular-nums mb-1">
                  4.8
                  <span className="font-body font-medium text-text-muted text-[13px] ml-2 tracking-wide uppercase">avg · 340+ buyers</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border-line border border-border-line">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  className="px-6 md:px-8 py-8 bg-bg-base group"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Rating — green numeric, no stars */}
                  <p className="font-display font-bold text-text-primary text-[28px] leading-none tabular-nums mb-4">
                    {review.rating}
                    <span className="font-body text-text-muted text-[11px] ml-1.5 tracking-wide uppercase">/ 5.0</span>
                  </p>
                  {/* Review text — Barlow Condensed 22px per brief */}
                  <p className="font-display text-[22px] text-text-ink leading-snug text-pretty mb-5">
                    "{review.text}"
                  </p>
                  {/* Reviewer — DM Sans muted, tee badge */}
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-body font-medium text-text-ink text-[13px]">{review.name}</p>
                      <p className="font-body text-text-muted text-[12px] tracking-wide">{review.city}</p>
                    </div>
                    {/* Flat badge — zero radius, ink fill, brief microbrand */}
                    <span className="bg-bg-ink text-text-primary-ink font-display font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 select-none shrink-0">
                      {product.tag}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MORE FROM THREADS — bg-surface alternates rhythm ─────────── */}
        <section className="w-full bg-bg-surface py-20 md:py-28 border-t border-border-line">
          <div className="w-full px-6 md:px-12">
            {/* Section header */}
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <div>
                <p className="font-body text-text-muted text-[11px] tracking-widest uppercase mb-3 select-none">
                  — 05 · the range
                </p>
                <h2
                  className="font-display font-bold text-text-ink text-pretty leading-[0.92]"
                  style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
                >
                  Four tees.{" "}
                  <em className="italic">Four different heads</em>{" "}
                  you carry.
                </h2>
              </div>
              <Link
                href="/shop"
                className="relative hidden md:flex items-center gap-2 font-display font-bold text-[13px] tracking-widest uppercase text-text-ink group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary focus-visible:ring-offset-2"
                aria-label="View all products"
              >
                View all
                <ArrowRight size={16} aria-hidden="true" />
                {/* microbrand: 2px green underline from left */}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-bg-primary group-hover:w-full transition-all duration-200 ease-out" />
              </Link>
            </div>

            {/* Products grid — zero gutter, borders as dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 divide-border-line border border-border-line">
              {otherProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={[
                    "group bg-bg-base",
                    i > 0 && i < otherProducts.length ? "sm:border-l border-border-line" : "",
                  ].join(" ")}
                >
                  <Link
                    href={`/product?id=${p.id}`}
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary focus-visible:ring-offset-2"
                    aria-label={`View ${p.name}`}
                  >
                    {/* Image container — aspect ratio locked */}
                    <div className="relative overflow-hidden bg-bg-surface aspect-[4/5]">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      {/* Tag badge — flat, zero radius */}
                      <span className="absolute top-4 left-4 bg-bg-ink text-text-primary-ink font-display font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 select-none shadow-brand">
                        {p.tag}
                      </span>
                      {/* Hover overlay — brief microbrand green underline on "View tee" */}
                      <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-bg-ink/65 via-transparent to-transparent">
                        <span className="relative font-display font-bold text-[12px] tracking-widest uppercase text-text-primary-ink flex items-center gap-2">
                          View tee <ArrowRight size={14} aria-hidden="true" />
                          {/* microbrand underline on hover overlay label */}
                          <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-bg-primary group-hover:w-full transition-all duration-200 ease-out" />
                        </span>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-4 pt-5 pb-7">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="relative overflow-hidden">
                          <p className="font-display font-bold text-[18px] text-text-ink tracking-tight leading-none">
                            {p.name}
                          </p>
                          {/* microbrand: 2px green underline slides in from left */}
                          <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-bg-primary group-hover:w-full transition-all duration-200 ease-out" />
                        </div>
                        <p className="font-body font-medium text-[15px] text-text-primary tabular-nums shrink-0">
                          {formatINR(p.price)}
                        </p>
                      </div>
                      <p className="font-body text-text-muted text-[13px] leading-snug mt-2 text-pretty line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile: View all link */}
            <div className="mt-8 flex md:hidden">
              <Link
                href="/shop"
                className="relative flex items-center gap-2 font-display font-bold text-[13px] tracking-widest uppercase text-text-ink group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary focus-visible:ring-offset-2"
                aria-label="View all products"
              >
                View all tees
                <ArrowRight size={16} aria-hidden="true" />
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-bg-primary group-hover:w-full transition-all duration-200 ease-out" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER STRIP — #1A1916 full-bleed band ──────────────── */}
        <section className="w-full bg-bg-ink py-16 md:py-20">
          <div className="w-full px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex-1">
              <p className="font-body text-text-muted text-[11px] tracking-widest uppercase mb-3 select-none">
                — 06 · stay in the drop
              </p>
              <h2
                className="font-display font-bold text-text-primary-ink text-pretty leading-[0.92]"
                style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
              >
                Wear the thought you{" "}
                <em className="italic text-text-accent">couldn't say</em>{" "}
                out loud.
              </h2>
            </div>
            <form
              className="flex gap-0 w-full md:w-auto md:min-w-[400px]"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent border border-text-muted text-text-primary-ink font-body text-[14px] px-4 py-3.5 placeholder:text-text-muted focus-visible:outline-none focus-visible:border-text-primary-ink transition-colors duration-200"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="relative bg-bg-primary text-text-primary-ink font-display font-bold text-[12px] tracking-widest uppercase px-6 py-3.5 group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-ink transition-colors duration-200 hover:bg-bg-base hover:text-text-ink"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
                {/* microbrand underline */}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-bg-primary group-hover:w-full transition-all duration-200 ease-out" aria-hidden="true" />
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}