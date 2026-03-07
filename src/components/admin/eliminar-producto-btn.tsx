"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { eliminarProducto } from "@/app/admin/productos/actions";
import { useRouter } from "next/navigation";

export function EliminarProductoBtn({
  id,
  nombre,
}: {
  id: string;
  nombre: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEliminar() {
    if (!confirm(`¿Eliminar "${nombre}"?`)) return;
    setLoading(true);
    await eliminarProducto(id);
    router.refresh();
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={loading}
      onClick={handleEliminar}
    >
      {loading ? "..." : "Eliminar"}
    </Button>
  );
}
