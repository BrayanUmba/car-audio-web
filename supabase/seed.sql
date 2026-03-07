-- ============================================
-- Car Audio - Productos de ejemplo
-- ============================================

-- Obtener IDs de categorías
DO $$
DECLARE
  cat_parlantes uuid;
  cat_amplificadores uuid;
  cat_subwoofers uuid;
  cat_radios uuid;
  cat_accesorios uuid;
BEGIN
  SELECT id INTO cat_parlantes FROM public.categorias WHERE slug = 'parlantes';
  SELECT id INTO cat_amplificadores FROM public.categorias WHERE slug = 'amplificadores';
  SELECT id INTO cat_subwoofers FROM public.categorias WHERE slug = 'subwoofers';
  SELECT id INTO cat_radios FROM public.categorias WHERE slug = 'radios';
  SELECT id INTO cat_accesorios FROM public.categorias WHERE slug = 'accesorios';

  -- PARLANTES
  INSERT INTO public.productos (nombre, slug, descripcion, precio, precio_oferta, categoria_id, imagenes, stock, destacado) VALUES
  ('Pioneer TS-A1670F 6.5"', 'pioneer-ts-a1670f', 'Parlantes coaxiales de 3 vías, 320W máximo, 70W RMS. Sonido claro y potente con tweeter balanceado.', 189000, 159000, cat_parlantes, ARRAY['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600'], 25, true),
  ('JBL Club 6520 6.5"', 'jbl-club-6520', 'Parlantes coaxiales de 2 vías, 150W máximo, 50W RMS. Calidad JBL con tweeter de cúpula plus one.', 220000, NULL, cat_parlantes, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600'], 18, false),
  ('Kenwood KFC-1666S 6.5"', 'kenwood-kfc-1666s', 'Parlantes de 2 vías, 300W pico, 30W RMS. Cono de papel con recubrimiento para mayor durabilidad.', 145000, NULL, cat_parlantes, ARRAY['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600'], 30, false),
  ('Focal Auditor RCX-165 6.5"', 'focal-auditor-rcx-165', 'Parlantes coaxiales premium, 120W máximo. Sonido audiófilo francés con tweeter de aluminio invertido.', 450000, 389000, cat_parlantes, ARRAY['https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600'], 8, true),

  -- AMPLIFICADORES
  ('Taramps MD 3000.1 2Ω', 'taramps-md-3000', 'Amplificador monoblock de 3000W RMS a 2Ω. Clase D, eficiencia superior al 90%. Ideal para subwoofers.', 780000, 650000, cat_amplificadores, ARRAY['https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600'], 12, true),
  ('Stetsom EX 1600 EQ', 'stetsom-ex-1600', 'Amplificador 1 canal, 1600W RMS a 2Ω. Diseño compacto con ecualizador integrado. Full range.', 520000, NULL, cat_amplificadores, ARRAY['https://images.unsplash.com/photo-1571974599782-87624638275e?w=600'], 15, false),
  ('Pioneer GM-D9701 Mono', 'pioneer-gm-d9701', 'Amplificador clase D, 2400W máximo. Circuito ICEpower para máxima eficiencia y mínimo ruido.', 890000, 790000, cat_amplificadores, ARRAY['https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600'], 6, true),
  ('JBL Stage A6004 4CH', 'jbl-stage-a6004', 'Amplificador 4 canales, 280W totales. Perfecto para alimentar 4 parlantes con potencia limpia.', 350000, NULL, cat_amplificadores, ARRAY['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600'], 20, false),

  -- SUBWOOFERS
  ('Pionner TS-W312D4 12"', 'pioneer-ts-w312d4', 'Subwoofer de 12 pulgadas, 1600W máximo, 500W RMS. Bobina dual de 4Ω para instalación versátil.', 320000, 279000, cat_subwoofers, ARRAY['https://images.unsplash.com/photo-1574169208507-84376144848b?w=600'], 14, true),
  ('JBL Club WS1000 10"', 'jbl-club-ws1000', 'Subwoofer slim de 10", 200W RMS. Diseño delgado perfecto para espacios reducidos. Incluye caja sellada.', 480000, NULL, cat_subwoofers, ARRAY['https://images.unsplash.com/photo-1558584673-2856ce11acb1?w=600'], 10, false),
  ('Kicker CompRT 12"', 'kicker-comprt-12', 'Subwoofer ultra delgado de 12", 500W RMS. Solo 7cm de profundidad. Ideal para cajuela pequeña.', 550000, 489000, cat_subwoofers, ARRAY['https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=600'], 7, true),
  ('Taramps Bass 400 12"', 'taramps-bass-400', 'Subwoofer de 12", 400W RMS. Suspensión de espuma con cono de celulosa. Graves potentes y definidos.', 250000, NULL, cat_subwoofers, ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'], 22, false),

  -- RADIOS
  ('Pioneer DMH-Z5350BT 9"', 'pioneer-dmh-z5350bt', 'Radio multimedia 9" flotante. Apple CarPlay y Android Auto inalámbrico. Bluetooth, USB, cámara reversa.', 1250000, 1099000, cat_radios, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600'], 8, true),
  ('Kenwood DMX9720XDS 10.1"', 'kenwood-dmx9720xds', 'Pantalla HD de 10.1" flotante. Mirroring, CarPlay, Android Auto. Ecualizador 13 bandas.', 1650000, NULL, cat_radios, ARRAY['https://images.unsplash.com/photo-1571974599782-87624638275e?w=600'], 5, true),
  ('Sony XAV-AX5500 7"', 'sony-xav-ax5500', 'Radio doble DIN 7". Anti-reflejo. CarPlay y Android Auto. Botón de voz dedicado para asistentes.', 980000, 890000, cat_radios, ARRAY['https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600'], 12, false),
  ('JBL Legend CP100SP', 'jbl-legend-cp100sp', 'Radio 1 DIN con smartphone dock. Potencia 4x50W. Bluetooth con aptX. Diseño minimalista.', 420000, NULL, cat_radios, ARRAY['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600'], 16, false),

  -- ACCESORIOS
  ('Kit de cables calibre 4 AWG', 'kit-cables-4awg', 'Kit completo para instalación de amplificador. Incluye cable de alimentación, tierra, RCA y portafusible.', 95000, 79000, cat_accesorios, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600'], 40, false),
  ('Cámara de reversa HD', 'camara-reversa-hd', 'Cámara con visión nocturna y líneas guía. Resistente al agua IP68. Compatible con cualquier radio.', 75000, NULL, cat_accesorios, ARRAY['https://images.unsplash.com/photo-1571974599782-87624638275e?w=600'], 35, false),
  ('Capacitor Taramps 3000W', 'capacitor-taramps-3000', 'Capacitor de 3 Faradios con display digital. Protege el sistema eléctrico y estabiliza la potencia.', 185000, 159000, cat_accesorios, ARRAY['https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600'], 12, true);

END $$;
