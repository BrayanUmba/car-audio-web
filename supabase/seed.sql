-- ============================================
-- Car Audio - Productos de ejemplo (20 productos)
-- Precios en COP acordes al mercado colombiano 2024
-- ============================================

-- Limpiar productos existentes antes de insertar
TRUNCATE public.productos RESTART IDENTITY CASCADE;

DO $$
DECLARE
  cat_parlantes      uuid;
  cat_amplificadores uuid;
  cat_subwoofers     uuid;
  cat_radios         uuid;
  cat_accesorios     uuid;
BEGIN
  SELECT id INTO cat_parlantes      FROM public.categorias WHERE slug = 'parlantes';
  SELECT id INTO cat_amplificadores FROM public.categorias WHERE slug = 'amplificadores';
  SELECT id INTO cat_subwoofers     FROM public.categorias WHERE slug = 'subwoofers';
  SELECT id INTO cat_radios         FROM public.categorias WHERE slug = 'radios';
  SELECT id INTO cat_accesorios     FROM public.categorias WHERE slug = 'accesorios';

  -- ── PARLANTES (5) ──────────────────────────────────────────────────────────
  INSERT INTO public.productos (nombre, slug, descripcion, precio, precio_oferta, categoria_id, imagenes, stock, destacado) VALUES

  ('Pioneer TS-A1670F 6.5" 3 Vías',
   'pioneer-ts-a1670f',
   'Parlantes coaxiales de 3 vías con potencia máxima de 320W y 70W RMS. Tweeter balanceado con cono de polipropileno para un sonido claro y envolvente. Excelente relación calidad-precio.',
   189000, 159000, cat_parlantes,
   ARRAY['https://picsum.photos/seed/pioneer-parlante/800/600','https://picsum.photos/seed/pioneer-parlante-2/800/600'],
   25, true),

  ('JBL Club 6520 6.5" 2 Vías',
   'jbl-club-6520',
   'Parlantes coaxiales JBL con tecnología Plus One de cono extendido. 150W máximo, 50W RMS. Tweeter de cúpula para agudos nítidos. La elección de los instaladores profesionales.',
   220000, NULL, cat_parlantes,
   ARRAY['https://picsum.photos/seed/jbl-club-parlante/800/600'],
   18, false),

  ('Kenwood KFC-1666S 6.5" 2 Vías',
   'kenwood-kfc-1666s',
   'Parlantes coaxiales de alta eficiencia, 300W pico, 30W RMS. Cono de papel con recubrimiento hidrófobo para mayor durabilidad en ambientes húmedos. Fácil instalación.',
   145000, NULL, cat_parlantes,
   ARRAY['https://picsum.photos/seed/kenwood-parlante/800/600'],
   30, false),

  ('Focal Auditor RCX-165 6.5" Premium',
   'focal-auditor-rcx-165',
   'Parlantes coaxiales de ingeniería francesa. 120W máximo. Tweeter de aluminio invertido con domo de mylar. Medios y agudos de nivel audiófilo. Cono de fibra de vidrio tejida.',
   450000, 389000, cat_parlantes,
   ARRAY['https://picsum.photos/seed/focal-auditor/800/600','https://picsum.photos/seed/focal-auditor-2/800/600'],
   8, true),

  ('Sony XS-FB1620E 6.5" 2 Vías',
   'sony-xs-fb1620e',
   'Parlantes Sony MOS-FET con tweeter de cono suave integrado. 250W máximo, 30W RMS. Diseño compacto compatible con la mayoría de vehículos sin modificaciones.',
   129000, NULL, cat_parlantes,
   ARRAY['https://picsum.photos/seed/sony-xs-parlante/800/600'],
   35, false),

  -- ── AMPLIFICADORES (4) ─────────────────────────────────────────────────────

  ('Taramps MD 3000.1 Mono 2Ω',
   'taramps-md-3000',
   'Amplificador monoblock clase D de 3000W RMS a 2Ω. Eficiencia superior al 92%. Control de bajos integrado, protección térmica y contra cortocircuito. El favorito para subwoofers en Colombia.',
   780000, 650000, cat_amplificadores,
   ARRAY['https://picsum.photos/seed/taramps-md3000/800/600'],
   12, true),

  ('Pioneer GM-D9701 Mono Clase D',
   'pioneer-gm-d9701',
   'Amplificador monoblock clase D, 2400W máximo / 1600W RMS a 1Ω. Tecnología ICEpower para máxima eficiencia. Control de ganancia y frecuencia de corte externamente accesibles.',
   890000, 790000, cat_amplificadores,
   ARRAY['https://picsum.photos/seed/pioneer-amplificador/800/600'],
   6, true),

  ('JBL Stage A6004 4 Canales',
   'jbl-stage-a6004',
   'Amplificador 4 canales, 280W RMS totales (4 x 70W). Puente a 2 canales para 2 x 140W. Clase A/B con excelente respuesta a frecuencias medias. Perfecto para sistema de parlantes completo.',
   490000, NULL, cat_amplificadores,
   ARRAY['https://picsum.photos/seed/jbl-stage-ampli/800/600'],
   20, false),

  ('Stetsom EX 1600 EQ 1 Canal',
   'stetsom-ex-1600',
   'Amplificador monoblock brasileño, 1600W RMS a 2Ω. Ecualizador paramétrico integrado de 3 bandas. Diseño compacto ultra eficiente. Reconocido por su potencia real garantizada.',
   520000, NULL, cat_amplificadores,
   ARRAY['https://picsum.photos/seed/stetsom-ex/800/600'],
   15, false),

  -- ── SUBWOOFERS (4) ────────────────────────────────────────────────────────

  ('Pioneer TS-W312D4 12" 1600W',
   'pioneer-ts-w312d4',
   'Subwoofer de 12 pulgadas, 1600W máximo, 500W RMS. Bobina dual de 4Ω para configuración flexible. Cono de resina reforzada con imán de ferrita de alto flujo.',
   320000, 279000, cat_subwoofers,
   ARRAY['https://picsum.photos/seed/pioneer-subwoofer/800/600'],
   14, true),

  ('Kicker CompRT 12" Slim',
   'kicker-comprt-12',
   'Subwoofer ultra delgado de 12", 500W RMS. Solo 7cm de profundidad total. Ideal para vehículos con cajuela pequeña sin sacrificar potencia de bajos. Bobina dual 2Ω.',
   550000, 489000, cat_subwoofers,
   ARRAY['https://picsum.photos/seed/kicker-comprt/800/600','https://picsum.photos/seed/kicker-comprt-2/800/600'],
   7, true),

  ('JBL Club WS1000 10" Slim',
   'jbl-club-ws1000',
   'Subwoofer delgado de 10 pulgadas, 200W RMS. Caja sellada incluida. Diseño slim de alta excursión para graves profundos en espacios reducidos. Fácil instalación plug & play.',
   480000, NULL, cat_subwoofers,
   ARRAY['https://picsum.photos/seed/jbl-club-sub/800/600'],
   10, false),

  ('Taramps Bass 400 12"',
   'taramps-bass-400',
   'Subwoofer de 12 pulgadas, 400W RMS. Suspensión de espuma de alta excursión. Cono de celulosa tratado para mayor rigidez. Graves potentes y definidos a un precio accesible.',
   250000, NULL, cat_subwoofers,
   ARRAY['https://picsum.photos/seed/taramps-bass/800/600'],
   22, false),

  -- ── RADIOS (4) ────────────────────────────────────────────────────────────

  ('Pioneer DMH-Z5350BT 9" Flotante',
   'pioneer-dmh-z5350bt',
   'Pantalla flotante de 9 pulgadas. Apple CarPlay y Android Auto inalámbrico. Bluetooth multiconexión, USB, entrada cámara reversa. Compatibilidad con Waze y Spotify. Sin lector de CD.',
   1250000, 1099000, cat_radios,
   ARRAY['https://picsum.photos/seed/pioneer-radio-9/800/600','https://picsum.photos/seed/pioneer-radio-9-2/800/600'],
   8, true),

  ('Kenwood DMX9720XDS 10.1" HD',
   'kenwood-dmx9720xds',
   'Pantalla HD capacitiva de 10.1 pulgadas flotante. Mirroring para iPhone y Android. CarPlay y Android Auto. Ecualizador de 13 bandas. Control por gestos y voz. La radio más completa del mercado.',
   1650000, NULL, cat_radios,
   ARRAY['https://picsum.photos/seed/kenwood-radio-10/800/600'],
   5, true),

  ('Sony XAV-AX5500 7" CarPlay',
   'sony-xav-ax5500',
   'Radio doble DIN de 7" con pantalla anti-reflejo. Apple CarPlay y Android Auto con cable. Botón físico de voz para asistentes. 4 x 55W. Diseño elegante con marco estético.',
   980000, 890000, cat_radios,
   ARRAY['https://picsum.photos/seed/sony-xav-radio/800/600'],
   12, false),

  ('JVC KW-M560BT 6.8" Bluetooth',
   'jvc-kw-m560bt',
   'Radio multimedia de 6.8 pulgadas resistivo. Bluetooth, USB dual, Android Mirroring. 4 x 50W MOSFET. Entrada AUX y cámara. La opción más accesible con pantalla táctil.',
   420000, NULL, cat_radios,
   ARRAY['https://picsum.photos/seed/jvc-radio/800/600'],
   16, false),

  -- ── ACCESORIOS (3) ────────────────────────────────────────────────────────

  ('Kit de Cables 4 AWG 3000W',
   'kit-cables-4awg',
   'Kit completo de instalación para amplificador de alta potencia. Incluye 5m cable de poder 4 AWG, 1m cable de tierra, 2 cables RCA doble blindaje, portafusible y fusible de 150A.',
   95000, 79000, cat_accesorios,
   ARRAY['https://picsum.photos/seed/kit-cables-audio/800/600'],
   40, false),

  ('Cámara de Reversa HD Visión Nocturna',
   'camara-reversa-hd',
   'Cámara de reversa 1080P con visión nocturna infrarroja y líneas guía dinámicas. Resistente al agua IP68. Ángulo de visión 170°. Compatible con cualquier radio con entrada de video.',
   75000, NULL, cat_accesorios,
   ARRAY['https://picsum.photos/seed/camara-reversa/800/600'],
   35, false),

  ('Capacitor Taramps 3 Faradios Digital',
   'capacitor-taramps-3f',
   'Capacitor de 3 Faradios con display digital de voltaje en tiempo real. Protege el alternador y la batería de picos de corriente. Reduce el "apagón de luces". Indispensable para sistemas de alta potencia.',
   185000, 159000, cat_accesorios,
   ARRAY['https://picsum.photos/seed/capacitor-audio/800/600'],
   12, true);

END $$;
