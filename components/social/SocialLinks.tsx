import { Facebook, Instagram } from "lucide-react"; // Asegúrate de importar los íconos que uses

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4"> {/* Espacio entre íconos */}
      <a 
        href="https://www.tiktok.com/@croc_cup?_t=ZM-8y5YAzyRyon&_r=1" 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 bg-white text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-all"
        aria-label="Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>
      <a 
        href="https://www.instagram.com/croccups/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 bg-white text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-all"
        aria-label="Instagram"
      >
        <Instagram className="w-5 h-5" />
      </a>
      {/* Agrega más redes sociales según necesites */}
    </div>
  );
}