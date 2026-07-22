import {
  boolean, date, integer, numeric, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('user_role', ['admin', 'logistica', 'operaciones']);
export const currencyEnum = pgEnum('currency', ['USD', 'PEN']);
export const importStatusEnum = pgEnum('import_status', [
  'Cotizado','Pagado 30%','Pagado 100%','En tránsito','Numerada','Canal verde','Canal naranja','Canal rojo','Nacionalizada','En almacén'
]);
export const documentStatusEnum = pgEnum('document_status', ['Pendiente','Enviada','Sellada','Aprobada']);

const audit = {
  createdBy: text('created_by'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedBy: text('updated_by'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
};

export const users = pgTable('usuarios', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: text('clerk_user_id').unique(),
  name: text('nombre').notNull(),
  email: text('email').notNull().unique(),
  role: roleEnum('rol').default('admin').notNull(),
  active: boolean('activo').default(true).notNull(),
  ...audit
});

export const suppliers = pgTable('proveedores', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('nombre').notNull(),
  country: text('pais'),
  contact: text('contacto'),
  email: text('email'),
  products: text('productos'),
  bank: text('banco'),
  swift: text('swift'),
  account: text('iban_cuenta'),
  ...audit
});

export const imports = pgTable('importaciones', {
  id: uuid('id').defaultRandom().primaryKey(),
  number: integer('numero').notNull(),
  supplierId: uuid('proveedor_id').references(() => suppliers.id),
  country: text('pais'),
  products: text('productos').notNull(),
  route: text('via').notNull(),
  incoterm: text('incoterm').notNull(),
  status: importStatusEnum('estado').default('Cotizado').notNull(),
  orderDate: date('fecha_pedido'),
  payment30Date: date('fecha_pago_30'),
  balanceDate: date('fecha_pago_saldo'),
  eta: date('eta'),
  actualArrival: date('llegada_real'),
  customsAgent: text('agente_aduana'),
  dam: text('numero_dam'),
  vesselFlight: text('nave_vuelo'),
  blAwb: text('bl_awb'),
  tracking: text('tracking_ref'),
  quantity: numeric('cantidad', { precision: 16, scale: 3 }).default('0').notNull(),
  fob: numeric('fob', { precision: 16, scale: 2 }).default('0').notNull(),
  freight: numeric('flete', { precision: 16, scale: 2 }).default('0').notNull(),
  insurance: numeric('seguro', { precision: 16, scale: 2 }).default('0').notNull(),
  currency: currencyEnum('moneda').default('USD').notNull(),
  ...audit
}, (table) => ({ numberUnique: uniqueIndex('importaciones_numero_unique').on(table.number) }));

export const importCosts = pgTable('importacion_costos', {
  id: uuid('id').defaultRandom().primaryKey(),
  importId: uuid('importacion_id').notNull().references(() => imports.id, { onDelete: 'cascade' }),
  block: text('tipo_bloque').notNull(),
  concept: text('concepto').notNull(),
  amount: numeric('monto', { precision: 16, scale: 2 }).default('0').notNull(),
  recoverable: boolean('es_recuperable').default(false).notNull(),
  ...audit
});

export const products = pgTable('productos', {
  id: uuid('id').defaultRandom().primaryKey(),
  sku: text('sku').notNull().unique(),
  name: text('nombre').notNull(),
  category: text('categoria'),
  presentation: text('presentacion'),
  minimum: numeric('umbral_minimo', { precision: 16, scale: 3 }).default('0').notNull(),
  active: boolean('activo').default(true).notNull(),
  ...audit
});

export const stock = pgTable('stock', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('producto_id').notNull().references(() => products.id),
  quantity: numeric('cantidad', { precision: 16, scale: 3 }).default('0').notNull(),
  unitCost: numeric('costo_unitario', { precision: 16, scale: 4 }).default('0').notNull(),
  currency: currencyEnum('moneda').default('USD').notNull(),
  ...audit
}, (table) => ({ productUnique: uniqueIndex('stock_producto_unique').on(table.productId) }));

export const tankSeries = pgTable('tanques_series', {
  id: uuid('id').defaultRandom().primaryKey(),
  serial: text('serie').notNull().unique(),
  importId: uuid('importacion_id').references(() => imports.id),
  batch: integer('lote'),
  status: text('estado').default('En stock').notNull(),
  saleId: uuid('venta_id'),
  ...audit
});

