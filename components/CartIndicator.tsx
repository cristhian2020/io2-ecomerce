// En tu layout o header
"use client";
import { useCart } from "@/hooks/useCart";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export function CartIndicator() {
  const { cart } = useCart();
  
  return (
    <Link href="/cart" className="relative">
      <ShoppingCartIcon />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {cart.reduce((total, item) => total + item.quantity, 0)}
        </span>
      )}
    </Link>
  );
}