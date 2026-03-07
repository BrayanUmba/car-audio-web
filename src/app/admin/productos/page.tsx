import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EliminarProductoBtn } from "@/components/admin/eliminar-producto-btn";

function formatPrecio(precio: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(precio);
}

export default async function AdminProductosPage() {
  const supabase = await createClient();

  const { data: productos } = await supabase
    .from("productos")
    .select("*, categorias(nombre)")
    .eq("activo", true)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Productos</h1>
        <Link href="/admin/productos/nuevo">
          <Button>+ Nuevo producto</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productos && productos.length > 0 ? (
            productos.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.nombre}</TableCell>
                <TableCell>{p.categorias?.nombre ?? "—"}</TableCell>
                <TableCell>
                  {p.precio_oferta ? (
                    <span>
                      <span className="line-through text-muted-foreground mr-2">
                        {formatPrecio(p.precio)}
                      </span>
                      {formatPrecio(p.precio_oferta)}
                    </span>
                  ) : (
                    formatPrecio(p.precio)
                  )}
                </TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  {p.stock > 0 ? (
                    <Badge variant="secondary">Disponible</Badge>
                  ) : (
                    <Badge variant="destructive">Agotado</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/admin/productos/${p.id}/editar`}>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </Link>
                  <EliminarProductoBtn id={p.id} nombre={p.nombre} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No hay productos. Crea el primero.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
