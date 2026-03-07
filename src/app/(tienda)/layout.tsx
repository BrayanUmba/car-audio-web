import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PromoBanner } from "@/components/layout/promo-banner";
import { CarritoProvider } from "@/lib/carrito-context";

export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CarritoProvider>
      <div className="flex min-h-screen flex-col">
        <PromoBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CarritoProvider>
  );
}
