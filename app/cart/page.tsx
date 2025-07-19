"use client";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner"; // Cambiamos a sonner
import { saveOrder } from "@/lib/saveOrder";


export default function CartPage() {
  const { cart, removeFromCart, total } = useCart();
  const { user } = useUser();
  const router = useRouter();

  const handleCheckout = async () => {
  if (!user) {
    toast.error("Por favor inicia sesión para continuar", {
      action: {
        label: "Iniciar sesión",
        onClick: () => router.push("/login"),
      },
    });
    return;
  }

  const missingFields = [];
  if (!user.name) missingFields.push("nombre");
  if (!user.phone) missingFields.push("teléfono");
  if (!user.address) missingFields.push("dirección");

  if (missingFields.length > 0) {
    toast.error(`Información incompleta. Por favor completa tu ${missingFields.join(", ")} en tu perfil`, {
      action: {
        label: "Completar perfil",
        onClick: () => router.push("/profile"),
      },
    });
    return;
  }

  try {
    // 1. Guardar la orden en Firebase
    await saveOrder(user, cart, 5); // 5 = costo de envío fijo, puedes hacerlo dinámico

    // 2. Preparar mensaje para WhatsApp
    const productsText = cart
      .map(item => `${item.name} x ${item.quantity} - Bs ${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const message = `🍰 *Nuevo Pedido - Stitch's Bakery* 🍰

*Cliente:* ${user.name}
*Teléfono:* ${user.phone}
*Dirección:* ${user.address}

*Pedido:*
${productsText}

*Total a pagar:* Bs ${total.toFixed(2)}

¡Gracias por tu compra!`;

    const whatsappUrl = `https://wa.me/59162640539?text=${encodeURIComponent(message)}`;
    
    toast.success("¡Pedido registrado exitosamente!");
    window.open(whatsappUrl, "_blank");

    // Redirigir al usuario o limpiar carrito (opcional)
    // clearCart(); // si tienes una función en useCart
    // router.push("/success");

  } catch (error) {
    console.error("Error al guardar el pedido:", error);
    toast.error("Ocurrió un error al guardar tu pedido. Inténtalo nuevamente.");
  }
};


  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
            🛒 Tu Carrito
          </CardTitle>
        </CardHeader>

        <CardContent>
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg">Tu carrito está vacío</p>
              <Button 
                onClick={() => router.push("/products")} 
                className="mt-4 bg-pink-500 hover:bg-pink-600"
              >
                Ver Productos
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <p className="text-gray-600">
                        {item.quantity} × Bs {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">
                        Bs {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success("Producto eliminado del carrito");
                        }}
                        className="hover:scale-105 transition-transform"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold">Bs {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {cart.length > 0 && (
          <CardFooter className="flex flex-col sm:flex-row justify-end gap-4">
            <Button 
              variant="outline" 
              onClick={() => router.push("/products")}
              className="w-full sm:w-auto"
            >
              Seguir Comprando
            </Button>
            <Button 
              onClick={handleCheckout}
              className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600"
            >
              Confirmar Compra por WhatsApp
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}