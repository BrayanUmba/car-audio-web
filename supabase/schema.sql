-- ============================================
-- Car Audio - Esquema de base de datos
-- ============================================

-- Habilitar UUID
create extension if not exists "uuid-ossp";

-- ============================================
-- PERFILES (extiende auth.users de Supabase)
-- ============================================
create table public.perfiles (
  id uuid references auth.users on delete cascade primary key,
  nombre text not null,
  telefono text,
  direccion text,
  ciudad text,
  rol text not null default 'cliente' check (rol in ('cliente', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Crear perfil automáticamente al registrarse
create or replace function public.crear_perfil_nuevo_usuario()
returns trigger as $$
begin
  insert into public.perfiles (id, nombre)
  values (new.id, coalesce(new.raw_user_meta_data->>'nombre', 'Sin nombre'));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.crear_perfil_nuevo_usuario();

-- ============================================
-- CATEGORÍAS
-- ============================================
create table public.categorias (
  id uuid default uuid_generate_v4() primary key,
  nombre text not null,
  slug text not null unique,
  descripcion text,
  imagen_url text,
  activo boolean not null default true,
  orden int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================
-- PRODUCTOS
-- ============================================
create table public.productos (
  id uuid default uuid_generate_v4() primary key,
  nombre text not null,
  slug text not null unique,
  descripcion text,
  precio numeric(10,2) not null check (precio >= 0),
  precio_oferta numeric(10,2) check (precio_oferta >= 0),
  categoria_id uuid references public.categorias on delete set null,
  imagenes text[] default '{}',
  stock int not null default 0 check (stock >= 0),
  destacado boolean not null default false,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Índices para búsquedas frecuentes
create index idx_productos_categoria on public.productos(categoria_id);
create index idx_productos_activo on public.productos(activo) where activo = true;
create index idx_productos_destacado on public.productos(destacado) where destacado = true;
create index idx_productos_slug on public.productos(slug);

-- ============================================
-- PEDIDOS
-- ============================================
create table public.pedidos (
  id uuid default uuid_generate_v4() primary key,
  usuario_id uuid references public.perfiles on delete set null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado')),
  subtotal numeric(10,2) not null default 0,
  envio numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  direccion_envio text,
  ciudad_envio text,
  telefono_contacto text,
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_pedidos_usuario on public.pedidos(usuario_id);
create index idx_pedidos_estado on public.pedidos(estado);

-- ============================================
-- ITEMS DE PEDIDO
-- ============================================
create table public.items_pedido (
  id uuid default uuid_generate_v4() primary key,
  pedido_id uuid references public.pedidos on delete cascade not null,
  producto_id uuid references public.productos on delete set null,
  nombre_producto text not null,
  cantidad int not null check (cantidad > 0),
  precio_unitario numeric(10,2) not null,
  subtotal numeric(10,2) not null,
  created_at timestamptz not null default now()
);

create index idx_items_pedido on public.items_pedido(pedido_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Perfiles
alter table public.perfiles enable row level security;

create policy "Los usuarios pueden ver su propio perfil"
  on public.perfiles for select
  using (auth.uid() = id);

create policy "Los usuarios pueden actualizar su propio perfil"
  on public.perfiles for update
  using (auth.uid() = id);

create policy "Los admins pueden ver todos los perfiles"
  on public.perfiles for select
  using (
    exists (select 1 from public.perfiles where id = auth.uid() and rol = 'admin')
  );

-- Categorías (lectura pública)
alter table public.categorias enable row level security;

create policy "Lectura pública de categorías"
  on public.categorias for select
  using (activo = true);

create policy "Solo admins pueden gestionar categorías"
  on public.categorias for all
  using (
    exists (select 1 from public.perfiles where id = auth.uid() and rol = 'admin')
  );

-- Productos (lectura pública)
alter table public.productos enable row level security;

create policy "Lectura pública de productos"
  on public.productos for select
  using (activo = true);

create policy "Solo admins pueden gestionar productos"
  on public.productos for all
  using (
    exists (select 1 from public.perfiles where id = auth.uid() and rol = 'admin')
  );

-- Pedidos
alter table public.pedidos enable row level security;

create policy "Los usuarios pueden ver sus propios pedidos"
  on public.pedidos for select
  using (auth.uid() = usuario_id);

create policy "Los usuarios pueden crear pedidos"
  on public.pedidos for insert
  with check (auth.uid() = usuario_id);

create policy "Los admins pueden ver todos los pedidos"
  on public.pedidos for select
  using (
    exists (select 1 from public.perfiles where id = auth.uid() and rol = 'admin')
  );

create policy "Los admins pueden actualizar pedidos"
  on public.pedidos for update
  using (
    exists (select 1 from public.perfiles where id = auth.uid() and rol = 'admin')
  );

-- Items de pedido
alter table public.items_pedido enable row level security;

create policy "Los usuarios pueden ver items de sus pedidos"
  on public.items_pedido for select
  using (
    exists (select 1 from public.pedidos where id = pedido_id and usuario_id = auth.uid())
  );

create policy "Los usuarios pueden crear items en sus pedidos"
  on public.items_pedido for insert
  with check (
    exists (select 1 from public.pedidos where id = pedido_id and usuario_id = auth.uid())
  );

create policy "Los admins pueden ver todos los items"
  on public.items_pedido for select
  using (
    exists (select 1 from public.perfiles where id = auth.uid() and rol = 'admin')
  );

-- ============================================
-- FUNCIÓN: Actualizar updated_at automáticamente
-- ============================================
create or replace function public.actualizar_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger actualizar_perfiles_updated_at
  before update on public.perfiles
  for each row execute function public.actualizar_updated_at();

create trigger actualizar_productos_updated_at
  before update on public.productos
  for each row execute function public.actualizar_updated_at();

create trigger actualizar_pedidos_updated_at
  before update on public.pedidos
  for each row execute function public.actualizar_updated_at();

-- ============================================
-- DATOS INICIALES: Categorías
-- ============================================
insert into public.categorias (nombre, slug, descripcion, orden) values
  ('Parlantes', 'parlantes', 'Parlantes y altavoces para vehículos', 1),
  ('Amplificadores', 'amplificadores', 'Amplificadores de potencia', 2),
  ('Subwoofers', 'subwoofers', 'Subwoofers y cajas de bajo', 3),
  ('Radios', 'radios', 'Radios y reproductores multimedia', 4),
  ('Accesorios', 'accesorios', 'Cables, conectores y accesorios', 5);
