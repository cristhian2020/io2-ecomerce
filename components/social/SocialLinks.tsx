import { Facebook, Instagram } from "lucide-react";

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.75 2c.46 2.55 2.2 4.5 4.75 4.87v2.3c-1.1-.04-2.1-.37-3-1v5.6c0 3.66-3.66 5.57-6.35 3.85-1.8-1.16-2.06-3.87-.27-5.25.74-.58 1.62-.87 2.62-.83v2.22c-1.66-.2-2.06 2.2-.5 2.66 1.13.34 2.5-.43 2.5-1.9V2h.75Z" />
    </svg>
  );
}

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <a
        href="https://www.tiktok.com/@croc_cup?_t=ZM-8y5YAzyRyon&_r=1"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-white text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-all"
        aria-label="TikTok"
      >
        <TikTokIcon className="w-5 h-5" />
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
     
    </div>
  );
}
