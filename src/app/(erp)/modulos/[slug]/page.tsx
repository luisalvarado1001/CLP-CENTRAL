import { notFound } from 'next/navigation';
import { Camera, CheckCircle2, CircleDollarSign, FileSpreadsheet, Plus, Upload } from 'lucide-react';
import { modules, type ModuleSlug } from '@/lib/modules';

const details: Record<ModuleSlug, { highlights: string[]; columns: string[] }> = {
  dashboard: { highlights: [], columns: [] },
  importaciones: {
    highlights: ['Numeración automática desde 110', 'CIF separado del costo real', 'IGV y percepción como recuperables', 'Línea de tiempo de estado'],
    columns: ['N°', 'Proveedor', 'Producto', 'Estado', 'ETA', 'CIF', 'Costo real']
  },
  series: {
    highlights: ['Carga Excel', 'Validación de serie', 'Lotes de 100', 'Hoja de despacho'],
    columns: ['Serie', 'Importación', 'Lote', 'Estado', 'Venta']
  },
  stock: {
    highlights: ['Entradas automáticas', 'Salidas por despacho', 'Alerta de mínimo', 'Valorización'],
    columns: ['SKU', 'Producto', 'Presentación', 'Cantidad', 'Mínimo', 'Costo']
  },
  ventas: {
    highlights: ['OC de Vari', 'Facturas y guías', 'Retención 3%', 'Margen automático'],
    columns: ['OC', 'Factura', 'Guía', 'Total', 'Cobro', 'Retención']
  },
  'compras-locales': {
    highlights: ['Proveedor y RUC', 'Ingreso a stock', 'Crédito IGV', 'Margen local'],
    columns: ['Fecha', 'Proveedor', 'Producto', 'Cantidad', 'Costo', 'Factura']
  },
  'libro-mayor': {
    highlights: ['USD y PEN', 'Saldo corriente', 'Origen automático', 'Reconciliación bancaria'],
    columns: ['Fecha', 'Categoría', 'Detalle', 'Moneda', 'Monto', 'Saldo']
  },
  cashflow: {
    highlights: ['Cobros esperados', 'Pagos de importación', 'Cuotas e intereses', 'Semáforo mensual'],
    columns: ['Fecha estimada', 'Tipo', 'Concepto', 'Moneda', 'Monto', 'Estado']
  },
  documentos: {
    highlights: ['Subida desde celular', 'Auto-guardado al subir', 'Original y sellado', 'Enlaces privados R2'],
    columns: ['Documento', 'Subsección', 'Vínculo', 'Estado', 'Yuli', 'Fecha']
  },
  contabilidad: {
    highlights: ['Checklist Yuli', 'Optimización tributaria', 'Préstamos e intereses', 'Facturas y RH'],
    columns: ['Documento', 'Origen', 'Estado', 'Crédito IGV', 'Enviado', 'Fecha']
  },
  proveedores: {
    highlights: ['Contactos', 'Productos', 'Banco', 'SWIFT/BIC e IBAN'],
    columns: ['Proveedor', 'País', 'Contacto', 'Productos', 'Banco', 'SWIFT']
  },
  pendientes: {
    highlights: ['Generación automática', 'Prioridad', 'Semáforo', 'Cierre desde módulo origen'],
    columns: ['Pendiente', 'Prioridad', 'Módulo', 'Vencimiento', 'Estado']
  },
  configuracion: {
    highlights: ['Empresa y RUC', 'Tipo de cambio', 'Cuenta BCP', 'Usuarios futuros'],
    columns: ['Configuración', 'Valor actual', 'Estado']
  }
};

export function generateStaticParams() {
  return modules.filter((item) => item.slug !== 'dashboard').map((item) => ({ slug: item.slug }));
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const module = modules.find((item) => item.slug === slug);
  if (!module || slug === 'dashboard') notFound();

  const spec = details[module.slug];
  const Icon = module.icon;
  const isDocuments = module.slug === 'documentos';
  const isSeries = module.slug === 'series';

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <h1>{module.label}</h1>
          <p>{module.description}</p>
        </div>
        <button className="btn btn-primary">
          {isDocuments ? <><Camera size={17} style={{ verticalAlign: 'middle', marginRight: 7 }} />Subir foto</> :
           isSeries ? <><Upload size={17} style={{ verticalAlign: 'middle', marginRight: 7 }} />Importar Excel</> :
           <><Plus size={17} style={{ verticalAlign: 'middle', marginRight: 7 }} />Nuevo registro</>}
        </button>
      </div>

      <section className="grid grid-4" style={{ marginBottom: 20 }}>
        {spec.highlights.map((item, index) => (
          <article className="card" key={item}>
            <div className="module-icon" style={{ marginBottom: 12 }}>
              {index === 0 ? <Icon size={21} /> : index === 1 ? <CheckCircle2 size={21} /> : index === 2 ? <CircleDollarSign size={21} /> : <FileSpreadsheet size={21} />}
            </div>
            <strong style={{ color: 'var(--navy)' }}>{item}</strong>
          </article>
        ))}
      </section>

      <section className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div><strong>Registros</strong><div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>La tabla se activará al conectar y migrar Neon.</div></div>
          <span className="badge blue">Fase inicial</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr>{spec.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>
              <tr><td colSpan={Math.max(spec.columns.length, 1)} style={{ textAlign: 'center', padding: '42px 14px', color: 'var(--muted)' }}>No hay registros todavía. Usa “Nuevo registro” después de completar las variables y migraciones.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
