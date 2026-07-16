import {
  AlertTriangle, BarChart3, BookOpen, Boxes, Building2, Calculator,
  FileText, Gauge, PackageCheck, ReceiptText, Ship, ShoppingCart, Tags
} from 'lucide-react';

export const company = {
  brand: 'CLP Automotriz',
  legalName: 'SALONESBELESTET E.I.R.L.',
  futureLegalName: 'IMPORTACIONES CLP E.I.R.L.',
  ruc: '20610995200',
  email: 'comercial@clpautomotriz.com',
  address: 'Av. La Marina 1463 Of. 301, San Miguel',
  warehouse: 'Ventanilla',
  bank: 'BCP',
  swift: 'BCPLPEPLXXX',
  mainClient: 'Vari Almacenes S.A.C.',
  mainClientRuc: '20566358400'
} as const;

export const modules = [
  { slug: 'dashboard', label: 'Resumen', icon: Gauge, description: 'KPIs, flujo de caja, márgenes y alertas.' },
  { slug: 'importaciones', label: 'Importaciones', icon: Ship, description: 'Costos CIF, nacionalización, impuestos recuperables y trazabilidad.' },
  { slug: 'series', label: 'Series de tanques', icon: Tags, description: 'Carga masiva, lotes de 100 y control individual de series.' },
  { slug: 'stock', label: 'Stock', icon: Boxes, description: 'Inventario, valorización, entradas, salidas y mínimos.' },
  { slug: 'ventas', label: 'Ventas Vari', icon: ShoppingCart, description: 'OC, facturas, guías, cobros, retenciones y márgenes.' },
  { slug: 'compras-locales', label: 'Compras locales', icon: PackageCheck, description: 'Compras nacionales, costos e ingreso automático a stock.' },
  { slug: 'libro-mayor', label: 'Libro Mayor', icon: BookOpen, description: 'Movimientos bancarios USD/PEN y reconciliación.' },
  { slug: 'cashflow', label: 'Cashflow', icon: BarChart3, description: 'Ingresos, egresos futuros y alertas de déficit.' },
  { slug: 'documentos', label: 'Documentos', icon: FileText, description: 'Fotos, PDF, guías, DAM, bancarizaciones y retenciones.' },
  { slug: 'contabilidad', label: 'Contabilidad', icon: Calculator, description: 'Checklist Yuli, tributario, préstamos y Facturas/RH.' },
  { slug: 'proveedores', label: 'Proveedores', icon: Building2, description: 'Contactos, productos y datos bancarios internacionales.' },
  { slug: 'pendientes', label: 'Pendientes', icon: AlertTriangle, description: 'Alertas automáticas y tareas conectadas a cada módulo.' },
  { slug: 'configuracion', label: 'Configuración', icon: ReceiptText, description: 'Empresa, monedas, tipos de cambio y futuros usuarios.' }
] as const;

export type ModuleSlug = (typeof modules)[number]['slug'];

export const statusTone: Record<string, 'green' | 'yellow' | 'red' | 'blue'> = {
  'En almacén': 'green', Nacionalizada: 'green', Aprobada: 'green', Vendida: 'green',
  'En tránsito': 'yellow', Numerada: 'yellow', Sellada: 'yellow', Vigente: 'yellow',
  'Canal rojo': 'red', Vencido: 'red', Pendiente: 'red',
  Cotizado: 'blue', Emitida: 'blue', 'En stock': 'blue'
};
