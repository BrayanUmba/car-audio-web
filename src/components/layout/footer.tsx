import Link from "next/link";
import { Volume2, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-500">
                <Volume2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Car <span className="text-gradient">Audio</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Especialistas en sonido automotriz. Instalación profesional y los
              mejores productos del mercado.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categorías</h4>
            <nav className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <Link href="/productos?categoria=parlantes" className="hover:text-foreground transition-colors">Parlantes</Link>
              <Link href="/productos?categoria=amplificadores" className="hover:text-foreground transition-colors">Amplificadores</Link>
              <Link href="/productos?categoria=subwoofers" className="hover:text-foreground transition-colors">Subwoofers</Link>
              <Link href="/productos?categoria=radios" className="hover:text-foreground transition-colors">Radios</Link>
              <Link href="/productos?categoria=accesorios" className="hover:text-foreground transition-colors">Accesorios</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tienda</h4>
            <nav className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <Link href="/productos" className="hover:text-foreground transition-colors">Todos los productos</Link>
              <Link href="/carrito" className="hover:text-foreground transition-colors">Mi carrito</Link>
              <Link href="/login" className="hover:text-foreground transition-colors">Mi cuenta</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+57 300 000 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contacto@caraudio.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Bogotá, Colombia</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/5" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Car Audio. Todos los derechos reservados.</p>
          <p>Diseñado con pasión por el sonido</p>
        </div>
      </div>
    </footer>
  );
}
