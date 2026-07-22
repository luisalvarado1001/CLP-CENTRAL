CREATE TYPE "public"."currency" AS ENUM('USD', 'PEN');--> statement-breakpoint
CREATE TYPE "public"."document_status" AS ENUM('Pendiente', 'Enviada', 'Sellada', 'Aprobada');--> statement-breakpoint
CREATE TYPE "public"."import_status" AS ENUM('Cotizado', 'Pagado 30%', 'Pagado 100%', 'En tránsito', 'Numerada', 'Canal verde', 'Canal naranja', 'Canal rojo', 'Nacionalizada', 'En almacén');--> statement-breakpoint
CREATE TYPE "public"."loan_status" AS ENUM('Vigente', 'Devuelto', 'Vencido');--> statement-breakpoint
CREATE TYPE "public"."rate_type" AS ENUM('mensual', 'anual');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'logistica', 'operaciones');--> statement-breakpoint
CREATE TABLE "contabilidad_checklist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"documento" text NOT NULL,
	"modulo_origen" text,
	"origen_id" uuid,
	"estado" text DEFAULT 'No enviado' NOT NULL,
	"enviado_yuli" boolean DEFAULT false NOT NULL,
	"fecha_envio" date,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cashflow_proyeccion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tipo" text NOT NULL,
	"concepto" text NOT NULL,
	"fecha_estimada" date NOT NULL,
	"monto" numeric(16, 2) NOT NULL,
	"moneda" "currency" NOT NULL,
	"origen_modulo" text,
	"origen_id" uuid,
	"completado" boolean DEFAULT false NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documentos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tipo" text NOT NULL,
	"subseccion" text NOT NULL,
	"ruta_r2" text NOT NULL,
	"nombre_archivo" text NOT NULL,
	"mime_type" text,
	"estado_semaforo" "document_status" DEFAULT 'Pendiente' NOT NULL,
	"modulo_origen" text,
	"vinculo_id" uuid,
	"enviado_yuli" boolean DEFAULT false NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "importacion_costos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"importacion_id" uuid NOT NULL,
	"tipo_bloque" text NOT NULL,
	"concepto" text NOT NULL,
	"monto" numeric(16, 2) DEFAULT '0' NOT NULL,
	"es_recuperable" boolean DEFAULT false NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "importaciones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"numero" integer NOT NULL,
	"proveedor_id" uuid,
	"pais" text,
	"productos" text NOT NULL,
	"via" text NOT NULL,
	"incoterm" text NOT NULL,
	"estado" "import_status" DEFAULT 'Cotizado' NOT NULL,
	"fecha_pedido" date,
	"fecha_pago_30" date,
	"fecha_pago_saldo" date,
	"eta" date,
	"llegada_real" date,
	"agente_aduana" text,
	"numero_dam" text,
	"nave_vuelo" text,
	"bl_awb" text,
	"tracking_ref" text,
	"cantidad" numeric(16, 3) DEFAULT '0' NOT NULL,
	"fob" numeric(16, 2) DEFAULT '0' NOT NULL,
	"flete" numeric(16, 2) DEFAULT '0' NOT NULL,
	"seguro" numeric(16, 2) DEFAULT '0' NOT NULL,
	"moneda" "currency" DEFAULT 'USD' NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "facturas_rh" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tipo" text NOT NULL,
	"emisor" text NOT NULL,
	"ruc" text,
	"numero" text,
	"fecha" date NOT NULL,
	"monto_base" numeric(16, 2) DEFAULT '0' NOT NULL,
	"igv" numeric(16, 2) DEFAULT '0' NOT NULL,
	"ruta_r2" text,
	"genera_credito_igv" boolean DEFAULT false NOT NULL,
	"categoria" text,
	"moneda" "currency" DEFAULT 'PEN' NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "libro_mayor" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cuenta_categoria" text NOT NULL,
	"detalle" text NOT NULL,
	"fecha" date NOT NULL,
	"monto" numeric(16, 2) NOT NULL,
	"moneda" "currency" NOT NULL,
	"comentario" text,
	"modulo_origen" text,
	"origen_id" uuid,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prestamos_pagos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prestamo_id" uuid NOT NULL,
	"fecha" date NOT NULL,
	"monto" numeric(16, 2) NOT NULL,
	"tipo" text NOT NULL,
	"moneda" "currency" DEFAULT 'USD' NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prestamos_tasas_historico" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prestamo_id" uuid NOT NULL,
	"tasa" numeric(8, 4) NOT NULL,
	"tipo_tasa" "rate_type" DEFAULT 'mensual' NOT NULL,
	"fecha_cambio" date NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prestamos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prestamista" text NOT NULL,
	"es_linea_credito" boolean DEFAULT false NOT NULL,
	"fecha_prestamo" date NOT NULL,
	"monto" numeric(16, 2) NOT NULL,
	"moneda" "currency" DEFAULT 'USD' NOT NULL,
	"tasa" numeric(8, 4) DEFAULT '0' NOT NULL,
	"tipo_tasa" "rate_type" DEFAULT 'mensual' NOT NULL,
	"plazo_meses" integer,
	"fecha_vencimiento" date,
	"estado" "loan_status" DEFAULT 'Vigente' NOT NULL,
	"notas" text,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "compras_locales" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"proveedor" text NOT NULL,
	"ruc" text,
	"producto_id" uuid,
	"cantidad" numeric(16, 3) DEFAULT '0' NOT NULL,
	"costo_unitario" numeric(16, 4) DEFAULT '0' NOT NULL,
	"factura" text,
	"fecha" date NOT NULL,
	"moneda" "currency" DEFAULT 'PEN' NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "productos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sku" text NOT NULL,
	"nombre" text NOT NULL,
	"categoria" text,
	"presentacion" text,
	"umbral_minimo" numeric(16, 3) DEFAULT '0' NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "productos_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "optimizacion_alquileres" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"concepto" text NOT NULL,
	"monto_declarado" numeric(16, 2) DEFAULT '0' NOT NULL,
	"pago_real_pct" numeric(6, 3) DEFAULT '5' NOT NULL,
	"monto_real" numeric(16, 2) DEFAULT '0' NOT NULL,
	"atado_a_ventas" boolean DEFAULT false NOT NULL,
	"mes" date NOT NULL,
	"moneda" "currency" DEFAULT 'USD' NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "retenciones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"constancia_r001" text NOT NULL,
	"venta_id" uuid,
	"monto" numeric(16, 2) NOT NULL,
	"fecha" date,
	"recibida" boolean DEFAULT false NOT NULL,
	"moneda" "currency" DEFAULT 'PEN' NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ventas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"numero_oc" text NOT NULL,
	"fecha" date NOT NULL,
	"condicion_pago" text DEFAULT 'Crédito 15D' NOT NULL,
	"numero_factura" text,
	"numero_guia" text,
	"monto_ex_igv" numeric(16, 2) DEFAULT '0' NOT NULL,
	"igv" numeric(16, 2) DEFAULT '0' NOT NULL,
	"total" numeric(16, 2) DEFAULT '0' NOT NULL,
	"retencion_3pct" numeric(16, 2) DEFAULT '0' NOT NULL,
	"estado_cobro" text DEFAULT 'Pendiente' NOT NULL,
	"moneda" "currency" DEFAULT 'PEN' NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stock" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"producto_id" uuid NOT NULL,
	"cantidad" numeric(16, 3) DEFAULT '0' NOT NULL,
	"costo_unitario" numeric(16, 4) DEFAULT '0' NOT NULL,
	"moneda" "currency" DEFAULT 'USD' NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proveedores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" text NOT NULL,
	"pais" text,
	"contacto" text,
	"email" text,
	"productos" text,
	"banco" text,
	"swift" text,
	"iban_cuenta" text,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tanques_series" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"serie" text NOT NULL,
	"importacion_id" uuid,
	"lote" integer,
	"estado" text DEFAULT 'En stock' NOT NULL,
	"venta_id" uuid,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tanques_series_serie_unique" UNIQUE("serie")
);
--> statement-breakpoint
CREATE TABLE "pendientes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"descripcion" text NOT NULL,
	"prioridad" text DEFAULT 'media' NOT NULL,
	"estado" text DEFAULT 'Pendiente' NOT NULL,
	"fecha_limite" date,
	"modulo_origen" text,
	"origen_id" uuid,
	"auto_generado" boolean DEFAULT false NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text,
	"nombre" text NOT NULL,
	"email" text NOT NULL,
	"rol" "user_role" DEFAULT 'admin' NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_clerk_user_id_unique" UNIQUE("clerk_user_id"),
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "importacion_costos" ADD CONSTRAINT "importacion_costos_importacion_id_importaciones_id_fk" FOREIGN KEY ("importacion_id") REFERENCES "public"."importaciones"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "importaciones" ADD CONSTRAINT "importaciones_proveedor_id_proveedores_id_fk" FOREIGN KEY ("proveedor_id") REFERENCES "public"."proveedores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prestamos_pagos" ADD CONSTRAINT "prestamos_pagos_prestamo_id_prestamos_id_fk" FOREIGN KEY ("prestamo_id") REFERENCES "public"."prestamos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prestamos_tasas_historico" ADD CONSTRAINT "prestamos_tasas_historico_prestamo_id_prestamos_id_fk" FOREIGN KEY ("prestamo_id") REFERENCES "public"."prestamos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "compras_locales" ADD CONSTRAINT "compras_locales_producto_id_productos_id_fk" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retenciones" ADD CONSTRAINT "retenciones_venta_id_ventas_id_fk" FOREIGN KEY ("venta_id") REFERENCES "public"."ventas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock" ADD CONSTRAINT "stock_producto_id_productos_id_fk" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tanques_series" ADD CONSTRAINT "tanques_series_importacion_id_importaciones_id_fk" FOREIGN KEY ("importacion_id") REFERENCES "public"."importaciones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "importaciones_numero_unique" ON "importaciones" USING btree ("numero");--> statement-breakpoint
CREATE UNIQUE INDEX "stock_producto_unique" ON "stock" USING btree ("producto_id");