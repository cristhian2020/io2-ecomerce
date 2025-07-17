// types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  // Agrega otras propiedades que necesites
  stock?: number;
  category?: string;
}