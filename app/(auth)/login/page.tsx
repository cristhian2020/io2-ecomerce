'use client';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // 👈 íconos de Lucide

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // 👈 nuevo estado
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setFormData({ email: "", password: "" });
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Stitch's Bakery</h2>
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            className="w-80 h-15 bg-[#f3d8e1]"
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <div className="relative mt-4">
            <Input
              className="w-80 h-15 bg-[#f3d8e1] pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button type="submit" className="mt-6 w-80 bg-[#F0427D] text-white">
            Login
          </Button>
        </form>
        <p className="text-center mt-2">
          ¿No estás registrado?{" "}
          <Link href="/register" className="text-[#F0427D]">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
