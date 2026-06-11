"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="w-full">
      {/* Top rule */}
      <div className="w-full h-px bg-[#6B6860]" />

      <div className="w-full bg-bg-ink px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-none">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Threads T-Shirts logo"
                  className="w-12 h-12 object-contain invert"
                />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-[22px] tracking-widest text-text-primary-ink uppercase leading-none">
                    THREADS
                  </span>
                  <span className="font-body text-[11px] tracking-[0.2em] text-text-muted uppercase mt-0.5">
                    T-SHIRTS
                  </span>
                </div>
              </div>
            </Link>

            <p className="font-body text-[13px] text-text-muted leading-relaxed max-w-[220px] text-pretty">
              wear what defines you.
            </p>

            <p className="font-body text-[13px] text-text-muted leading-[1.6] max-w-[240px] text-pretty">
              Four graphics. Four different heads you carry. Made heavy, printed flat, shipped raw.
            </p>

            <p className="font-display font-bold text-[13px] tracking-[0.25em] uppercase text-text-muted mt-2">
              — we sell style
            </p>
          </div>

          {/* Column 2 — Nav */}
          <div className="flex flex-col gap-5">
            <p className="font-display font-bold text-[11px] tracking-[0.3em] uppercase text-text-muted">
              — Navigate
            </p>

            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    group
                    font-body text-[14px] text-text-primary-ink
                    inline-flex items-center gap-1
                    relative w-fit
                    after:content-[''] after:absolute after:left-0 after:bottom-[-2px]
                    after:h-[2px] after:w-0 after:bg-bg-primary
                    after:transition-all after:duration-200 after:ease-out
                    hover:after:w-full
                    focus-visible:outline-none focus-visible:after:w-full
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-2">
              <p className="font-display font-bold text-[11px] tracking-[0.3em] uppercase text-text-muted">
                — Details
              </p>
              <p className="font-body text-[13px] text-text-muted leading-[1.6] text-pretty">
                240 GSM ring-spun cotton.<br />
                Free shipping over ₹599.<br />
                COD available. 7-day returns.
              </p>
            </div>
          </div>

          {/* Column 3 — Contact / Instagram */}
          <div className="flex flex-col gap-5">
            <p className="font-display font-bold text-[11px] tracking-[0.3em] uppercase text-text-muted">
              — Find us
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="https://instagram.com/threads.tshirts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads on Instagram"
                className="
                  group
                  font-body text-[14px] text-text-primary-ink
                  inline-flex items-center gap-2
                  relative w-fit
                  after:content-[''] after:absolute after:left-0 after:bottom-[-2px]
                  after:h-[2px] after:w-0 after:bg-bg-primary
                  after:transition-all after:duration-200 after:ease-out
                  hover:after:w-full
                  focus-visible:outline-none focus-visible:after:w-full
                "
              >
                @threads.tshirts
                <ArrowUpRight size={14} className="text-text-muted group-hover:text-text-primary-ink transition-colors duration-200" />
              </a>

              <p className="font-body text-[13px] text-text-muted leading-[1.6] max-w-[200px] text-pretty">
                DMs open. We read every one.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <p className="font-display font-bold text-[11px] tracking-[0.3em] uppercase text-text-muted">
                — Shipped from
              </p>
              <p className="font-body text-[13px] text-text-muted leading-[1.6]">
                Delhi, India.<br />
                Dispatched within 48 hrs.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[#6B6860] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-body text-[13px] text-text-muted">
            © {year} Threads T-Shirts. All rights reserved.
          </p>
          <p className="font-display font-bold text-[11px] tracking-[0.3em] uppercase text-text-muted">
            WEAR WHAT DEFINES YOU
          </p>
        </div>
      </div>
    </footer>
  );
}