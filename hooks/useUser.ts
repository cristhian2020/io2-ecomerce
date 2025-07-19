// hooks/useUser.ts
"use client";

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface UserData {
  uid: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  role: string;
}

export function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: firebaseUser.uid,
              name: userData.name || firebaseUser.displayName || 'Usuario',
              phone: userData.phone || '',
              address: userData.address || '',
              email: userData.email || firebaseUser.email || '',
              role: userData.role || 'customer' // Asignar un rol por defecto
            });
          } else {
            // Si no existe el documento, lo creamos con datos básicos
            const newUserData = {
              name: firebaseUser.displayName || 'Usuario',
              phone: '',
              address: '',
              email: firebaseUser.email || '',
              createdAt: new Date(),
              role: 'customer' // Asignar un rol por defecto
            };
            
            await setDoc(doc(db, "users", firebaseUser.uid), newUserData);
            
            setUser({
              uid: firebaseUser.uid,
              ...newUserData
            });
          }
        } catch (error) {
          console.error("Error obteniendo datos de usuario:", error);
          setUser({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Usuario',
            phone: '',
            address: '',
            email: firebaseUser.email || '',
            role: 'customer' // Asignar un rol por defecto
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateUser = async (updates: Partial<UserData>) => {
    if (!user) return;
    
    try {
      await updateDoc(doc(db, "users", user.uid), updates);
      setUser(prev => prev ? {...prev, ...updates} : null);
      return true;
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      return false;
    }
  };

  return { user, loading, updateUser };
}