import Link from "next/link";
import { redirect } from "next/navigation";
import { esAdmin } from "@/lib/supabase/auth";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/clientes", label: "Clientes" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await esAdmin();

  if (!admin) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/40 p-6">
        <h2 className="text-lg font-bold mb-6">
          <Link href="/admin">Admin Panel</Link>
        </h2>
        <nav className="flex flex-col gap-2">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← Volver a la tienda
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
