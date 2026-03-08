import { CheckCircle2, XCircle, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import { VaciarCarritoEnExito } from "./vaciar-carrito-en-exito";

interface TransaccionWompi {
  id: string;
  status: "APPROVED" | "DECLINED" | "VOIDED" | "ERROR" | "PENDING";
  reference: string;
  amount_in_cents: number;
  currency: string;
}

async function obtenerTransaccion(
  transactionId: string
): Promise<TransaccionWompi | null> {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://production.wompi.co/v1"
        : "https://sandbox.wompi.co/v1";

    const res = await fetch(`${baseUrl}/transactions/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json.data as TransaccionWompi;
  } catch {
    return null;
  }
}

function formatPrecio(centavos: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(centavos / 100);
}

export default async function PagoResultadoPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; ref?: string }>;
}) {
  const { id, ref } = await searchParams;

  // Sin parámetros: acceso directo a la página
  if (!id || !ref) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-muted-foreground">Página no válida.</p>
        <Link href="/" className="text-red-400 hover:underline mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const transaccion = await obtenerTransaccion(id);
  const aprobado = transaccion?.status === "APPROVED";

  return (
    <div className="container mx-auto px-4 py-16 max-w-lg">
      {aprobado ? (
        <>
          <VaciarCarritoEnExito />
          <div className="text-center space-y-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="h-12 w-12 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">¡Pago exitoso!</h1>
              <p className="text-muted-foreground">
                Tu pedido ha sido confirmado y está siendo procesado.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-left space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Package className="h-4 w-4" />
                Detalles del pago
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Referencia</span>
                <span className="font-mono text-xs">{ref?.slice(0, 8)}...</span>
              </div>
              {transaccion && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total pagado</span>
                  <span className="font-bold text-green-400">
                    {formatPrecio(transaccion.amount_in_cents)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estado</span>
                <span className="text-green-400 font-medium">Aprobado</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/productos"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg border border-white/10 transition-all"
              >
                Seguir comprando
              </Link>
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all"
              >
                Ir al inicio
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center space-y-6">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
            <XCircle className="h-12 w-12 text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Pago no completado</h1>
            <p className="text-muted-foreground">
              {transaccion?.status === "PENDING"
                ? "Tu pago está siendo procesado. Te notificaremos cuando se confirme."
                : "El pago fue rechazado o cancelado. No se realizó ningún cargo."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/carrito"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al carrito
            </Link>
            <Link
              href="/productos"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg border border-white/10 transition-all"
            >
              Ver productos
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
