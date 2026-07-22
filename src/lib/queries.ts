import 'server-only';
import { db } from '@/lib/db';
import * as s from '@/db/schema';
import { desc, asc } from 'drizzle-orm';

export type Tone = 'green' | 'yellow' | 'red' | 'blue';
export type Cell = { text: string; tone?: Tone };
export type ModuleData = { columns: string[]; rows: Cell[][]; empty?: string };

const money = (v: unknown, cur = 'USD') => {
  const n = Number(v ?? 0);
  const sign = n < 0 ? '-' : '';
  const s0 = Math.abs(n).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${sign}${cur === 'PEN' ? 'S/ ' : '$ '}${s0}`;
};
const fdate = (v: unknown) => (v ? String(v) : '—');
const t = (text: string, tone?: Tone): Cell => ({ text, tone });

const toneForStatus: Record<string, Tone> = {
  'En almacén': 'green', Nacionalizada: 'green', Aprobada: 'green', Vendida: 'green', Devuelto: 'green', Pagado: 'green', Completo: 'green',
  'En tránsito': 'yellow', Numerada: 'yellow', Sellada: 'yellow', Vigente: 'yellow', 'Pagado 30%': 'yellow', Emitida: 'yellow', 'Falta algo': 'yellow',
  'Canal rojo': 'red', Vencido: 'red', Pendiente: 'red', 'No enviado': 'red',
  Cotizado: 'blue', 'Pagado 100%': 'blue', 'Canal verde': 'blue', 'Canal naranja': 'yellow'
};

// ---------- Interés devengado de un préstamo ----------
export function accruedInterest(loan: { principal: unknown; interestRate: unknown; rateType: unknown; loanDate: unknown }, paidInterest = 0) {
  const P = Number(loan.principal ?? 0);
  const rate = Number(loan.interestRate ?? 0) / 100;
  if (!rate) return 0;
  const start = new Date(String(loan.loanDate));
  const days = Math.max(0, (Date.now() - start.getTime()) / 86400000);
  const factor = loan.rateType === 'anual' ? days / 365 : days / 30;
  return Math.max(0, P * rate * factor - paidInterest);
}

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!db) return fallback;
  try { return await fn(); } catch { return fallback; }
}

export async function getModuleData(slug: string): Promise<ModuleData> {
  switch (slug) {
    case 'importaciones': {
      const [imps, costs, sups] = await Promise.all([
        safe(() => db!.select().from(s.imports).orderBy(asc(s.imports.number)), []),
        safe(() => db!.select().from(s.importCosts), []),
        safe(() => db!.select().from(s.suppliers), [])
      ]);
      const rows = imps.map((i) => {
        const cif = Number(i.fob) + Number(i.freight) + Number(i.insurance);
        const real = cif + costs.filter((c) => c.importId === i.id && c.block === 'B').reduce((a, c) => a + Number(c.amount), 0);
        const sup = sups.find((x) => x.id === i.supplierId)?.name ?? '—';
        return [t(String(i.number)), t(sup), t(i.products), t(i.status, toneForStatus[i.status]), t(fdate(i.eta)), t(money(cif)), t(money(real))];
      });
      return { columns: ['N°', 'Proveedor', 'Producto', 'Estado', 'ETA', 'CIF', 'Costo real'], rows };
    }
    case 'libro-mayor': {
      const rows0 = await safe(() => db!.select().from(s.ledger).orderBy(asc(s.ledger.date), asc(s.ledger.createdAt)), []);
      let bal = 0;
      const rows = rows0.map((r) => {
        bal += Number(r.amount);
        const amtTone: Tone = Number(r.amount) < 0 ? 'red' : 'green';
        return [t(fdate(r.date)), t(r.category), t(r.detail), t(r.currency), t(money(r.amount, r.currency), amtTone), t(money(bal, r.currency))];
      });
      return { columns: ['Fecha', 'Categoría', 'Detalle', 'Moneda', 'Monto', 'Saldo'], rows };
    }
    case 'ventas': {
      const rows0 = await safe(() => db!.select().from(s.sales).orderBy(desc(s.sales.date)), []);
      const rows = rows0.map((r) => [
        t(r.ocNumber), t(r.invoiceNumber ?? '—'), t(r.guideNumber ?? '—'),
        t(money(r.total, r.currency)), t(r.collectionStatus, toneForStatus[r.collectionStatus] ?? 'yellow'), t(money(r.retention, r.currency))
      ]);
      return { columns: ['OC', 'Factura', 'Guía', 'Total', 'Cobro', 'Retención'], rows };
    }
    case 'compras-locales': {
      const rows0 = await safe(() => db!.select().from(s.localPurchases).orderBy(desc(s.localPurchases.date)), []);
      const rows = rows0.map((r) => [
        t(fdate(r.date)), t(r.supplierName), t(r.ruc ?? '—'), t(String(r.quantity)), t(money(r.unitCost, r.currency)), t(r.invoice ?? '—')
      ]);
      return { columns: ['Fecha', 'Proveedor', 'RUC', 'Cantidad', 'Costo unit.', 'Factura'], rows };
    }
    case 'proveedores': {
      const rows0 = await safe(() => db!.select().from(s.suppliers).orderBy(asc(s.suppliers.name)), []);
      const rows = rows0.map((r) => [t(r.name), t(r.country ?? '—'), t(r.contact ?? '—'), t(r.products ?? '—'), t(r.bank ?? '—'), t(r.swift ?? '—')]);
      return { columns: ['Proveedor', 'País', 'Contacto', 'Productos', 'Banco', 'SWIFT'], rows };
    }
    case 'stock': {
      const [st, prods] = await Promise.all([
        safe(() => db!.select().from(s.stock), []),
        safe(() => db!.select().from(s.products), [])
      ]);
      const rows = st.map((r) => {
        const p = prods.find((x) => x.id === r.productId);
        const low = Number(r.quantity) <= Number(p?.minimum ?? 0);
        return [t(p?.sku ?? '—'), t(p?.name ?? '—'), t(p?.presentation ?? '—'), t(String(r.quantity), low ? 'red' : 'green'), t(String(p?.minimum ?? 0)), t(money(r.unitCost, r.currency))];
      });
      return { columns: ['SKU', 'Producto', 'Presentación', 'Cantidad', 'Mínimo', 'Costo'], rows };
    }
    case 'series': {
      const rows0 = await safe(() => db!.select().from(s.tankSeries).orderBy(asc(s.tankSeries.batch)).limit(500), []);
      const rows = rows0.map((r) => [t(r.serial), t(r.importId ? 'Vinculada' : '—'), t(String(r.batch ?? '—')), t(r.status, toneForStatus[r.status] ?? 'blue'), t(r.saleId ? 'Sí' : '—')]);
      return { columns: ['Serie', 'Importación', 'Lote', 'Estado', 'Venta'], rows };
    }
    case 'cashflow': {
      const rows0 = await safe(() => db!.select().from(s.cashflow).orderBy(asc(s.cashflow.estimatedDate)), []);
      const rows = rows0.map((r) => [t(fdate(r.estimatedDate)), t(r.type, r.type === 'ingreso' ? 'green' : 'red'), t(r.concept), t(r.currency), t(money(r.amount, r.currency)), t(r.completed ? 'Completado' : 'Pendiente', r.completed ? 'green' : 'yellow')]);
      return { columns: ['Fecha est.', 'Tipo', 'Concepto', 'Moneda', 'Monto', 'Estado'], rows };
    }
    case 'documentos': {
      const rows0 = await safe(() => db!.select().from(s.documents).orderBy(desc(s.documents.createdAt)), []);
      const rows = rows0.map((r) => [t(r.originalName), t(r.section), t(r.originModule ?? '—'), t(r.status, toneForStatus[r.status] ?? 'yellow'), t(r.sentToYuli ? 'Sí' : 'No', r.sentToYuli ? 'green' : 'red'), t(fdate(r.createdAt))]);
      return { columns: ['Documento', 'Subsección', 'Vínculo', 'Estado', 'Yuli', 'Fecha'], rows };
    }
    case 'pendientes': {
      const rows0 = await safe(() => db!.select().from(s.tasks).orderBy(desc(s.tasks.createdAt)), []);
      const rows = rows0.map((r) => [t(r.description), t(r.priority), t(r.originModule ?? '—'), t(fdate(r.dueDate)), t(r.status, toneForStatus[r.status] ?? 'red')]);
      return { columns: ['Pendiente', 'Prioridad', 'Módulo', 'Vencimiento', 'Estado'], rows };
    }
    case 'contabilidad': {
      // Vista combinada: préstamos con interés + checklist + facturas/RH resumidos
      const [loans, pays, checklist, invoices, rentals] = await Promise.all([
        safe(() => db!.select().from(s.loans), []),
        safe(() => db!.select().from(s.loanPayments), []),
        safe(() => db!.select().from(s.accountingChecklist), []),
        safe(() => db!.select().from(s.invoicesRh), []),
        safe(() => db!.select().from(s.rentalOptimization), [])
      ]);
      const rows: Cell[][] = [];
      for (const l of loans) {
        const paid = pays.filter((p) => p.loanId === l.id && p.type === 'interes').reduce((a, p) => a + Number(p.amount), 0);
        const acc = accruedInterest(l, paid);
        rows.push([t('Préstamo'), t(`${l.lender}`), t(l.status, toneForStatus[l.status]), t(`${Number(l.interestRate)}% ${l.rateType}`), t('Interés hoy'), t(money(acc, l.currency), acc > 0 ? 'red' : 'green')]);
      }
      for (const r of rentals) rows.push([t('Alquiler'), t(r.concept), t('—'), t(`declarado ${money(r.declaredAmount, r.currency)}`), t('pago real'), t(money(r.realAmount, r.currency), 'green')]);
      for (const c of checklist) rows.push([t('Checklist Yuli'), t(c.document), t(c.state, toneForStatus[c.state] ?? 'yellow'), t(c.originModule ?? '—'), t('Enviado'), t(c.sentToYuli ? 'Sí' : 'No', c.sentToYuli ? 'green' : 'red')]);
      for (const f of invoices) rows.push([t(f.docType), t(f.issuer), t(f.givesIgvCredit ? 'Crédito IGV' : 'Sin crédito', f.givesIgvCredit ? 'green' : 'blue'), t(fdate(f.date)), t('Monto'), t(money(f.baseAmount, f.currency))]);
      return { columns: ['Tipo', 'Concepto', 'Estado', 'Detalle', 'Campo', 'Valor'], rows, empty: 'Sin registros contables aún.' };
    }
    default:
      return { columns: [], rows: [] };
  }
}

// ---------------- DASHBOARD ----------------
export async function getDashboardData() {
  const [ledger, sales, imps, tasks] = await Promise.all([
    safe(() => db!.select().from(s.ledger), []),
    safe(() => db!.select().from(s.sales), []),
    safe(() => db!.select().from(s.imports), []),
    safe(() => db!.select().from(s.tasks), [])
  ]);
  const balUSD = ledger.filter((l) => l.currency === 'USD').reduce((a, l) => a + Number(l.amount), 0);
  const balPEN = ledger.filter((l) => l.currency === 'PEN').reduce((a, l) => a + Number(l.amount), 0);
  const pendientes = sales.filter((x) => x.collectionStatus !== 'Pagado');
  const pendMonto = pendientes.reduce((a, x) => a + Number(x.total), 0);
  const enTransito = imps.filter((i) => ['En tránsito', 'Numerada', 'Pagado 100%', 'Pagado 30%'].includes(i.status));
  const alertas = tasks.filter((x) => x.status !== 'Completado').length;
  return {
    balUSD: money(balUSD), balPEN: money(balPEN, 'PEN'),
    enTransito: enTransito.length, ventasPend: money(pendMonto), ventasPendCount: pendientes.length,
    alertas, hasData: ledger.length > 0 || imps.length > 0
  };
}
