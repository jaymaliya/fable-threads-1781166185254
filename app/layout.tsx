import type { Metadata } from "next";
import CartProvider from "../components/cart-context";
import CartDrawer from "../components/cart-drawer";
import "./globals.css";

export const metadata: Metadata = {
  title: "threads",
  description: "we sell style",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-base">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700&family=DM+Sans:wght@400;500&display=swap" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="bg-base text-ink font-body antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
