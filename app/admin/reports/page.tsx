import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Definición de tipos
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id?: string;
  date: Date;
  items: OrderItem[];
  total: number;
  [key: string]: any; // Para propiedades adicionales
}

interface ProductSales {
  [key: string]: {
    id: string;
    name: string;
    price: number;
    totalSold: number;
  };
}

export default async function ReportsPage() {
  // Obtener ventas del día
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const dailyQuery = query(
    collection(db, "orders"),
    where("date", ">=", today)
  );
  
  const dailyOrdersSnapshot = await getDocs(dailyQuery);
  const dailyOrders: Order[] = dailyOrdersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Order));
  
  const dailyTotal = dailyOrders.reduce((sum: number, order: Order) => sum + order.total, 0);

  // Obtener ventas de la semana
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const weeklyQuery = query(
    collection(db, "orders"),
    where("date", ">=", weekAgo)
  );
  
  const weeklyOrdersSnapshot = await getDocs(weeklyQuery);
  const weeklyOrders: Order[] = weeklyOrdersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Order));
  
  const weeklyTotal = weeklyOrders.reduce((sum: number, order: Order) => sum + order.total, 0);

  // Productos más vendidos
  const allOrdersSnapshot = await getDocs(collection(db, "orders"));
  const allOrders: Order[] = allOrdersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Order));
  
  const productSales: ProductSales = {};
  allOrders.forEach((order: Order) => {
    order.items.forEach((item: OrderItem) => {
      if (!productSales[item.id]) {
        productSales[item.id] = { 
          ...item, 
          totalSold: 0 
        };
      }
      productSales[item.id].totalSold += item.quantity;
    });
  });
  
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Reportes de Ventas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ventas Hoy</h2>
          <p className="text-2xl font-bold">${dailyTotal.toFixed(2)}</p>
          <p>{dailyOrders.length} pedidos</p>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ventas Semanales</h2>
          <p className="text-2xl font-bold">${weeklyTotal.toFixed(2)}</p>
          <p>{weeklyOrders.length} pedidos</p>
        </div>
      </div>
      
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Productos Más Vendidos</h2>
        <div className="space-y-4">
          {topProducts.map(product => (
            <div key={product.id} className="flex justify-between">
              <span>{product.name}</span>
              <span>{product.totalSold} unidades</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}