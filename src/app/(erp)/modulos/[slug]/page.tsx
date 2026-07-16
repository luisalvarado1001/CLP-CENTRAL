import { notFound } from 'next/navigation';
import { Camera, Upload } from 'lucide-react';
import { modules } from '@/lib/modules';
import { getModuleData } from '@/lib/queries';
import { moduleForms } from '@/lib/module-forms';
import { AddRecord } from '@/components/add-record';

export function generateStaticParams() {
  return modules.filter((item) => item.slug !== 'dashboard').map((item) => ({ slug: item.slug }));
}

export const dynamic = 'force-dynamic';

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const module = modules.find((item) => item.slug === slug);
  if (!module || slug === 'dashboard') notFound();

  const data = await getModuleData(slug);
  const form = moduleForms[slug];
  const isDocuments = slug === 'documentos';
  const isSeries = slug === 'series';

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <h1>{module.label}</h1>
          <p>{module.description}</p>
        </div>
        {form ? (
          <AddRecord module={slug} title={form.title} actionModule={form.actionModule} fields={form.fields} />
        ) : isDocuments ? (
          <button className="btn btn-primary"><Camera size={17} style={{ verticalAlign: 'middle', marginRight: 7 }} />Subir foto</button>
        ) : isSeries ? (
          <button className="btn btn-primary"><Upload size={17} style={{ verticalAlign: 'middle', marginRight: 7 }} />Importar Excel</button>
        ) : null}
      </div>

      <section className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div>
            <strong>Registros</strong>
            <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>{data.rows.length} {data.rows.length === 1 ? 'registro' : 'registros'}</div>
          </div>
          <span className="badge blue">{data.rows.length > 0 ? 'En vivo' : 'Sin data'}</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead><tr>{data.columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
            <tbody>
              {data.rows.length === 0 ? (
                <tr><td colSpan={Math.max(data.columns.length, 1)} style={{ textAlign: 'center', padding: '42px 14px', color: 'var(--muted)' }}>
                  {data.empty ?? 'No hay registros todavía. Usa "Nuevo registro" para agregar, o corre los seeds para cargar la data inicial.'}
                </td></tr>
              ) : (
                data.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci}>
                        {cell.tone ? <span className={`badge ${cell.tone}`}>{cell.text}</span> : cell.text}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
