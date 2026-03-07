import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: totalProductos }, { count: totalPedidos }, { count: totalClientes }] =
    await Promise.all([
      supabase.from("productos").select("*", { count: "exact", head: true }),
      supabase.from("pedidos").select("*", { count: "exact", head: true }),
      supabase.from("perfiles").select("*", { count: "exact", head: true }).eq("rol", "cliente"),
    ]);

  const { data: pedidosRecientes } = await supabase
    .from("pedidos")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Productos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalProductos ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalPedidos ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalClientes ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">Pedidos recientes</h2>
      {pedidosRecientes && pedidosRecientes.length > 0 ? (
        <div className="space-y-2">
          {pedidosRecientes.map((p) => (
            <Card key={p.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">Pedido #{p.id.slice(0, 8)}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(p.created_at).toLocaleDateString("es-CO")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }).format(p.total)}
                  </p>
                  <p className="text-sm capitalize text-muted-foreground">
                    {p.estado}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No hay pedidos aún.</p>
      )}
    </div>
  );
}
