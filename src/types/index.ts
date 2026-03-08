export interface Producto {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  precio_oferta?: number;
  imagenes: string[];
  categoria_id: string;
  stock: number;
  destacado: boolean;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  imagen?: string;
}

export interface Pedido {
  id: string;
  usuario_id: string;
  estado: "pendiente" | "confirmado" | "enviado" | "entregado" | "cancelado";
  subtotal: number;
  envio: number;
  total: number;
  direccion_envio?: string;
  ciudad_envio?: string;
  telefono_contacto?: string;
  notas?: string;
  referencia_wompi?: string;
  wompi_transaction_id?: string;
  items: ItemPedido[];
  created_at: string;
  updated_at: string;
}

export interface DatosCheckout {
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  notas?: string;
}

export type ResultadoCheckout =
  | { error: string }
  | { redirectUrl: string };

export interface ItemPedido {
  producto_id: string;
  producto: Producto;
  cantidad: number;
  precio_unitario: number;
}

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  telefono?: string;
  direccion?: string;
  rol: "cliente" | "admin";
}
