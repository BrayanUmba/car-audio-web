"use client";

import { useRouter } from "next/navigation";
import { actualizarEstadoPedido } from "@/app/admin/pedidos/actions";

const estados = ["pendiente", "confirmado", "enviado", "entregado", "cancelado"];

export function CambiarEstadoBtn({
  id,
  estadoActual,
}: {
  id: string;
  estadoActual: string;
}) {
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await actualizarEstadoPedido(id, e.target.value);
    router.refresh();
  }

  return (
    <select
      defaultValue={estadoActual}
      onChange={handleChange}
      className="rounded-md border bg-background px-2 py-1 text-sm"
    >
      {estados.map((estado) => (
        <option key={estado} value={estado}>
          {estado.charAt(0).toUpperCase() + estado.slice(1)}
        </option>
      ))}
    </select>
  );
}
