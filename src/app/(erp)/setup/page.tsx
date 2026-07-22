'use client';

import { useState, useEffect, useCallback } from 'react';
import { Database, Download, BookOpen, RefreshCw, CircleCheck, CircleAlert } from 'lucide-react';

type Status = { ok: boolean; tablesExpected: number; tablesExisting: number; totalRows: number } | null;
type Log = { text: string; ok: boolean };

export default function SetupPage() {
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);

  const loadStatus = useCallback(async () => {
    try {
      const r = await fetch('/api/setup');
      setStatus(await r.json());
    } catch {
      setStatus(null);
    }
  }, []);

  useEffect(() => { void loadStatus(); }, [loadStatus]);

  async function run(action: string, label: string) {
    setBusy(action);
    try {
      const r = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      const d = await r.json();
      setLogs((l) => [{ text: `${label}: ${d.ok ? d.message : d.error}`, ok: !!d.ok }, ...l]);
      await loadStatus();
    } catch (e) {
      setLogs((l) => [{ text: `${label}: ${e instanceof Error ? e.message : 'Error'}`, ok: false }, ...l]);
    } finally {
      setBusy(null);
    }
  }

  const steps = [
    { action: 'tables', icon: Database, title: '1 · Crear las tablas', desc: 'Crea las 20 tablas del sistema en Neon. Seguro de repetir: no borra nada.' },
    { action: 'seed', icon: Download, title: '2 · Cargar data inicial', desc: 'Proveedores, importaciones 110-116 con costos, ventas E001, retenciones, compras locales, préstamos y alquileres.' },
    { action: 'ledger', icon: BookOpen, title: '3 · Cargar Libro Mayor', desc: '128 movimientos reales de la cuenta BCP (12/03 al 15/07/2026), ya reconciliados.' }
  ];

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <h1>Configuración inicial</h1>
          <p>Crea las tablas y carga la información histórica de CLP. Se hace una sola vez.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => void loadStatus()}>
          <RefreshCw size={16} style={{ verticalAlign: 'middle', marginRight: 7 }} />Actualizar
        </button>
      </div>

      <section className="card" style={{ marginBottom: 20 }}>
        <strong>Estado de la base de datos</strong>
        {status?.ok ? (
          <div className="grid grid-3" style={{ marginTop: 14 }}>
            <div className="metric"><span style={{ color: 'var(--muted)', fontSize: 13 }}>Tablas creadas</span><strong>{status.tablesExisting} / {status.tablesExpected}</strong></div>
            <div className="metric"><span style={{ color: 'var(--muted)', fontSize: 13 }}>Registros cargados</span><strong>{status.totalRows.toLocaleString('es-PE')}</strong></div>
            <div className="metric"><span style={{ color: 'var(--muted)', fontSize: 13 }}>Conexión Neon</span><strong style={{ color: '#2E7D32' }}>OK</strong></div>
          </div>
        ) : (
          <p style={{ color: 'var(--muted)', marginTop: 10 }}>Sin conexión a la base de datos. Revisa que DATABASE_URL esté configurada en Vercel.</p>
        )}
      </section>

      <section className="grid" style={{ gap: 14, marginBottom: 20 }}>
        {steps.map(({ action, icon: Icon, title, desc }) => (
          <article className="card" key={action} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="module-icon"><Icon size={21} /></div>
            <div style={{ flex: '1 1 260px', minWidth: 0 }}>
              <strong>{title}</strong>
              <p style={{ margin: '5px 0 0', color: 'var(--muted)', fontSize: 13.5 }}>{desc}</p>
            </div>
            <button className="btn btn-primary" disabled={!!busy} onClick={() => void run(action, title)}>
              {busy === action ? 'Procesando…' : 'Ejecutar'}
            </button>
          </article>
        ))}
      </section>

      {logs.length > 0 && (
        <section className="card">
          <strong>Resultado</strong>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
            {logs.map((l, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 13.5, color: l.ok ? '#1b5e20' : '#b42318' }}>
                {l.ok ? <CircleCheck size={17} style={{ flex: '0 0 17px', marginTop: 1 }} /> : <CircleAlert size={17} style={{ flex: '0 0 17px', marginTop: 1 }} />}
                <span>{l.text}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
