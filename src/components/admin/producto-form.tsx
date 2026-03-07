"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Categoria {
  id: string;
  nombre: string;
}

interface ProductoData {
  id?: string;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  precio_oferta?: number | null;
  categoria_id?: string | null;
  stock?: number;
  destacado?: boolean;
}

export function ProductoForm({
  producto,
  categorias,
  action,
}: {
  producto?: ProductoData;
  categorias: Categoria[];
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin/productos");
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>
          {producto ? "Editar producto" : "Nuevo producto"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              defaultValue={producto?.nombre}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              defaultValue={producto?.descripcion}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="precio">Precio (COP)</Label>
              <Input
                id="precio"
                name="precio"
                type="number"
                min={0}
                defaultValue={producto?.precio}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precio_oferta">Precio oferta (opcional)</Label>
              <Input
                id="precio_oferta"
                name="precio_oferta"
                type="number"
                min={0}
                defaultValue={producto?.precio_oferta ?? ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoria_id">Categoría</Label>
              <select
                id="categoria_id"
                name="categoria_id"
                defaultValue={producto?.categoria_id ?? ""}
                className="flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm"
              >
                <option value="">Sin categoría</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min={0}
                defaultValue={producto?.stock ?? 0}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="destacado"
              name="destacado"
              type="checkbox"
              defaultChecked={producto?.destacado}
              className="h-4 w-4"
            />
            <Label htmlFor="destacado">Producto destacado</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/productos")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
