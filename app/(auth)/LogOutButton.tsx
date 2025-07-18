// (auth)/LogOutButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className={`text-red-500 hover:text-red-700 hover:bg-red-50 ${className}`}
    >
      Cerrar Sesión
    </Button>
  );
}