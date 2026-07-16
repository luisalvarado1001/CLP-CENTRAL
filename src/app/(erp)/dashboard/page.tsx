import Link from 'next/link';
import { ArrowUpRight, CircleAlert, CircleDollarSign, PackageOpen, Ship, WalletCards } from 'lucide-react';
import { integrations } from '@/lib/env';
import { modules } from '@/lib/modules';

const metrics = [
  { label: 'Saldo BCP USD', value: '$ 0.00', detail: 'Pendiente de registrar', icon: WalletCards },
  { label: 'Saldo BCP PEN', value: 'S/ 0.00', detail: 'Pendiente de registrar', icon: CircleDollarSign },
  { label: 'Importaciones en tránsito', value: '0', detail: 'Sin registros aún', icon: Ship },
  { label: 'Cobros pendientes Vari', value: 'S/ 0.00', detail: '0 facturas', icon: PackageOpen },
  { label: 'Margen bruto del mes', value: '0.00%', detail: 'Se calculará automáticamente', icon: ArrowUpRight },
  { label: 'Alertas activas', value: '0', detail: 'Stock, cobros y documentos', icon: CircleAlert }
];

export default function DashboardPage() {
  const configured = Object.values(integrations).filter(Boolean).length;

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <h1>Resumen ejecutivo</h1>
          <p>Una sola fuente de información para toda la operación de CLP Automotriz.</p>
        </div>
        <Link href="/modulos/importaciones" className="btn btn-primary">Nueva importación</Link>
      </div>

      {configured < 3 && (
        <section className="card setup" style={{ marginBottom: 20 }}>
          <strong>Configuración inicial: {configured}/3 integraciones listas</strong>
          <p style={{ margin: '7px 0 0', color: 'var(--muted)' }}>
            Agrega en Vercel las variables de Neon, Clerk y Cloudflare R2. El sistema no guardará información real hasta completar las tres conexiones.
          </p>
        </section>
      )}

      <section className="grid grid-3" style={{ marginBottom: 22 }}>
        {metrics.map(({ label, value, detail, icon: Icon }) => (
          <article className="card metric" key={label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14 }}>
              <div><small>{label}</small><strong>{value}</strong><span>{detail}</span></div>
              <div className="module-icon"><Icon size={21} /></div>
            </div>
          </article>
        ))}
      </section>

      <div className="page-head" style={{ marginTop: 8 }}>
        <div><h1 style={{ fontSize: 25 }}>Módulos del sistema</h1><p>Cada módulo trabaja de forma independiente, pero comparte la misma información.</p></div>
      </div>

      <section className="grid grid-3">
        {modules.filter((item) => item.slug !== 'dashboard').map(({ slug, label, description, icon: Icon }) => (
          <Link href={`/modulos/${slug}`} className="card module-card" key={slug}>
            <div className="module-icon"><Icon size={22} /></div>
            <div><h3>{label}</h3><p>{description}</p></div>
          </Link>
        ))}
      </section>
    </main>
  );
}
