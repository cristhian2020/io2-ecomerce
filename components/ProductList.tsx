// components/ProductList.tsx
"use client";

import { useCart } from "@/hooks/useCart";
import { Button } from "./ui/button";
import { Product } from "@/types/products";

export function ProductList({ products }: { products: Product[] }) {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    alert(`Producto agregado al carrito: ${product.name}`);
    console.log(`Product added to cart: ${product.name}`);
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="border rounded-lg p-4">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4"/>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-800 ">{product.description}</p>
          <p className="text-gray-600 mb-2">Bs {product.price}</p>
          <Button onClick={() => handleAddToCart(product)} className="mt-2 w-full">
            Agregar al carrito
          </Button>
        </div>
      ))}
    </div>
  );
}