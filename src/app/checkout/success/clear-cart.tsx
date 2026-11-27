"use client";
import { useEffect } from "react";
import { useCart } from "@/components/cart-provider";

export function ClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    try {
      localStorage.removeItem("proteger-cart");
    } catch {}
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
