"use client";

import { useState, useEffect } from "react";

// Definición de tipos
interface Product {
  id: string;
  name: string;
  price: number;
  // Agrega aquí otras propiedades que tenga tu producto
  image?: string;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

export function useCart() {
  // Especifica el tipo genérico para useState
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        // Verifica que los datos parseados coincidan con el tipo CartItem[]
        const parsedCart: CartItem[] = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      } catch (error) {
        console.error("Error al parsear el carrito:", error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart: CartItem[]) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart: CartItem[]) => 
      prevCart.filter((item) => item.id !== productId)
    );
  };

  const clearCart =()=>{
    setCart([]);
    localStorage.removeItem("cart");

  }

  const total = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity, 
    0
  );

  return { cart, addToCart, removeFromCart, total, clearCart };
}