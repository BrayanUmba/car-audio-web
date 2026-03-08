"use client";

import { useEffect } from "react";
import { useCarrito } from "@/lib/carrito-context";

export function VaciarCarritoEnExito() {
  const { vaciarCarrito } = useCarrito();
  useEffect(() => {
    vaciarCarrito();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
