"use server";

import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";

interface ItemCarrito {
  producto_id: string;
  cantidad: number;
}

interface ResultadoCheckout {
  error?: string;
  redirectUrl?: string;
}

function generarFirmaIntegrity(
  reference: string,
  amountInCents: number,
  currency: string,
  integritySecret: string
): string {
  const cadena = `${reference}${amountInCents}${currency}${integritySecret}`;
  return crypto.createHash("sha256").update(cadena).digest("hex");
}

export async function crearPedidoAction(
  _prevState: ResultadoCheckout,
  formData: FormData
): Promise<ResultadoCheckout> {
  const supabase = await createClient();

  // 1. Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Debes iniciar sesión para realizar un pedido." };
  }

  // 2. Obtener items del carrito desde el form (serializado en cliente)
  const itemsRaw = formData.get("items") as string;
  let itemsCarrito: ItemCarrito[];
  try {
    itemsCarrito = JSON.parse(itemsRaw);
  } catch {
    return { error: "Error al procesar el carrito. Intenta de nuevo." };
  }

  if (!itemsCarrito || itemsCarrito.length === 0) {
    return { error: "El carrito está vacío." };
  }

  // 3. Obtener datos del formulario
  const nombre = (formData.get("nombre") as string)?.trim();
  const direccion = (formData.get("direccion") as string)?.trim();
  const ciudad = (formData.get("ciudad") as string)?.trim();
  const telefono = (formData.get("telefono") as string)?.trim();
  const notas = (formData.get("notas") as string)?.trim() || null;

  if (!nombre || !direccion || !ciudad || !telefono) {
    return { error: "Completa todos los campos obligatorios." };
  }

  // 4. Recalcular precios desde la DB (nunca confiar en el cliente)
  const ids = itemsCarrito.map((i) => i.producto_id);
  const { data: productos, error: errorProductos } = await supabase
    .from("productos")
    .select("id, precio, precio_oferta, stock")
    .in("id", ids)
    .eq("activo", true);

  if (errorProductos || !productos) {
    return { error: "Error al verificar los productos. Intenta de nuevo." };
  }

  // Verificar stock y calcular totales
  let subtotal = 0;
  const itemsValidados: {
    producto_id: string;
    nombre_producto: string;
    cantidad: number;
    precio_unitario: number;
    subtotal_item: number;
  }[] = [];

  for (const item of itemsCarrito) {
    const producto = productos.find((p) => p.id === item.producto_id);
    if (!producto) {
      return { error: "Uno de los productos ya no está disponible." };
    }
    if (producto.stock < item.cantidad) {
      return { error: `Stock insuficiente para uno de los productos.` };
    }
    const precio = producto.precio_oferta ?? producto.precio;
    const subtotalItem = precio * item.cantidad;
    subtotal += subtotalItem;
    itemsValidados.push({
      producto_id: item.producto_id,
      nombre_producto: "", // se rellena abajo
      cantidad: item.cantidad,
      precio_unitario: precio,
      subtotal_item: subtotalItem,
    });
  }

  // Obtener nombres de productos para el histórico
  const { data: productosNombres } = await supabase
    .from("productos")
    .select("id, nombre")
    .in("id", ids);

  itemsValidados.forEach((item) => {
    const prod = productosNombres?.find((p) => p.id === item.producto_id);
    item.nombre_producto = prod?.nombre ?? "Producto";
  });

  const envio = subtotal >= 200000 ? 0 : 15000;
  const total = subtotal + envio;

  // 5. Crear el pedido en la DB
  const { data: pedido, error: errorPedido } = await supabase
    .from("pedidos")
    .insert({
      usuario_id: user.id,
      estado: "pendiente",
      subtotal,
      envio,
      total,
      direccion_envio: direccion,
      ciudad_envio: ciudad,
      telefono_contacto: telefono,
      notas,
    })
    .select("id")
    .single();

  if (errorPedido || !pedido) {
    return { error: "Error al crear el pedido. Intenta de nuevo." };
  }

  // 6. Insertar items del pedido
  const { error: errorItems } = await supabase.from("items_pedido").insert(
    itemsValidados.map((item) => ({
      pedido_id: pedido.id,
      producto_id: item.producto_id,
      nombre_producto: item.nombre_producto,
      cantidad: item.cantidad,
      precio_unitario: item.precio_unitario,
      subtotal: item.subtotal_item,
    }))
  );

  if (errorItems) {
    // Revertir el pedido si fallan los items
    await supabase.from("pedidos").delete().eq("id", pedido.id);
    return { error: "Error al procesar los items del pedido." };
  }

  // 7. Generar URL de Wompi
  const amountInCents = total * 100;
  const currency = "COP";
  const reference = pedido.id;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const firma = generarFirmaIntegrity(
    reference,
    amountInCents,
    currency,
    process.env.WOMPI_INTEGRITY_SECRET!
  );

  const params = new URLSearchParams({
    "public-key": process.env.WOMPI_PUBLIC_KEY!,
    currency,
    "amount-in-cents": String(amountInCents),
    reference,
    "signature:integrity": firma,
    "redirect-url": `${siteUrl}/pago-resultado`,
    "customer-data:full-name": nombre,
    "customer-data:phone-number": telefono,
  });

  const redirectUrl = `https://checkout.wompi.co/p/?${params.toString()}`;

  return { redirectUrl };
}