export const sales = pgTable('ventas', {
  id: uuid('id').defaultRandom().primaryKey(),
  ocNumber: text('numero_oc').notNull(),
  date: date('fecha').notNull(),
  paymentTerms: text('condicion_pago').default('Crédito 15D').notNull(),
  invoiceNumber: text('numero_factura'),
  guideNumber: text('numero_guia'),
  subtotal: numeric('monto_ex_igv', { precision: 16, scale: 2 }).default('0').notNull(),
  igv: numeric('igv', { precision: 16, scale: 2 }).default('0').notNull(),
  total: numeric('total', { precision: 16, scale: 2 }).default('0').notNull(),
  retention: numeric('retencion_3pct', { precision: 16, scale: 2 }).default('0').notNull(),
  collectionStatus: text('estado_cobro').default('Pendiente').notNull(),
  currency: currencyEnum('moneda').default('PEN').notNull(),
  ...audit
});

export const localPurchases = pgTable('compras_locales', {
  id: uuid('id').defaultRandom().primaryKey(),
  supplierName: text('proveedor').notNull(),
  ruc: text('ruc'),
  productId: uuid('producto_id').references(() => products.id),
  quantity: numeric('cantidad', { precision: 16, scale: 3 }).default('0').notNull(),
  unitCost: numeric('costo_unitario', { precision: 16, scale: 4 }).default('0').notNull(),
  invoice: text('factura'),
  date: date('fecha').notNull(),
  currency: currencyEnum('moneda').default('PEN').notNull(),
  ...audit
});

export const ledger = pgTable('libro_mayor', {
  id: uuid('id').defaultRandom().primaryKey(),
  category: text('cuenta_categoria').notNull(),
  detail: text('detalle').notNull(),
  date: date('fecha').notNull(),
  amount: numeric('monto', { precision: 16, scale: 2 }).notNull(),
  currency: currencyEnum('moneda').notNull(),
  comment: text('comentario'),
  originModule: text('modulo_origen'),
  originId: uuid('origen_id'),
  ...audit
});

export const cashflow = pgTable('cashflow_proyeccion', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('tipo').notNull(),
  concept: text('concepto').notNull(),
  estimatedDate: date('fecha_estimada').notNull(),
  amount: numeric('monto', { precision: 16, scale: 2 }).notNull(),
  currency: currencyEnum('moneda').notNull(),
  originModule: text('origen_modulo'),
  originId: uuid('origen_id'),
  completed: boolean('completado').default(false).notNull(),
  ...audit
});

export const documents = pgTable('documentos', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('tipo').notNull(),
  section: text('subseccion').notNull(),
  fileKey: text('ruta_r2').notNull(),
  originalName: text('nombre_archivo').notNull(),
  mimeType: text('mime_type'),
  status: documentStatusEnum('estado_semaforo').default('Pendiente').notNull(),
  originModule: text('modulo_origen'),
  originId: uuid('vinculo_id'),
  sentToYuli: boolean('enviado_yuli').default(false).notNull(),
  ...audit
});

export const tasks = pgTable('pendientes', {
  id: uuid('id').defaultRandom().primaryKey(),
  description: text('descripcion').notNull(),
  priority: text('prioridad').default('media').notNull(),
  status: text('estado').default('Pendiente').notNull(),
  dueDate: date('fecha_limite'),
  originModule: text('modulo_origen'),
  originId: uuid('origen_id'),
  autoGenerated: boolean('auto_generado').default(false).notNull(),
  ...audit
});

// ============================================================================
// MÓDULO 10 · FINANCIERO (checklist Yuli, tributario, préstamos, facturas/RH)
// + retenciones + desglose de ventas — añadido por mejoras-financieras
// ============================================================================

export const loanStatusEnum = pgEnum('loan_status', ['Vigente', 'Devuelto', 'Vencido']);
export const rateTypeEnum = pgEnum('rate_type', ['mensual', 'anual']);

// ---------- 10.1 · CHECKLIST CONTADORA (YULI) ----------
export const accountingChecklist = pgTable('contabilidad_checklist', {
  id: uuid('id').defaultRandom().primaryKey(),
  document: text('documento').notNull(),
  originModule: text('modulo_origen'),
  originId: uuid('origen_id'),
  state: text('estado').default('No enviado').notNull(),
  sentToYuli: boolean('enviado_yuli').default(false).notNull(),
  sentDate: date('fecha_envio'),
  ...audit
});

