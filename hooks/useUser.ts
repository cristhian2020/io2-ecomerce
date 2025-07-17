// hooks/useUser.ts
"use client";

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

interface UserData {
  uid: string;
  name: string;
  phone: string;
  address: string;
  email: string;
}

export function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Aquí puedes obtener más datos del usuario de Firestore si es necesario
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'Usuario',
          phone: firebaseUser.phoneNumber || '',
          address: '',
          email: firebaseUser.email || ''
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}