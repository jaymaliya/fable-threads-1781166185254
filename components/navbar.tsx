"use client";

import Link from "next/link";
import { useCart } from "./cart-context";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "SHOP", href: "/shop" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement Ribbon */}
      <div className="w-full bg-bg-primary text-primary-ink py-1.5 overflow-hidden">
        <p className="text-center font-body text-[11px] tracking-widest uppercase text-primary-ink select-none px-4 text-pretty">
          240 GSM 100% cotton&nbsp;&nbsp;—&nbsp;&nbsp;Shipped from Delhi&nbsp;&nbsp;—&nbsp;&nbsp;COD available&nbsp;&nbsp;—&nbsp;&nbsp;7-day returns
        </p>
      </div>

      {/* Main Nav Bar */}
      <nav
        className={`w-full bg-bg-base transition-[box-shadow] duration-200 ${
          scrolled ? "shadow-brand" : ""
        }`}
        aria-label="Main navigation"
      >
        <div className="w-full px-4 md:px-8 flex items-center justify-between h-14 md:h-16">

          {/* Logo + Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary"
            aria-label="threads — home"
          >
            <img
              src="/logo.png"
              alt="threads logo badge"
              className="w-8 h-8 md:w-9 md:h-9 object-contain flex-shrink-0"
            />
            <span
              className="font-display font-bold text-[22px] md:text-[26px] text-text-ink tracking-tight leading-none uppercase relative"
              style={{ letterSpacing: "-0.01em" }}
            >
              threads
              {/* Microbrand underline */}
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-bg-primary transition-[width] duration-[200ms] ease-out group-hover:w-full"
                aria-hidden="true"
              />
            </span>
          </Link>

          {/* Desktop Nav Links + Cart */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}

            <CartButton count={count} openCart={openCart} />
          </div>

          {/* Mobile: Cart + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <CartButton count={count} openCart={openCart} />

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center justify-center w-9 h-9 text-text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* 1px full-width separator — the only divider on the site */}
        <div className="w-full h-px bg-border-line" aria-hidden="true" />

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden bg-bg-base md:hidden"
            >
              <div className="flex flex-col px-4 pb-5 pt-3 gap-0">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.06 + i * 0.05,
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group relative block py-3 font-display font-bold text-[15px] tracking-widest text-text-ink uppercase border-b border-border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary"
                    >
                      {link.label}
                      <span
                        className="absolute bottom-0 left-0 h-[2px] w-0 bg-bg-primary transition-[width] duration-[200ms] ease-out group-hover:w-full"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile brand tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  className="mt-5 font-body text-[11px] tracking-widest uppercase text-text-muted"
                >
                  wear what defines you
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

/* ── Sub-components ── */

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative font-display font-bold text-[14px] tracking-widest text-text-ink uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary pb-0.5"
    >
      {label}
      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-bg-primary transition-[width] duration-[200ms] ease-out group-hover:w-full"
        aria-hidden="true"
      />
    </Link>
  );
}

function CartButton({
  count,
  openCart,
}: {
  count: number;
  openCart: () => void;
}) {
  return (
    <button
      onClick={openCart}
      aria-label={`Open cart, ${count} item${count !== 1 ? "s" : ""}`}
      className="group relative flex items-center justify-center w-9 h-9 text-text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-primary"
    >
      <ShoppingBag size={20} strokeWidth={1.75} />

      {/* Count badge */}
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 bg-bg-primary text-primary-ink font-body font-bold text-[9px] leading-none"
          aria-hidden="true"
        >
          {count > 9 ? "9+" : count}
        </motion.span>
      )}

      {/* Microbrand underline on icon button */}
      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-bg-primary transition-[width] duration-[200ms] ease-out group-hover:w-full"
        aria-hidden="true"
      />
    </button>
  );
}