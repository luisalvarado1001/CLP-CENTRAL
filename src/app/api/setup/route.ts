import { NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { MIGRATION_SQL } from '@/db/migration-sql';
import { seedBase } from '@/db/seed-base';
import { seedLedger } from '@/db/seed-ledger';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const TABLES = [
  'usuarios', 'proveedores', 'importaciones', 'importacion_costos', 'productos', 'stock',
  'tanques_series', 'ventas', 'compras_locales', 'libro_mayor', 'cashflow', 'documentos',
  'pendientes', 'contabilidad_checklist', 'optimizacion_alquileres', 'prestamos',
  'prestamos_tasas_historico', 'prestamos_pagos', 'facturas_rh', 'retenciones'
];

/** Estado actual: qué tablas existen y cuántas filas tienen. */
export async function GET() {
  if (!db) return NextResponse.json({ ok: false, error: 'DATABASE_URL no configurada' }, { status: 500 });

  const counts: Record<string, number | null> = {};
  let existing = 0;
  for (const t of TABLES) {
    try {
      const r = await db.execute(sql.raw(`SELECT COUNT(*)::int AS c FROM "${t}"`));
      const rows = (r as unknown as { rows?: { c: number }[] }).rows ?? (r as unknown as { c: number }[]);
      counts[t] = Array.isArray(rows) && rows[0] ? Number(rows[0].c) : 0;
      existing++;
    } catch {
      counts[t] = null; // la tabla no existe
    }
  }
  const totalRows = Object.values(counts).reduce<number>((a, v) => a + (v ?? 0), 0);
  return NextResponse.json({
    ok: true,
    tablesExpected: TABLES.length,
    tablesExisting: existing,
    totalRows,
    counts
  });
}

/** Acciones: crear tablas, cargar data base, cargar libro mayor. */
export async function POST(request: Request) {
  if (!db) return NextResponse.json({ ok: false, error: 'DATABASE_URL no configurada' }, { status: 500 });

  let action = '';
  try {
    action = (await request.json())?.action ?? '';
  } catch {
    return NextResponse.json({ ok: false, error: 'Body inválido' }, { status: 400 });
  }

  try {
    if (action === 'tables') {
      const statements = MIGRATION_SQL.split('--> statement-breakpoint')
        .map((s) => s.trim())
        .filter(Boolean);
      let created = 0;
      let skipped = 0;
      for (const stmt of statements) {
        try {
          await db.execute(sql.raw(stmt));
          created++;
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          if (/already exists|ya existe|duplicate/i.test(msg)) skipped++;
          else throw e;
        }
      }
      return NextResponse.json({ ok: true, message: `Tablas listas. ${created} creadas, ${skipped} ya existían.` });
    }

    if (action === 'seed') {
      await seedBase(db);
      return NextResponse.json({ ok: true, message: 'Data inicial cargada (proveedores, importaciones, ventas, retenciones, compras, préstamos, alquileres).' });
    }

    if (action === 'ledger') {
      const n = await seedLedger(db);
      return NextResponse.json({ ok: true, message: `${n} movimientos cargados al Libro Mayor.` });
    }

    return NextResponse.json({ ok: false, error: 'Acción no reconocida' }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
