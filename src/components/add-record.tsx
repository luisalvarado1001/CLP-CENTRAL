'use client';

import { useState, useTransition } from 'react';
import { Plus, X } from 'lucide-react';
import { createRecord } from '@/lib/actions';
import type { Field } from '@/lib/module-forms';

export function AddRecord({ module, title, actionModule, fields }: { module: string; title: string; actionModule: string; fields: Field[] }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function submit(formData: FormData) {
    setError(null);
    start(async () => {
      try {
        await createRecord(actionModule, formData);
        setOpen(false);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error al guardar');
      }
    });
  }

  return (
    <>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        <Plus size={17} style={{ verticalAlign: 'middle', marginRight: 7 }} />Nuevo registro
      </button>

      {open && (
        <div style={overlay} onClick={() => !pending && setOpen(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <strong style={{ fontSize: 18, color: 'var(--navy)' }}>{title}</strong>
              <button onClick={() => setOpen(false)} style={closeBtn} aria-label="Cerrar"><X size={18} /></button>
            </div>

            <form action={submit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                {fields.map((f) => (
                  <label key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13, color: 'var(--muted)' }}>
                    {f.label}{f.required && ' *'}
                    {f.type === 'select' ? (
                      <select name={f.name} required={f.required} defaultValue="" style={input}>
                        <option value="" disabled>Selecciona…</option>
                        {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : f.type === 'checkbox' ? (
                      <input type="checkbox" name={f.name} style={{ width: 20, height: 20, marginTop: 4 }} />
                    ) : f.type === 'textarea' ? (
                      <textarea name={f.name} required={f.required} rows={2} style={input} />
                    ) : (
                      <input type={f.type} name={f.name} required={f.required} step={f.step} style={input} />
                    )}
                  </label>
                ))}
              </div>

              {error && <p style={{ color: '#b42318', fontSize: 13, marginTop: 12 }}>{error}</p>}

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)} disabled={pending}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? 'Guardando…' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const overlay: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(12,25,45,.45)', display: 'grid', placeItems: 'center', padding: 16, zIndex: 50 };
const modal: React.CSSProperties = { background: 'white', borderRadius: 16, padding: 24, width: 'min(680px, 100%)', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,.25)' };
const input: React.CSSProperties = { padding: '9px 11px', border: '1px solid var(--line)', borderRadius: 9, fontSize: 14, color: 'var(--text)', background: 'white' };
const closeBtn: React.CSSProperties = { background: '#f0f4f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--muted)' };
