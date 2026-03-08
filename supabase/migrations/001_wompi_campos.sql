-- Agrega campos de trazabilidad de Wompi a la tabla pedidos
ALTER TABLE public.pedidos
  ADD COLUMN IF NOT EXISTS wompi_transaction_id text;
