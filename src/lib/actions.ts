'use server';

import { requireDb } from '@/lib/db';
import * as s from '@/db/schema';
import { revalidatePath } from 'next/cache';

const num = (fd: FormData, k: string) => Number(fd.get(k) ?? 0).toString();
const str = (fd: FormData, k: string) => (fd.get(k) ? String(fd.get(k)) : null);
const strReq = (fd: FormData, k: string) => String(fd.get(k) ?? '');
const bool = (fd: FormData, k: string) => fd.get(k) === 'on' || fd.get(k) === 'true';

/**
 * Crea un registro y propaga automáticamente a los módulos conectados.
 * REGLA DE ORO: el usuario ingresa el dato UNA sola vez.
 */
export async function createRecord(module: string, fd: FormData) {
  const db = requireDb();

  switch (module) {
    case 'proveedores': {
      await db.insert(s.suppliers).values({
        name: strReq(fd, 'name'), country: str(fd, 'country'), contact: str(fd, 'contact'),
        email: str(fd, 'email'), products: str(fd, 'products'), bank: str(fd, 'bank'),
        swift: str(fd, 'swift'), account: str(fd, 'account')
      });
      break;
    }

    case 'importaciones': {
      await db.insert(s.imports).values({
        number: Number(fd.get('number')), country: str(fd, 'country'),
        products: strReq(fd, 'products'), route: strReq(fd, 'route') || 'Marítimo',
        incoterm: strReq(fd, 'incoterm') || 'FOB', status: (strReq(fd, 'status') || 'Cotizado') as never,
        eta: str(fd, 'eta'), quantity: num(fd, 'quantity'),
        fob: num(fd, 'fob'), freight: num(fd, 'freight'), insurance: num(fd, 'insurance'),
        currency: 'USD'
      });
      break;
    }

    case 'libro-mayor': {
      await db.insert(s.ledger).values({
        category: strReq(fd, 'category'), detail: strReq(fd, 'detail'),
        date: strReq(fd, 'date'), amount: num(fd, 'amount'),
        currency: (strReq(fd, 'currency') || 'USD') as never, comment: str(fd, 'comment'),
        originModule: 'libro-mayor'
      });
      break;
    }

    case 'ventas': {
      const sub = Number(fd.get('subtotal') ?? 0);
      const igv = sub * 0.18;
      const total = sub + igv;
      const cur = (strReq(fd, 'currency') || 'USD') as never;
      // Retención 3% si el total supera ~S/700 (equivalente): aplica sobre facturas grandes
      const ret = sub > 593 ? total * 0.03 : 0;
      const inserted = await db.insert(s.sales).values({
        ocNumber: strReq(fd, 'ocNumber'), date: strReq(fd, 'date'),
        invoiceNumber: str(fd, 'invoiceNumber'), guideNumber: str(fd, 'guideNumber'),
        subtotal: sub.toFixed(2), igv: igv.toFixed(2), total: total.toFixed(2),
        retention: ret.toFixed(2), collectionStatus: strReq(fd, 'collectionStatus') || 'Pendiente',
        currency: cur
      }).returning();
      const sale = inserted[0];
      // SINCRONICIDAD → Cashflow: cobro esperado
      if (sale && sale.collectionStatus !== 'Pagado') {
        await db.insert(s.cashflow).values({
          type: 'ingreso', concept: `Cobro Vari ${sale.invoiceNumber ?? sale.ocNumber}`,
          estimatedDate: sale.date, amount: (total - ret).toFixed(2), currency: cur,
          originModule: 'ventas', originId: sale.id
        });
      }
      break;
    }

    case 'compras-locales': {
      const inserted = await db.insert(s.localPurchases).values({
        supplierName: strReq(fd, 'supplierName'), ruc: str(fd, 'ruc'),
        quantity: num(fd, 'quantity'), unitCost: num(fd, 'unitCost'),
        invoice: str(fd, 'invoice'), date: strReq(fd, 'date'),
        currency: (strReq(fd, 'currency') || 'PEN') as never
      }).returning();
      const lp = inserted[0];
      // SINCRONICIDAD → Libro Mayor: gasto
      if (lp) {
        const totalCost = Number(lp.quantity) * Number(lp.unitCost);
        await db.insert(s.ledger).values({
          category: 'INVENTARIO', detail: `Compra local ${lp.supplierName}`,
          date: lp.date, amount: (-totalCost).toFixed(2), currency: lp.currency,
          comment: `Factura ${lp.invoice ?? ''}`, originModule: 'compras-locales', originId: lp.id
        });
      }
      break;
    }

    case 'prestamos': {
      const inserted = await db.insert(s.loans).values({
        lender: strReq(fd, 'lender'), isCreditLine: bool(fd, 'isCreditLine'),
        loanDate: strReq(fd, 'loanDate'), principal: num(fd, 'principal'),
        currency: (strReq(fd, 'currency') || 'USD') as never,
        interestRate: num(fd, 'interestRate'), rateType: (strReq(fd, 'rateType') || 'mensual') as never,
        termMonths: fd.get('termMonths') ? Number(fd.get('termMonths')) : null,
        dueDate: str(fd, 'dueDate'), status: 'Vigente', notes: str(fd, 'notes')
      }).returning();
      const loan = inserted[0];
      // Guardar tasa inicial en histórico (para trazar renegociaciones)
      if (loan) {
        await db.insert(s.loanRateHistory).values({
          loanId: loan.id, rate: loan.interestRate, rateType: loan.rateType, changeDate: loan.loanDate
        });
      }
      break;
    }

    case 'facturas-rh': {
      const inserted = await db.insert(s.invoicesRh).values({
        docType: strReq(fd, 'docType') || 'Factura', issuer: strReq(fd, 'issuer'),
        issuerRuc: str(fd, 'issuerRuc'), number: str(fd, 'number'), date: strReq(fd, 'date'),
        baseAmount: num(fd, 'baseAmount'), igv: num(fd, 'igv'),
        givesIgvCredit: bool(fd, 'givesIgvCredit'), category: str(fd, 'category'),
        currency: (strReq(fd, 'currency') || 'PEN') as never
      }).returning();
      const inv = inserted[0];
      if (inv) {
        // SINCRONICIDAD → Checklist Yuli
        await db.insert(s.accountingChecklist).values({
          document: `${inv.docType} ${inv.issuer} ${inv.number ?? ''}`.trim(),
          originModule: 'facturas-rh', originId: inv.id,
          state: 'Completo', sentToYuli: false
        });
        // SINCRONICIDAD → Libro Mayor (gasto)
        const total = Number(inv.baseAmount) + Number(inv.igv);
        await db.insert(s.ledger).values({
          category: 'GASTO FINANCIERO', detail: `${inv.docType} ${inv.issuer}`,
          date: inv.date, amount: (-total).toFixed(2), currency: inv.currency,
          comment: inv.givesIgvCredit ? 'Genera crédito IGV' : '', originModule: 'facturas-rh', originId: inv.id
        });
      }
      break;
    }

    case 'alquileres': {
      const declared = Number(fd.get('declaredAmount') ?? 0);
      const pct = Number(fd.get('realPaymentPct') ?? 5);
      await db.insert(s.rentalOptimization).values({
        concept: strReq(fd, 'concept'), declaredAmount: declared.toFixed(2),
        realPaymentPct: pct.toString(), realAmount: (declared * pct / 100).toFixed(2),
        tiedToSalesPct: bool(fd, 'tiedToSalesPct'), month: strReq(fd, 'month'),
        currency: (strReq(fd, 'currency') || 'USD') as never
      });
      break;
    }

    default:
      throw new Error(`Módulo sin acción de creación: ${module}`);
  }

  revalidatePath(`/modulos/${module === 'facturas-rh' || module === 'alquileres' ? 'contabilidad' : module}`);
  revalidatePath('/dashboard');
}
