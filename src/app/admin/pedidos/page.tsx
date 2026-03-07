import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CambiarEstadoBtn } from "@/components/admin/cambiar-estado-btn";

const estadoColor: Record<string, "default" | "secondary" | "destructive"> = {
  pendiente: "secondary",
  confirmado: "default",
  enviado: "default",
  entregado: "default",
  cancelado: "destructive",
};

function formatPrecio(precio: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(precio);
}

export default async function AdminPedidosPage() {
  const supabase = await createClient();

  const { data: pedidos } = await supabase
    .from("pedidos")
    .select("*, perfiles(nombre, email:id)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Pedidos</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pedidos && pedidos.length > 0 ? (
            pedidos.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-sm">
                  {p.id.slice(0, 8)}
                </TableCell>
                <TableCell>
                  {new Date(p.created_at).toLocaleDateString("es-CO")}
                </TableCell>
                <TableCell className="font-medium">
                  {formatPrecio(p.total)}
                </TableCell>
                <TableCell>
                  <Badge variant={estadoColor[p.estado] ?? "secondary"}>
                    {p.estado}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <CambiarEstadoBtn id={p.id} estadoActual={p.estado} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No hay pedidos aún.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
