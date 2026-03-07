"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-6 py-24 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          El mejor sonido para tu vehículo
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Parlantes, amplificadores, subwoofers y todo lo que necesitas para
          llevar tu audio al siguiente nivel.
        </p>
        <div className="flex gap-4">
          <Link href="/productos" className={buttonVariants({ size: "lg" })}>
            Ver productos
          </Link>
          <Link
            href="#categorias"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Categorías
          </Link>
        </div>
      </section>
    </div>
  );
}
