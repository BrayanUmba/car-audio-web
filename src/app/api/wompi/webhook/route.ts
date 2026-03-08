import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  // 1. Leer el body como texto para verificar la firma
  const bodyText = await request.text();

  // 2. Verificar la firma HMAC enviada por Wompi
  const checksumRecibido = request.headers.get("x-event-checksum");
  const checksumEsperado = crypto
    .createHash("sha256")
    .update(bodyText + process.env.WOMPI_EVENTS_SECRET!)
    .digest("hex");

  if (checksumRecibido !== checksumEsperado) {
    return new Response("Firma inválida", { status: 401 });
  }

  // 3. Parsear el evento
  let evento: {
    event: string;
    data: { transaction: { id: string; status: string; reference: string } };
  };

  try {
    evento = JSON.parse(bodyText);
  } catch {
    return new Response("Body inválido", { status: 400 });
  }

  // 4. Solo procesar actualizaciones de transacción aprobada
  if (evento.event !== "transaction.updated") {
    return new Response("OK", { status: 200 });
  }

  const transaccion = evento.data?.transaction;
  if (!transaccion || transaccion.status !== "APPROVED") {
    return new Response("OK", { status: 200 });
  }

  // 5. Actualizar el pedido usando el cliente admin (bypasea RLS)
  const supabase = createAdminClient();
  await supabase
    .from("pedidos")
    .update({
      estado: "confirmado",
      wompi_transaction_id: transaccion.id,
    })
    .eq("id", transaccion.reference);

  return new Response("OK", { status: 200 });
}
