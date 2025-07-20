"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });

 const handleRegister = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      email: formData.email,
      role: "customer",
    });

    setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        password: "",
    })

    router.push("/login");

   } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      alert("Este correo electrónico ya está registrado. Intenta iniciar sesión.");
    } else {
      console.error("Error registering user:", error);
      alert("Error al registrar. Intenta nuevamente.");
    }
  }
};

  return (
    <div className="flex items-start justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md ">
        <h1 className="text-2xl font-bold mb-6 text-center">Registro</h1>
        <form onSubmit={handleRegister}>
          <Input
            className="w-full h-13 bg-[#f3d8e1]"
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
          
            type="number"
            placeholder="Teléfono"
            className="mt-4 w-full h-13 bg-[#f3d8e1]"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <Input
            type="email"
            placeholder="Correo electrónico"
            className="mt-4 w-full h-13 bg-[#f3d8e1]"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Dirección"
            className="mt-4 w-full h-13 bg-[#f3d8e1]"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="Contraseña"
            className="mt-4 w-full h-13 bg-[#f3d8e1]"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <p className="mt-2 text-sm text-center text-pink-600">
            La contraseña debe tener al menos 6 caracteres. 
          </p>
          <Button type="submit" className="mt-6 w-full bg-[#F0427D] text-white" >
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
}
