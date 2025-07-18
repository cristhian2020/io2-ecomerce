// app/profile/page.tsx
"use client";

import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function ProfilePage() {
  const { user, updateUser, loading } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  // Actualizar el estado del formulario cuando user cambie
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const success = await updateUser({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
    });

    if (success) {
      alert("Datos actualizados correctamente");
    } else {
      alert("Error al actualizar los datos");
    }
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center sm:text-left">
            Mi Perfil
            {formData.name && <span className="text-gray-500"> -Hola: {formData.name}</span>}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Nombre Completo
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium">
                  Dirección
                </label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                />
              </div>
            </div>

            <CardFooter className="flex flex-col sm:flex-row justify-end gap-4 px-0">
              <Link href="/products" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                >
                  Volver a Productos
                </Button>
              </Link>
              
              <Button
                type="submit"
                className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600"
              >
                Guardar Cambios
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}