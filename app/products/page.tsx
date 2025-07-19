"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/products";
import { ProductList } from "@/components/ProductList";
import { LogoutButton } from "../(auth)/LogOutButton";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsSnapshot = await getDocs(collection(db, "products"));
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center sm:text-left">
          Nuestros Productos
        </h1>

        <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
          <div className="flex justify-end gap-3">
            <Link 
              href='/profile' 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors text-center w-full sm:w-auto"
            >
              Perfil
            </Link>
            <Link 
              href="/cart" 
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition-colors text-center w-full sm:w-auto"
            >
              Carrito
            </Link>

            {user?.role === 'admin' && (
              <Link 
                href="/admin/reports" 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors text-center w-full sm:w-auto"
              >
                Reportes
              </Link>
            )}
          </div>
          <div className="flex justify-end">
            <LogoutButton className="w-full sm:w-auto" />
          </div>
        </div>
      </header>

      <ProductList products={products} />
    </div>
  );
}
