// src/components/auth/LogoutButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
     alert('Sesión cerrada correctamente');
      router.push('/login');
    } catch (error) {
        alert('Error al cerrar sesión. Por favor, inténtalo de nuevo.');
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Button 
      onClick={handleLogout}
      variant="ghost"
      className="text-red-500 hover:text-red-700 hover:bg-red-50"
    >
      Cerrar Sesión
    </Button>
  );
}