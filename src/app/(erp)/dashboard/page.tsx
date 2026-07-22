import Link from 'next/link';
import { ArrowUpRight, CircleAlert, CircleDollarSign, PackageOpen, Ship, WalletCards } from 'lucide-react';
import { getDashboardData } from '@/lib/queries';
import { moduleForms } from '@/lib/module-forms';
import { AddRecord } from '@/components/add-record';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const d = await getDashboardData();
  const form = moduleForms['importaciones']!;

  const metrics = [
    { label: 'Saldo BCP USD', value: d.balUSD, detail: 'Según Libro Mayor', icon: WalletCards },
    { label: 'Saldo BCP PEN', value: d.balPEN, detail: 'Según Libro Mayor', icon: CircleDollarSign },
    { label: 'Importaciones en tránsito', value: String(d.enTransito), detail: 'Pagadas o en camino', icon: Ship },
    { label: 'Cobros pendientes Vari', value: d.ventasPend, detail: `${d.ventasPendCount} facturas`, icon: PackageOpen },
    { label: 'Alertas activas', value: String(d.alertas), detail: 'Stock, cobros y documentos', icon: CircleAlert }
  ];

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <h1>Resumen ejecutivo</h1>
          <p>Una sola fuente de información para toda la operación de CLP Automotriz.</p>
        </div>
        <AddRecord module="importaciones" title={form.title} actionModule={form.actionModule} fields={form.fields} />
      </div>

      {!d.hasData && (
        <section className="card setup" style={{ marginBottom: 20 }}>
          <strong>Aún no hay data cargada</strong>
          <p style={{ margin: '7px 0 14px', color: 'var(--muted)' }}>
            Entra a Configuración inicial para crear las tablas y cargar la información histórica de CLP. Se hace una sola vez.
          </p>
          <Link href="/setup" className="btn btn-primary">Ir a configuración inicial</Link>
        </section>
      )}

      <section className="grid grid-3" style={{ marginBottom: 22 }}>
        {metrics.map(({ label, value, detail, icon: Icon }) => (
          <article className="card metric" key={label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14 }}>
              <div>
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>{label}</span>
                <strong>{value}</strong>
                <span style={{ color: 'var(--muted)', fontSize: 12 }}>{detail}</span>
              </div>
              <div className="module-icon"><Icon size={21} /></div>
            </div>
          </article>
        ))}
      </section>

      <section className="card">
        <strong>Accesos rápidos</strong>
        <div className="grid grid-3" style={{ marginTop: 14 }}>
          <Link href="/modulos/importaciones" className="btn btn-secondary">Importaciones</Link>
          <Link href="/modulos/libro-mayor" className="btn btn-secondary">Libro Mayor</Link>
          <Link href="/modulos/contabilidad" className="btn btn-secondary">Contabilidad</Link>
        </div>
      </section>
    </main>
  );
}
