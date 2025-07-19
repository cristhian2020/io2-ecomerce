export const dynamic = "force-dynamic";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id?: string;
  createAt: Date;
  items: OrderItem[];
  total: number;
  [key: string]: any;
}

interface ProductSalesItem {
  id: string;
  name: string;
  price: number;
  totalSold: number;
}
interface ProductSalesWithKey extends ProductSalesItem {
  uniqueKey: string;
}

export default async function ReportsPage() {
  // Obtener ventas del día
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dailyQuery = query(
    collection(db, "orders"),
    where("createAt", ">=", Timestamp.fromDate(today))
  );

  const formateador = new Intl.DateTimeFormat("es-BO", {
   dateStyle: 'full',
  timeStyle: 'short',

  });

  const dailyOrdersSnapshot = await getDocs(dailyQuery);
  const dailyOrders: Order[] = dailyOrdersSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      createAt: data.createAt?.toDate?.() || new Date(),
      items: data.items || [],
      total: data.total || 0,
      ...data,
    };
  });

  const dailyTotal = dailyOrders.reduce((sum, order) => sum + order.total, 0);

  // Obtener ventas de la semana
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  weekAgo.setHours(0, 0, 0, 0);

  const weeklyQuery = query(
    collection(db, "orders"),
    where("createAt", ">=", Timestamp.fromDate(weekAgo))
  );

  const weeklyOrdersSnapshot = await getDocs(weeklyQuery);
  const weeklyOrders: Order[] = weeklyOrdersSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      createAt: data.createAt?.toDate?.() || new Date(),
      items: data.items || [],
      total: data.total || 0,
      ...data,
    };
  });

  const weeklyTotal = weeklyOrders.reduce((sum, order) => sum + order.total, 0);

  // Productos más vendidos
  const allOrdersSnapshot = await getDocs(collection(db, "orders"));
  const allOrders: Order[] = allOrdersSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      createAt: data.createAt?.toDate?.() || new Date(),
      items: data.items || [],
      total: data.total || 0,
      ...data,
    };
  });

  const productSales: Record<string, ProductSalesItem> = {};

  allOrders.forEach((order) => {
    order.items.forEach((item) => {
      const id = item.productId;
      if (!productSales[id]) {
        productSales[id] = {
          id,
          name: item.name,
          price: item.price,
          totalSold: 0,
        };
      }
      productSales[id].totalSold += item.quantity;
    });
  });

  const topProducts: ProductSalesWithKey[] = Object.values(productSales)
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5)
    .map(product => ({
      ...product,
      uniqueKey: `${product.id}-${product.totalSold}`,
    }));

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Reportes de Ventas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Ventas Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Bs {dailyTotal.toFixed(2)}</p>
            <p className="text-sm text-gray-600">{dailyOrders.length} pedidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Ventas Semanales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Bs {weeklyTotal.toFixed(2)}</p>
            <p className="text-sm text-gray-600">{weeklyOrders.length} pedidos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Productos Más Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topProducts.map((product) => (
              <div
                key={product.uniqueKey}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="font-medium">{product.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-pink-500 font-semibold">
                    {product.totalSold} unidadess
                  </span>
                  <span className="text-gray-500">
                    Bs {(product.price * product.totalSold).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="mt-8">
  <CardHeader>
    <CardTitle className="text-xl">Detalle de Pedidos del Día</CardTitle>
  </CardHeader>
  <CardContent className="space-y-6">
    {dailyOrders.length === 0 && <p className="text-gray-500">No hay pedidos hoy.</p>}

    {dailyOrders.map((order) => (
      <div
        key={order.id}
        className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
      >
        <p className="text-sm text-gray-500 mb-1">
          {/* Fecha: {order.createAt.toLocaleString()} */}
          {/* Fecha: {formateador.format(order.createAt)} */}
        </p>
        <p><strong>Cliente:</strong> {order.customer?.name}</p>
        <p><strong>Teléfono:</strong> {order.customer?.phone}</p>
        <p><strong>Dirección:</strong> {order.customer?.address}</p>

        <div className="mt-2">
          <p className="font-semibold">Productos:</p>
          <ul className="ml-4 list-disc">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} — {item.quantity} x Bs {item.price} = <strong>Bs {(item.price * item.quantity).toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-2 font-bold text-right">Total: Bs {order.total.toFixed(2)}</p>
      </div>
    ))}
  </CardContent>
</Card>

    </div>
  );
}
