"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, ChevronRight, X } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../components/cart-context";
import { PRODUCTS, formatINR } from "../lib/products";

const EASE_BRAND = [0.25, 0.1, 0.25, 1];
const DURATION_BRAND = 0.45;

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION_BRAND, ease: EASE_BRAND, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: DURATION_BRAND, ease: EASE_BRAND, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── MICROBRAND: 2px solid primary underline, slides left→right at 200ms ease-out ── */
function UnderlineLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group relative inline-block ${className}`}>
      {children}
      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-200 ease-out"
        aria-hidden="true"
      />
    </Link>
  );
}

/* ── ANNOUNCEMENT BAR ── */
function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const items = [
    "240 GSM 100% cotton",
    "Shipped from Delhi",
    "COD available",
    "7-day returns",
  ];
  if (!visible) return null;
  return (
    <div className="w-full bg-bg-ink text-text-primary-ink flex items-center justify-between px-4 py-2 gap-4">
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-none whitespace-nowrap text-[11px] font-body tracking-[0.18em] uppercase">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              {item}
              {i < items.length - 1 && (
                <span className="w-1 h-1 bg-text-muted inline-block shrink-0" aria-hidden="true" />
              )}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
        className="shrink-0 text-text-muted hover:text-text-primary-ink transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-text-primary"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/* ── PRODUCT CARD ── */
function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const { addItem, openCart } = useCart();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden bg-bg-surface cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Tag badge — flat rectangle, zero radius, ink fill */}
        <span className="absolute top-3 left-3 bg-bg-ink text-text-primary-ink font-body text-[11px] tracking-widest uppercase px-2 py-1 select-none shadow-brand">
          {product.tag}
        </span>

        {/* Hover overlay actions */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: EASE_BRAND }}
              className="absolute bottom-0 left-0 right-0 flex"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product);
                  openCart();
                }}
                aria-label={`Add ${product.name} to cart`}
                className="group/btn flex-1 bg-bg-primary text-text-primary-ink font-body font-medium text-[13px] tracking-widest uppercase py-3 hover:opacity-90 active:scale-[0.98] transition-all duration-150 relative overflow-hidden"
              >
                <span className="relative z-10">Add to cart</span>
                {/* microbrand: sliding underline even inside button as a bottom bar */}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-text-primary-ink group-hover/btn:w-full transition-all duration-200 ease-out" aria-hidden="true" />
              </button>
              <Link
                href={`/product?id=${product.id}`}
                className="group/view relative bg-bg-ink text-text-primary-ink font-body text-[13px] tracking-widest uppercase px-4 py-3 flex items-center gap-1 hover:bg-bg-primary transition-colors duration-150 overflow-hidden"
              >
                View
                <ChevronRight size={13} />
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-text-primary-ink group-hover/view:w-full transition-all duration-200 ease-out" aria-hidden="true" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card footer */}
      <div className="px-4 py-4 flex items-start justify-between gap-2 border-t border-border-line">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="relative inline-block self-start">
            <span className="font-display font-bold text-[18px] leading-tight tracking-wide text-text-ink uppercase">
              {product.name}
            </span>
            {/* microbrand underline */}
            <span
              className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-200 ease-out"
              style={{ width: hovered ? "100%" : "0%" }}
              aria-hidden="true"
            />
          </div>
          <p className="font-body text-[13px] text-text-muted leading-snug line-clamp-2 text-pretty">
            {product.description}
          </p>
        </div>
        <span className="font-body font-medium text-[16px] text-text-primary shrink-0 mt-0.5">
          {formatINR(product.price)}
        </span>
      </div>
    </div>
  );
}

/* ── TICKER ── */
const TICKER_ITEMS = [
  "DAYDREAMER TEE",
  "GROW THROUGH TEE",
  "MIDNIGHT DRIVE TEE",
  "FOCUS STAMP TEE",
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="w-full bg-bg-surface overflow-hidden py-4 border-y border-border-line">
      <motion.div
        className="flex gap-12 items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display font-bold text-[22px] md:text-[24px] tracking-widest text-text-ink uppercase"
          >
            {item}
            <span className="w-1.5 h-1.5 bg-bg-primary inline-block shrink-0" aria-hidden="true" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── REVIEWS ── */
const REVIEWS = [
  {
    name: "Kabir Negi",
    city: "Dehradun",
    rating: "5.0",
    tee: "Daydreamer Tee",
    text: "Wore this on a solo trip. Three people stopped me to read the back. The weight is real — doesn't cling, doesn't pill. This is the drop I tell people about.",
  },
  {
    name: "Tanisha Rout",
    city: "Bhubaneswar",
    rating: "4.8",
    tee: "Grow Through Tee",
    text: "Shot a flat-lay with this against my windowsill and it looked like a poster. The ink sits clean, no cracking after five washes. The botanical is surprisingly subtle in person — earns its space.",
  },
  {
    name: "Yusuf Tamboli",
    city: "Pune",
    rating: "4.9",
    tee: "Midnight Drive Tee",
    text: "Found this through a repost at 2am. Ordered the same night. Arrived in two days, Delhi to Pune. The photo print on black is dense — looks like a record sleeve, not a graphic tee.",
  },
];

const TEXTURE_MOODS = [
  { product: PRODUCTS[0], surface: "Ecru linen", mood: "Head in the clouds." },
  { product: PRODUCTS[2], surface: "Grey concrete", mood: "Lost in the city." },
  { product: PRODUCTS[1], surface: "White plaster", mood: "Grow through it." },
  { product: PRODUCTS[3], surface: "Urban pavement", mood: "No noise. Just you." },
];

/* ── PAGE ── */
export default function HomePage() {
  const { addItem, openCart } = useCart();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <div className="min-h-screen bg-bg-base text-text-ink font-body overflow-x-hidden">
      {/* ── ANNOUNCEMENT BAR ── */}
      <AnnouncementBar />

      <Navbar />

      {/* ── HERO — Split-Tension ── */}
      <section ref={heroRef} className="w-full min-h-[92svh] flex flex-col md:flex-row overflow-hidden">
        {/* Left: full-bleed image — no padding, no frame */}
        <motion.div
          className="relative w-full md:w-[55%] min-h-[50svh] md:min-h-[92svh] overflow-hidden"
          initial={{ opacity: 0, x: -24 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE_BRAND }}
        >
          <img
            src="/product-3.jpg"
            alt="Midnight Drive Tee — washed black heavyweight tee with city-night photo print"
            className="w-full h-full object-cover object-center absolute inset-0"
          />
          {/* mobile fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-base to-transparent md:hidden" aria-hidden="true" />
        </motion.div>

        {/* Right: type panel */}
        <div className="w-full md:w-[45%] bg-bg-base flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 md:py-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION_BRAND, ease: EASE_BRAND, delay: 0.15 }}
            className="flex flex-col gap-2"
          >
            {/* eyebrow micro-label */}
            <span className="font-body text-[11px] tracking-[0.22em] uppercase text-text-muted mb-2 block">
              — New drop · Four graphics
            </span>
            <h1
              className="font-display font-bold uppercase leading-[0.88] tracking-tight text-text-ink text-balance"
              style={{ fontSize: "clamp(48px, 8vw, 88px)" }}
            >
              FOUR<br />
              <em className="not-italic text-text-primary">TEES.</em><br />
              FOUR<br />
              DIFFERENT<br />
              <em className="italic">HEADS</em><br />
              YOU CARRY.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION_BRAND, ease: EASE_BRAND, delay: 0.28 }}
            className="font-body text-[16px] text-text-muted leading-relaxed max-w-xs text-pretty"
          >
            240 GSM cotton. A graphic for every thought you haven't said out loud yet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION_BRAND, ease: EASE_BRAND, delay: 0.38 }}
            className="flex items-center gap-4"
          >
            {/* CTA — microbrand: underline slides in on hover */}
            <Link
              href="/shop"
              className="group relative inline-flex items-center gap-2 bg-bg-ink text-text-primary-ink font-body font-medium text-[13px] tracking-widest uppercase px-6 py-3 transition-colors duration-200 hover:bg-bg-primary active:scale-[0.98] overflow-hidden"
            >
              <span>Shop the drop</span>
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-text-primary-ink group-hover:w-full transition-all duration-200 ease-out" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Spec strip — productDetails woven into hero, feels like a manifesto line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: DURATION_BRAND, ease: EASE_BRAND, delay: 0.5 }}
            className="border-t border-border-line pt-6 mt-2 grid grid-cols-3 gap-0 divide-x divide-border-line"
          >
            {[
              { label: "Fabric", value: "240 GSM ring-spun cotton" },
              { label: "Fit", value: "Oversized drop-shoulder" },
              { label: "Ships", value: "48 hrs · Delhi · COD" },
            ].map((spec, i) => (
              <div key={i} className={`${i === 0 ? "pr-4" : i === 1 ? "px-4" : "pl-4"}`}>
                <p className="font-body text-[11px] tracking-widest uppercase text-text-muted mb-0.5">{spec.label}</p>
                <p className="font-body text-[13px] text-text-ink leading-snug">{spec.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TICKER MANIFESTO ── */}
      <Ticker />

      {/* ── THE DROP GRID ── bg-base → alternates correctly */}
      <section className="w-full bg-bg-base py-16 md:py-24">
        <div className="px-6 md:px-12 mb-10 flex items-end justify-between gap-4">
          <FadeUp>
            {/* eyebrow + aggressive scale jump */}
            <p className="font-body text-[11px] tracking-[0.22em] uppercase text-text-muted mb-2">— 01 · THE DROP</p>
            <h2
              className="font-display font-bold uppercase text-text-ink leading-none text-balance"
              style={{ fontSize: "clamp(28px, 4vw, 36px)" }}
            >
              The graphic is<br />
              <em className="italic">the product.</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <UnderlineLink
              href="/shop"
              className="font-body text-[13px] tracking-widest uppercase text-text-muted hover:text-text-ink transition-colors duration-150"
            >
              All tees
            </UnderlineLink>
          </FadeUp>
        </div>

        {/* Zero-gutter grid — each card is a gallery piece */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {PRODUCTS.map((product, i) => (
            <FadeUp key={product.id} delay={i * 0.07}>
              <Link href={`/product?id=${product.id}`} className="block">
                <ProductCard product={product} />
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── THE GRAPHIC IS THE POINT — Full-bleed ink moment ── */}
      {/* bg-base → full-bleed ink: rhythm break, full contrast */}
      <section className="w-full relative overflow-hidden" style={{ minHeight: "60vw", maxHeight: "90svh" }}>
        <img
          src="/product-1.jpg"
          alt="Daydreamer Tee — back graphic: hand-drawn mountain scene with figure in meadow"
          className="w-full h-full object-cover object-center absolute inset-0"
          style={{ minHeight: "inherit" }}
        />
        {/* Directional overlay — Slam Jam density: left edge stays readable, right edge stays raw */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(26,25,22,0.72) 0%, rgba(26,25,22,0.3) 55%, rgba(26,25,22,0.05) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="relative z-10 flex flex-col justify-end h-full px-8 md:px-16 py-12 md:py-20"
          style={{ minHeight: "60vw", maxHeight: "90svh" }}
        >
          <SlideIn>
            {/* eyebrow on the full-bleed — anchors it to the editorial system */}
            <span className="font-body text-[11px] tracking-[0.22em] uppercase text-text-primary-ink opacity-60 mb-4 block">
              — Wear what you mean
            </span>
            <h2
              className="font-display font-bold uppercase text-text-primary-ink leading-[0.9] tracking-tight text-balance max-w-2xl"
              style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
            >
              THE BACK<br />
              <em className="not-italic text-text-primary">SAYS</em><br />
              EVERYTHING.<br />
              THE FRONT<br />
              KEEPS <em className="italic">QUIET.</em>
            </h2>
          </SlideIn>
          <SlideIn delay={0.14}>
            <p className="font-body text-[15px] text-text-primary-ink opacity-75 mt-6 max-w-sm text-pretty leading-relaxed">
              Every graphic carries a thought. Pick the one that fits yours — the fabric handles the rest.
            </p>
          </SlideIn>
          <SlideIn delay={0.22}>
            <Link
              href="/shop"
              className="group relative mt-8 inline-flex items-center gap-2 border border-text-primary-ink text-text-primary-ink font-body font-medium text-[13px] tracking-widest uppercase px-6 py-3 hover:bg-text-primary-ink hover:text-text-ink transition-colors duration-200 overflow-hidden self-start"
            >
              Shop all graphics
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-text-primary-ink group-hover:w-full transition-all duration-200 ease-out" aria-hidden="true" />
            </Link>
          </SlideIn>
        </div>
      </section>

      {/* ── WHY THESE SHIRTS — Stat Row — bg-surface: rhythm break ── */}
      <section className="w-full bg-bg-surface border-y border-border-line py-16 md:py-20">
        <div className="px-6 md:px-12 mb-10">
          <FadeUp>
            <p className="font-body text-[11px] tracking-[0.22em] uppercase text-text-muted mb-2">— 02 · BY THE NUMBERS</p>
            <h2
              className="font-display font-bold uppercase text-text-ink leading-none text-balance"
              style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}
            >
              Numbers convince.<br />
              <em className="italic">Adjectives don't.</em>
            </h2>
          </FadeUp>
        </div>

        {/* Stat row — values at brutal scale, Slam Jam density on the label/sub line */}
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border-line border-y border-border-line">
          {[
            {
              value: "240 GSM",
              label: "Heavyweight cotton every drop",
              sub: "Ring-spun, pre-shrunk · feels like a second skin after three washes",
            },
            {
              value: "4.8",
              label: "Rated by 340+ verified buyers",
              sub: "Not an average — the floor. One-star reviews don't exist yet.",
            },
            {
              value: "48 hrs",
              label: "Dispatch from Delhi",
              sub: "Order today, shipped before the week turns. COD available nationwide.",
            },
          ].map((stat, i) => (
            <FadeUp key={i} delay={i * 0.1} className="flex-1 px-8 md:px-16 py-10 md:py-14 flex flex-col gap-3">
              <span
                className="font-display font-bold text-text-ink leading-none uppercase"
                style={{ fontSize: "clamp(40px, 5.5vw, 64px)" }}
              >
                {stat.value}
                {/* accent detail only on the rating */}
                {i === 1 && (
                  <span className="font-display text-text-primary text-[0.5em] ml-1 align-super">★</span>
                )}
              </span>
              <span className="font-body font-medium text-[15px] text-text-ink leading-snug">{stat.label}</span>
              <span className="font-body text-[13px] text-text-muted leading-relaxed text-pretty">{stat.sub}</span>
            </FadeUp>
          ))}
        </div>

        {/* ── Product Spec Strip — dense utility block, Slam Jam inspiration ── */}
        <FadeUp delay={0.2}>
          <div className="mx-6 md:mx-12 border-t border-border-line mt-0 pt-8">
            <p className="font-body text-[11px] tracking-[0.22em] uppercase text-text-muted mb-6">
              — Every tee ships with these specs. No exceptions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border-line border border-border-line">
              {[
                { label: "Fabric", value: "240 GSM 100% ring-spun cotton, pre-shrunk" },
                { label: "Fit", value: "Oversized drop-shoulder, true to size" },
                { label: "Care", value: "Cold wash inside-out · No tumble dry" },
                { label: "Shipping", value: "Free over ₹599 · COD · 7-day returns" },
              ].map((spec, i) => (
                <div key={i} className="px-5 md:px-6 py-5 flex flex-col gap-1">
                  <p className="font-body text-[11px] tracking-widest uppercase text-text-muted">{spec.label}</p>
                  <p className="font-body text-[13px] text-text-ink leading-snug text-pretty font-medium">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── VOICES — Reviews — bg-base: rhythm alternates back ── */}
      <section className="w-full bg-bg-base py-16 md:py-24 px-6 md:px-12">
        <FadeUp className="mb-12">
          <p className="font-body text-[11px] tracking-[0.22em] uppercase text-text-muted mb-3">— 03 · WORN &amp; RATED</p>
          <h2
            className="font-display font-bold uppercase text-text-ink leading-none text-balance"
            style={{ fontSize: "clamp(28px, 4vw, 36px)" }}
          >
            People who bought the<br />
            <em className="italic">feeling.</em>
          </h2>
        </FadeUp>

        {/* Editorial review grid — no star icons, numeric rating in green, flat badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border-line divide-y md:divide-y-0 md:divide-x divide-border-line">
          {REVIEWS.map((review, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="p-8 md:p-10 flex flex-col gap-6 h-full">
                {/* Header: name + city LEFT, numeric rating RIGHT */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-body font-medium text-[13px] text-text-ink uppercase tracking-widest">{review.name}</p>
                    <p className="font-body text-[13px] text-text-muted">{review.city}</p>
                  </div>
                  {/* Rating: Madhappy single-accent rule — green only here */}
                  <div className="flex flex-col items-end gap-0">
                    <span className="font-display font-bold text-[28px] text-text-primary leading-none">{review.rating}</span>
                    <span className="font-body text-[11px] tracking-widest text-text-muted uppercase">/ 5.0</span>
                  </div>
                </div>

                {/* Review body — Barlow Condensed at 22px, editorial weight */}
                <blockquote
                  className="font-display font-normal text-text-ink leading-snug flex-1 text-pretty"
                  style={{ fontSize: "clamp(18px, 2.2vw, 22px)" }}
                >
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Tee badge — flat, zero radius, ink fill, paper text */}
                <span className="bg-bg-ink text-text-primary-ink font-body text-[11px] tracking-widest uppercase px-3 py-1 self-start">
                  {review.tee}
                </span>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Aggregate social proof strip below reviews */}
        <FadeUp delay={0.3}>
          <div className="mt-0 border border-t-0 border-border-line px-8 py-5 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="font-body text-[13px] text-text-muted">
              340+ orders shipped · avg dispatch 1.8 days · 96% five-star first wears
            </span>
            <UnderlineLink
              href="/shop"
              className="font-body font-medium text-[13px] text-text-ink tracking-wide uppercase"
            >
              Read all reviews →
            </UnderlineLink>
          </div>
        </FadeUp>
      </section>

      {/* ── THE RANGE, ONE FRAME — bg-surface: rhythm alternates ── */}
      <section className="w-full bg-bg-surface border-y border-border-line py-16 md:py-24">
        <div className="px-6 md:px-12 mb-10">
          <FadeUp>
            <p className="font-body text-[11px] tracking-[0.22em] uppercase text-text-muted mb-3">— 04 · FOUR WORLDS</p>
            <h2
              className="font-display font-bold uppercase text-text-ink leading-none text-balance"
              style={{ fontSize: "clamp(28px, 4vw, 36px)" }}
            >
              Pick the one that<br />
              <em className="italic">sounds like you.</em>
            </h2>
          </FadeUp>
        </div>

        {/* Horizontal scroll on mobile, 4-col grid on desktop — snap */}
        <div className="flex md:grid md:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-0 px-6 md:px-0 pb-4 md:pb-0">
          {TEXTURE_MOODS.map(({ product, surface, mood }, i) => (
            <FadeUp key={product.id} delay={i * 0.08} className="flex-shrink-0 w-[75vw] md:w-auto snap-start">
              <Link href={`/product?id=${product.id}`} className="group block md:border-r md:last:border-r-0 border-border-line">
                {/* Image fills frame — Carne Bollente: the back-print gets its own full moment */}
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={product.image}
                    alt={`${product.name} on ${surface}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Ink overlay on hover */}
                  <div
                    className="absolute inset-0 bg-bg-ink opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                    aria-hidden="true"
                  />
                  {/* Hover CTA — slides up */}
                  <motion.div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                    <motion.div
                      className="bg-bg-primary text-text-primary-ink font-body text-[11px] tracking-widest uppercase px-4 py-3 flex items-center justify-between"
                      initial={{ y: "100%" }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.2, ease: EASE_BRAND }}
                    >
                      <span>View tee</span>
                      <ArrowRight size={12} />
                    </motion.div>
                  </motion.div>
                </div>

                <div className="pt-4 pb-6 px-1 md:px-4 flex flex-col gap-1 border-t border-border-line">
                  {/* Product name with microbrand underline */}
                  <div className="relative inline-block self-start">
                    <span className="font-display font-bold text-[16px] uppercase tracking-wide text-text-ink">
                      {product.name}
                    </span>
                    <span
                      className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-200 ease-out"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="font-body text-[13px] text-text-muted italic">{mood}</p>
                  <p className="font-body text-[12px] text-text-muted uppercase tracking-widest">{surface}</p>
                  <span className="font-body font-medium text-[14px] text-text-primary mt-1">{formatINR(product.price)}</span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER STRIP — bg-ink: final full contrast moment ── */}
      <section className="w-full bg-bg-ink px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-16 max-w-none">
          <FadeUp className="flex flex-col gap-3 shrink-0 max-w-sm">
            {/* eyebrow on dark band — subtle, consistent system */}
            <p className="font-body text-[11px] tracking-[0.22em] uppercase text-text-muted">— Stay in the drop</p>
            <h2
              className="font-display font-bold uppercase text-text-primary-ink leading-none text-balance"
              style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              Next drop arrives<br />
              <em className="italic text-text-primary">before you expect it.</em>
            </h2>
            <p className="font-body text-[14px] text-text-muted leading-relaxed text-pretty">
              No noise. Just a single message when there's a new graphic worth your attention. Unsubscribe in one click.
            </p>
            {/* Spec reminder — feels like the brand's certainty, not filler */}
            <div className="flex items-center gap-6 pt-2 border-t border-border-line mt-1">
              <div>
                <p className="font-body text-[11px] tracking-widest uppercase text-text-muted">COD</p>
                <p className="font-body text-[13px] text-text-primary-ink">Available nationwide</p>
              </div>
              <div className="w-px h-8 bg-border-line" aria-hidden="true" />
              <div>
                <p className="font-body text-[11px] tracking-widest uppercase text-text-muted">Returns</p>
                <p className="font-body text-[13px] text-text-primary-ink">7 days from delivery</p>
              </div>
              <div className="w-px h-8 bg-border-line" aria-hidden="true" />
              <div>
                <p className="font-body text-[11px] tracking-widest uppercase text-text-muted">Free ship</p>
                <p className="font-body text-[13px] text-text-primary-ink">Orders over ₹599</p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.14} className="w-full md:max-w-sm">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_BRAND }}
                className="border border-border-line px-6 py-8"
              >
                <p className="font-display font-bold text-[28px] uppercase text-text-primary-ink leading-none">
                  You're in.
                </p>
                <p className="font-body text-[14px] text-text-muted mt-3 leading-relaxed">
                  Watch your inbox. We write once. We mean it.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-0">
                <label htmlFor="newsletter-email" className="font-body text-[11px] tracking-[0.18em] uppercase text-text-muted mb-3 block">
                  Your email address
                </label>
                <div className="flex flex-col sm:flex-row gap-0">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    aria-label="Email address for drop notifications"
                    className="flex-1 bg-transparent border border-[#6B6860] px-4 py-3 font-body text-[14px] text-text-primary-ink placeholder:text-text-muted focus:outline-none focus:border-text-primary transition-colors duration-150 min-w-0"
                  />
                  <button
                    type="submit"
                    className="group relative bg-bg-primary text-text-primary-ink font-body font-medium text-[13px] tracking-widest uppercase px-6 py-3 hover:opacity-90 active:scale-[0.98] transition-all duration-150 whitespace-nowrap flex items-center gap-2 justify-center overflow-hidden"
                  >
                    <span>Notify me</span>
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    {/* microbrand underline even on submit */}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-text-primary-ink group-hover:w-full transition-all duration-200 ease-out" aria-hidden="true" />
                  </button>
                </div>
                <p className="font-body text-[11px] text-text-muted mt-3 tracking-wide">
                  No spam. One message per drop. That's the deal.
                </p>
              </form>
            )}
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}