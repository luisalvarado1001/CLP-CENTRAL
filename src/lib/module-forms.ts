// Configuración de formularios por módulo (data plana, usable en cliente).
export type Field = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea';
  options?: string[];
  required?: boolean;
  step?: string;
};

// slug del módulo -> (título, campos) | null si no tiene alta directa
export const moduleForms: Record<string, { title: string; actionModule: string; fields: Field[] } | null> = {
  importaciones: {
    title: 'Nueva importación', actionModule: 'importaciones',
    fields: [
      { name: 'number', label: 'N° importación', type: 'number', required: true },
      { name: 'products', label: 'Producto(s)', type: 'text', required: true },
      { name: 'country', label: 'País', type: 'text' },
      { name: 'route', label: 'Vía', type: 'select', options: ['Marítimo', 'Aéreo', 'Marítimo LCL'] },
      { name: 'incoterm', label: 'Incoterm', type: 'select', options: ['FOB', 'EXW', 'CIF'] },
      { name: 'status', label: 'Estado', type: 'select', options: ['Cotizado', 'Pagado 30%', 'Pagado 100%', 'En tránsito', 'Numerada', 'Canal verde', 'Canal naranja', 'Canal rojo', 'Nacionalizada', 'En almacén'] },
      { name: 'quantity', label: 'Cantidad', type: 'number', step: '0.001' },
      { name: 'fob', label: 'FOB (USD)', type: 'number', step: '0.01' },
      { name: 'freight', label: 'Flete (USD)', type: 'number', step: '0.01' },
      { name: 'insurance', label: 'Seguro (USD)', type: 'number', step: '0.01' },
      { name: 'eta', label: 'ETA', type: 'date' }
    ]
  },
  'libro-mayor': {
    title: 'Nuevo movimiento', actionModule: 'libro-mayor',
    fields: [
      { name: 'date', label: 'Fecha', type: 'date', required: true },
      { name: 'category', label: 'Categoría', type: 'select', required: true, options: ['CAJA', 'INVENTARIO', 'VENTA', 'ADYACENTES', 'GASTO FINANCIERO', 'OTRO', 'REEMBOLSO', 'PAGO EXTRA', 'ALQUILER / L.CREDITO', 'INTERÉS PRÉSTAMO'] },
      { name: 'detail', label: 'Detalle', type: 'text', required: true },
      { name: 'amount', label: 'Monto (+ ingreso / − egreso)', type: 'number', required: true, step: '0.01' },
      { name: 'currency', label: 'Moneda', type: 'select', options: ['USD', 'PEN'] },
      { name: 'comment', label: 'Comentario', type: 'text' }
    ]
  },
  ventas: {
    title: 'Nueva venta a Vari', actionModule: 'ventas',
    fields: [
      { name: 'ocNumber', label: 'N° OC', type: 'text', required: true },
      { name: 'invoiceNumber', label: 'N° Factura (E001-)', type: 'text' },
      { name: 'guideNumber', label: 'N° Guía (EG07-)', type: 'text' },
      { name: 'date', label: 'Fecha', type: 'date', required: true },
      { name: 'subtotal', label: 'Monto ex-IGV', type: 'number', required: true, step: '0.01' },
      { name: 'currency', label: 'Moneda', type: 'select', options: ['USD', 'PEN'] },
      { name: 'collectionStatus', label: 'Estado cobro', type: 'select', options: ['Pendiente', 'Pagado'] }
    ]
  },
  'compras-locales': {
    title: 'Nueva compra local', actionModule: 'compras-locales',
    fields: [
      { name: 'date', label: 'Fecha', type: 'date', required: true },
      { name: 'supplierName', label: 'Proveedor', type: 'text', required: true },
      { name: 'ruc', label: 'RUC', type: 'text' },
      { name: 'quantity', label: 'Cantidad', type: 'number', step: '0.001' },
      { name: 'unitCost', label: 'Costo unitario', type: 'number', step: '0.0001' },
      { name: 'invoice', label: 'Factura', type: 'text' },
      { name: 'currency', label: 'Moneda', type: 'select', options: ['PEN', 'USD'] }
    ]
  },
  proveedores: {
    title: 'Nuevo proveedor', actionModule: 'proveedores',
    fields: [
      { name: 'name', label: 'Nombre', type: 'text', required: true },
      { name: 'country', label: 'País', type: 'text' },
      { name: 'contact', label: 'Contacto', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'products', label: 'Productos', type: 'text' },
      { name: 'bank', label: 'Banco', type: 'text' },
      { name: 'swift', label: 'SWIFT/BIC', type: 'text' },
      { name: 'account', label: 'IBAN / Cuenta', type: 'text' }
    ]
  },
  contabilidad: {
    title: 'Nuevo registro contable', actionModule: 'facturas-rh',
    fields: [
      { name: 'docType', label: 'Tipo', type: 'select', required: true, options: ['Factura', 'RH'] },
      { name: 'issuer', label: 'Emisor', type: 'text', required: true },
      { name: 'issuerRuc', label: 'RUC emisor', type: 'text' },
      { name: 'number', label: 'N° comprobante', type: 'text' },
      { name: 'date', label: 'Fecha', type: 'date', required: true },
      { name: 'baseAmount', label: 'Monto base', type: 'number', step: '0.01' },
      { name: 'igv', label: 'IGV', type: 'number', step: '0.01' },
      { name: 'givesIgvCredit', label: '¿Genera crédito IGV?', type: 'checkbox' },
      { name: 'category', label: 'Categoría de gasto', type: 'text' },
      { name: 'currency', label: 'Moneda', type: 'select', options: ['PEN', 'USD'] }
    ]
  },
  prestamos: {
    title: 'Nuevo préstamo', actionModule: 'prestamos',
    fields: [
      { name: 'lender', label: 'Prestamista', type: 'text', required: true },
      { name: 'loanDate', label: 'Fecha del préstamo', type: 'date', required: true },
      { name: 'principal', label: 'Monto', type: 'number', required: true, step: '0.01' },
      { name: 'currency', label: 'Moneda', type: 'select', options: ['USD', 'PEN'] },
      { name: 'interestRate', label: 'Tasa de interés (%)', type: 'number', step: '0.0001' },
      { name: 'rateType', label: 'Tipo de tasa', type: 'select', options: ['mensual', 'anual'] },
      { name: 'termMonths', label: 'Plazo (meses)', type: 'number' },
      { name: 'dueDate', label: 'Vencimiento', type: 'date' },
      { name: 'isCreditLine', label: '¿Es línea de crédito?', type: 'checkbox' },
      { name: 'notes', label: 'Notas', type: 'textarea' }
    ]
  },
  stock: null,
  series: null,
  cashflow: null,
  documentos: null,
  pendientes: null
};