// ---------- 10.2 · OPTIMIZACIÓN TRIBUTARIA (ALQUILERES + MARCA) ----------
export const rentalOptimization = pgTable('optimizacion_alquileres', {
  id: uuid('id').defaultRandom().primaryKey(),
  concept: text('concepto').notNull(),
  declaredAmount: numeric('monto_declarado', { precision: 16, scale: 2 }).default('0').notNull(),
  realPaymentPct: numeric('pago_real_pct', { precision: 6, scale: 3 }).default('5').notNull(),
  realAmount: numeric('monto_real', { precision: 16, scale: 2 }).default('0').notNull(),
  tiedToSalesPct: boolean('atado_a_ventas').default(false).notNull(),
  month: date('mes').notNull(),
  currency: currencyEnum('moneda').default('USD').notNull(),
  ...audit
});

// ---------- 10.3 · PRÉSTAMOS ----------
export const loans = pgTable('prestamos', {
  id: uuid('id').defaultRandom().primaryKey(),
  lender: text('prestamista').notNull(),
  isCreditLine: boolean('es_linea_credito').default(false).notNull(),
  loanDate: date('fecha_prestamo').notNull(),
  principal: numeric('monto', { precision: 16, scale: 2 }).notNull(),
  currency: currencyEnum('moneda').default('USD').notNull(),
  interestRate: numeric('tasa', { precision: 8, scale: 4 }).default('0').notNull(),
  rateType: rateTypeEnum('tipo_tasa').default('mensual').notNull(),
  termMonths: integer('plazo_meses'),
  dueDate: date('fecha_vencimiento'),
  status: loanStatusEnum('estado').default('Vigente').notNull(),
  notes: text('notas'),
  ...audit
});

export const loanRateHistory = pgTable('prestamos_tasas_historico', {
  id: uuid('id').defaultRandom().primaryKey(),
  loanId: uuid('prestamo_id').notNull().references(() => loans.id, { onDelete: 'cascade' }),
  rate: numeric('tasa', { precision: 8, scale: 4 }).notNull(),
  rateType: rateTypeEnum('tipo_tasa').default('mensual').notNull(),
  changeDate: date('fecha_cambio').notNull(),
  ...audit
});

export const loanPayments = pgTable('prestamos_pagos', {
  id: uuid('id').defaultRandom().primaryKey(),
  loanId: uuid('prestamo_id').notNull().references(() => loans.id, { onDelete: 'cascade' }),
  date: date('fecha').notNull(),
  amount: numeric('monto', { precision: 16, scale: 2 }).notNull(),
  type: text('tipo').notNull(),
  currency: currencyEnum('moneda').default('USD').notNull(),
  ...audit
});

// ---------- 10.4 · FACTURAS Y RH ----------
export const invoicesRh = pgTable('facturas_rh', {
  id: uuid('id').defaultRandom().primaryKey(),
  docType: text('tipo').notNull(),
  issuer: text('emisor').notNull(),
  issuerRuc: text('ruc'),
  number: text('numero'),
  date: date('fecha').notNull(),
  baseAmount: numeric('monto_base', { precision: 16, scale: 2 }).default('0').notNull(),
  igv: numeric('igv', { precision: 16, scale: 2 }).default('0').notNull(),
  fileKey: text('ruta_r2'),
  givesIgvCredit: boolean('genera_credito_igv').default(false).notNull(),
  category: text('categoria'),
  currency: currencyEnum('moneda').default('PEN').notNull(),
  ...audit
});

// ---------- RETENCIONES IGV (constancias R001 de Vari) ----------
export const retentions = pgTable('retenciones', {
  id: uuid('id').defaultRandom().primaryKey(),
  constancia: text('constancia_r001').notNull(),
  saleId: uuid('venta_id').references(() => sales.id),
  amount: numeric('monto', { precision: 16, scale: 2 }).notNull(),
  date: date('fecha'),
  received: boolean('recibida').default(false).notNull(),
  currency: currencyEnum('moneda').default('PEN').notNull(),
  ...audit
});
