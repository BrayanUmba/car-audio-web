"use client";

import { Button } from "@/components/ui/button";
import { useCarrito } from "@/lib/carrito-context";
import { ShoppingCart } from "lucide-react";
import type { Producto } from "@/types";

export function AgregarCarritoBtn({
  producto,
  disabled,
}: {
  producto: Producto;
  disabled?: boolean;
}) {
  const { agregarProducto } = useCarrito();

  return (
    <Button
      size="lg"
      className="w-full"
      disabled={disabled}
      onClick={() => agregarProducto(producto)}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {disabled ? "Agotado" : "Agregar al carrito"}
    </Button>
  );
}
