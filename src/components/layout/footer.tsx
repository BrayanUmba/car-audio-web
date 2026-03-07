import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Car Audio</h3>
            <p className="text-sm text-muted-foreground">
              Los mejores productos de audio para tu vehículo.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/productos" className="hover:text-primary">
                Productos
              </Link>
              <Link href="/carrito" className="hover:text-primary">
                Carrito
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>contacto@caraudio.com</p>
              <p>+57 300 000 0000</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Car Audio. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
