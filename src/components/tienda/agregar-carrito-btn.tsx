"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCarrito } from "@/lib/carrito-context";
import { ShoppingCart, Check } from "lucide-react";
import type { Producto } from "@/types";

export function AgregarCarritoBtn({
  producto,
  disabled,
}: {
  producto: Producto;
  disabled?: boolean;
}) {
  const { agregarProducto } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  function handleClick() {
    agregarProducto(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  }

  return (
    <Button
      size="lg"
      className={`w-full h-12 text-base font-semibold border-0 shadow-lg transition-all ${
        agregado
          ? "bg-green-600 hover:bg-green-600 shadow-green-500/25"
          : disabled
            ? ""
            : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-red-500/25"
      }`}
      disabled={disabled}
      onClick={handleClick}
    >
      {disabled ? (
        "Agotado"
      ) : agregado ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Agregado al carrito
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Agregar al carrito
        </>
      )}
    </Button>
  );
}
