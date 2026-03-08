"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarrito } from "@/lib/carrito-context";
import { motion } from "framer-motion";
import type { Producto } from "@/types";

function formatPrecio(precio: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(precio);
}

export function ProductoCard({ producto }: { producto: Producto }) {
  const { agregarProducto } = useCarrito();

  const descuento = producto.precio_oferta
    ? Math.round(((producto.precio - producto.precio_oferta) / producto.precio) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl h-full"
      style={{
        background: "oklch(0.13 0.018 295 / 0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid oklch(1 0 0 / 0.07)",
      }}
    >
      {/* Borde superior glow al hover */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.64 0.17 295 / 0.7), transparent)" }} />

      {/* Imagen */}
      <Link href={`/productos/${producto.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden"
          style={{ background: "oklch(0.10 0.015 295)" }}>
          {producto.imagenes?.[0] ? (
            <Image
              src={producto.imagenes[0]}
              alt={producto.nombre}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">Sin imagen</div>
          )}

          {/* Overlay gradiente al hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "linear-gradient(to top, oklch(0.09 0.018 295 / 0.6) 0%, transparent 50%)" }} />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {descuento > 0 && (
              <Badge className="font-bold text-white border-0 shadow-lg"
                style={{ background: "linear-gradient(135deg, oklch(0.48 0.20 295), oklch(0.60 0.18 295))" }}>
                -{descuento}%
              </Badge>
            )}
            {producto.destacado && (
              <Badge className="font-bold border-0 shadow-lg gap-1"
                style={{ background: "oklch(0.65 0.18 60 / 0.90)", color: "white" }}>
                <Star className="h-3 w-3 fill-white" /> Top
              </Badge>
            )}
          </div>

          {producto.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: "oklch(0.05 0.01 295 / 0.75)", backdropFilter: "blur(2px)" }}>
              <span className="rounded-full px-4 py-1.5 text-sm font-semibold text-white"
                style={{ background: "oklch(0.20 0.02 295 / 0.90)", border: "1px solid oklch(1 0 0 / 0.15)" }}>
                Agotado
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <Link href={`/productos/${producto.slug}`}>
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 hover:text-primary transition-colors">
            {producto.nombre}
          </h3>
        </Link>

        {/* Stock badge */}
        {producto.stock > 0 && producto.stock <= 5 && (
          <p className="text-xs font-medium" style={{ color: "oklch(0.65 0.18 60)" }}>
            ¡Solo {producto.stock} disponibles!
          </p>
        )}

        {/* Precio + botón */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.05)" }}>
          <div>
            {producto.precio_oferta ? (
              <div className="flex flex-col">
                <span className="text-lg font-black"
                  style={{ background: "linear-gradient(135deg, oklch(0.64 0.17 295), oklch(0.75 0.12 300))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {formatPrecio(producto.precio_oferta)}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrecio(producto.precio)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-black">
                {formatPrecio(producto.precio)}
              </span>
            )}
          </div>

          {producto.stock > 0 && (
            <Button
              size="icon"
              className="shrink-0 h-9 w-9 rounded-xl border-0 text-white shadow-md transition-all hover:scale-110"
              style={{ background: "linear-gradient(135deg, oklch(0.48 0.20 295), oklch(0.60 0.18 295))", boxShadow: "0 4px 12px oklch(0.52 0.20 295 / 0.35)" }}
              onClick={(e) => {
                e.preventDefault();
                agregarProducto(producto);
              }}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
