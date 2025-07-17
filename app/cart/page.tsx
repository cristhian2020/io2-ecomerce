"use client";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser"; // Necesitarás implementar este hook

export default function CartPage() {
  const { cart, removeFromCart, total } = useCart();
  const { user } = useUser(); // Obtén la información del usuario

  const handleCheckout = () => {
    if (!user) {
      alert("Por favor inicia sesión para continuar");
      return;
    }

    const message = `Nuevo Pedido: 
Nombre: ${user.name}
Teléfono: ${user.phone}
Productos:
${cart
  .map(
    (item) =>
      `${item.name} x ${item.quantity} - Bs ${item.price * item.quantity}`
  )
  .join("\n")}
Total: Bs ${total}
Dirección: ${user.address}`;

    const whatsappUrl = `https://wa.me/62640539?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p>
                    {item.quantity} x Bs {item.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-xl font-semibold">
              Total: Bs {total.toFixed(2)}
            </p>
            <Button className="mt-4" onClick={handleCheckout}>
              Confirmar Compra
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
