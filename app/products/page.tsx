import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Product } from "@/types/products";
import { ProductList } from "@/components/ProductList";
import { LogoutButton } from "../(auth)/LogOutButton";
import Link from "next/link";

export default async function ProductsPage() {
  const productsSnapshot = await getDocs(collection(db, "products"));
  const products = productsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Product[];

  const verCarrito=()=>{
    <Link href="/cart" className="bg-pink-500 text-white px-4 py-2 rounded"/>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl  font-bold mb-8 text-center">Nuestros Productos</h1>
      <LogoutButton/>
      {/* Carrito de compras */}
      <div className="flex justify-end mb-4">
        <Link href="/cart" className="bg-pink-500 text-white px-4 py-2 rounded">
          Ver Carrito
        </Link>
      </div>

      <ProductList products={products} />
    </div>
  );
}
