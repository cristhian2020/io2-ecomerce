import React from "react";
import { SocialLinks } from "./social/SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-pink-300 text-white py-8"> {/* Aumenté el padding vertical */}
      <div className="container mx-auto">
        {/* Contenedor especial para los SocialLinks centrados */}
        <div className="flex justify-center mb-6"> {/* Centrado horizontal y margen inferior */}
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm"> {/* Fondo semitransparente con desenfoque */}
            <SocialLinks />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm mb-2"> {/* Añadí margen inferior */}
            © {new Date().getFullYear()} Stitch's Bakery. Todos los derechos reservados.
          </p>
          <p className="text-sm mb-2"> {/* Añadí margen inferior */}
            Desarrollado por{" "}
            <a 
              href="https://www.tusitioweb.com" 
              className="text-[#F0427D] hover:text-[#d43a6b] transition-colors" /* Efecto hover */
              target="_blank" 
              rel="noopener noreferrer"
            >
              Cristhian
            </a>
          </p>
          <div className="flex justify-center gap-4 text-sm"> {/* Centrado y espacio entre enlaces */}
            <a href="#" className="hover:text-[#F0427D] transition-colors font-semibold">Política de privacidad</a>
            <span>|</span>
            <a href="#" className="hover:text-[#F0427D] transition-colors font-semibold">Términos de servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}