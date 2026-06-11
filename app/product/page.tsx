"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "../../lib/products";
import ProductView from "../../components/product-view";

function ProductInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const product = PRODUCTS.find(p => p.id === id) ?? PRODUCTS[0];
  return <ProductView product={product} />;
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProductInner />
    </Suspense>
  );
}
