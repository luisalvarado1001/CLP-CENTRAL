/**
 * SEED — Carga inicial con la data real de CLP Automotriz (al 15/07/2026).
 * Ejecutar con: npx tsx src/db/seed.ts   (requiere DATABASE_URL en el entorno)
 *
 * Es idempotente por clave natural donde se puede (número de importación, email,
 * número de OC/constancia). Reejecutar no duplica registros clave.
 */
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import * as s from './schema';

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL no configurada');
const db = drizzle(neon(url));

async function main() {
  console.log('→ Sembrando data real de CLP...');

  // ---------------- USUARIOS ----------------
  await db.insert(s.users).values([
    { name: 'Luis Alvarado', email: 'comercial@clpautomotriz.com', role: 'admin' },
    { name: 'Patricia', email: 'pat@clpautomotriz.com', role: 'logistica' },
    { name: 'Cesar Terrones', email: 'cesar@clpautomotriz.com', role: 'operaciones' }
  ]).onConflictDoNothing({ target: s.users.email });

  // ---------------- PROVEEDORES ----------------
  const proveedores = [
    { name: 'TIANEN (Zhejiang Tianen)', country: 'China', contact: 'Linda Xu', email: 'sales@zjtianen.com', products: 'Tanques GLP', bank: 'Bank of China', swift: '', account: '' },
    { name: 'DAMESA', country: 'España', contact: 'Dana Costea', email: 'edc@damesa.com', products: 'Abrazaderas', bank: 'Sabadell', swift: 'BSABESBB', account: 'ES86 0081 5154 2800 0189 0398' },
    { name: 'FARO / OMB Saleri', country: 'Italia', contact: 'Genny Gorni', email: '', products: 'Mangueras, inyector', bank: 'Unicredit', swift: 'UNCRITMMORR', account: 'IT37U0200805364000500042449' },
    { name: 'AMAX (SILMET)', country: 'Polonia', contact: 'Marcin Piekarski', email: '', products: 'Cañería cobre SILMET', bank: 'ING Bank', swift: 'INGBPLPWXXX', account: '' },
    { name: 'YONGNOU / YNLPGTank', country: 'China', contact: 'Pucheng Yongnou', email: '', products: 'Tanques GLP', bank: 'Fujian Bank', swift: 'FJIBCNBA390', account: '' },
    { name: 'HUNAN HUKETEK', country: 'China', contact: '', email: '', products: 'Cañería acero, manómetros', bank: '', swift: '', account: '' }
  ];
  await db.insert(s.suppliers).values(proveedores).onConflictDoNothing();
  const provRows = await db.select().from(s.suppliers);
  const provId = (name: string) => provRows.find((p) => p.name.startsWith(name.split(' ')[0]))?.id ?? null;

  // ---------------- IMPORTACIONES 110–116 ----------------
  const imports = [
    { number: 110, supplierId: provId('TIANEN'), country: 'China', products: '995 tanques GLP', route: 'Marítimo', incoterm: 'FOB',
      status: 'Nacionalizada' as const, dam: '118-2026-10-322322', customsAgent: 'Central Cargo', vesselFlight: 'MSC LILY',
      quantity: '995', fob: '35820.00', freight: '5870.00', insurance: '100.30', currency: 'USD' as const, eta: '2026-07-15' },
    { number: 112, supplierId: provId('HUNAN'), country: 'China', products: '500 cañería acero + 400 manómetros', route: 'Marítimo LCL', incoterm: 'EXW',
      status: 'En almacén' as const, customsAgent: 'Central Cargo', quantity: '900', fob: '2450.00', freight: '0', insurance: '0', currency: 'USD' as const },
    { number: 114, supplierId: provId('DAMESA'), country: 'España', products: '17,300 abrazaderas (aéreo)', route: 'Aéreo', incoterm: 'EXW',
      status: 'En tránsito' as const, customsAgent: 'Nexus Aduanas', quantity: '17300', fob: '3542.55', freight: '0', insurance: '0', currency: 'USD' as const, eta: '2026-07-15' },
    { number: 115, supplierId: provId('AMAX'), country: 'Polonia', products: 'Cañería cobre SILMET 6mm+8mm', route: 'Marítimo', incoterm: 'EXW',
      status: 'En tránsito' as const, customsAgent: 'Nexus Aduanas', quantity: '6700', fob: '0', freight: '0', insurance: '0', currency: 'USD' as const, eta: '2026-08-11' },
    { number: 116, supplierId: provId('TIANEN'), country: 'China', products: '995 tanques GLP (2do contenedor)', route: 'Marítimo', incoterm: 'FOB',
      status: 'Pagado 30%' as const, quantity: '995', fob: '35820.00', freight: '5870.00', insurance: '100.30', currency: 'USD' as const, eta: '2026-09-15' }
  ];
  await db.insert(s.imports).values(imports).onConflictDoNothing({ target: s.imports.number });
  const impRows = await db.select().from(s.imports);
  const impId = (num: number) => impRows.find((i) => i.number === num)?.id ?? null;

  // ---- Costos TIANEN-1 (110): bloques A / B / C ----
  const t1 = impId(110);
  if (t1) {
    await db.insert(s.importCosts).values([
      { importId: t1, block: 'A', concept: 'FOB', amount: '35820.00', recoverable: false },
      { importId: t1, block: 'A', concept: 'Flete internacional', amount: '5870.00', recoverable: false },
      { importId: t1, block: 'A', concept: 'Seguro', amount: '100.30', recoverable: false },
      { importId: t1, block: 'B', concept: 'Servicios agente Central Cargo', amount: '1734.95', recoverable: false },
      { importId: t1, block: 'B', concept: 'Derechos arancelarios (0% tanques)', amount: '0', recoverable: false },
      { importId: t1, block: 'C', concept: 'IGV importación (18% CIF)', amount: '7522.25', recoverable: true },
      { importId: t1, block: 'C', concept: 'Percepción IGV 3.5%', amount: '1725.94', recoverable: true },
      { importId: t1, block: 'C', concept: 'IGV servicios agente', amount: '312.29', recoverable: true }
    ]).onConflictDoNothing();
  }

  // ---------------- VENTAS VARI E001-1 .. E001-19 ----------------
  // total = c/IGV, subtotal = ex-IGV, retención 3% donde >S/700
  const V = (oc: string, inv: string, sub: number, status = 'Pagado') =>
    ({ ocNumber: oc, invoiceNumber: inv, date: '2026-06-25', subtotal: sub.toFixed(2),
       igv: (sub * 0.18).toFixed(2), total: (sub * 1.18).toFixed(2),
       retention: sub > 593 ? (sub * 1.18 * 0.03).toFixed(2) : '0', collectionStatus: status, currency: 'USD' as const });
  await db.insert(s.sales).values([
    V('9120', 'E001-1', 10061.64), V('9188', 'E001-2', 416.00), V('9216', 'E001-3', 1898.00),
    V('9269', 'E001-4', 1290.00), V('9288', 'E001-5', 635.00), V('9288', 'E001-6', 95.00),
    V('9340', 'E001-7', 18044.66), V('9339', 'E001-8', 1640.00), V('9409', 'E001-10', 18657.60),
    V('9388', 'E001-11', 2880.00), V('9387', 'E001-12', 3751.25), V('9436', 'E001-13', 4535.00),
    V('9435', 'E001-14', 14330.00), V('9433', 'E001-15', 2670.00), V('9431', 'E001-16', 400.00),
    V('9310', 'E001-17', 1112.50, 'Pagado'),
    { ocNumber: '9553', invoiceNumber: 'E001-18', date: '2026-07-07', subtotal: '141.53', igv: '25.47', total: '167.00', retention: '0', collectionStatus: 'Pendiente', currency: 'USD' },
    { ocNumber: '-', invoiceNumber: 'E001-19', date: '2026-07-09', subtotal: '105.93', igv: '19.07', total: '125.00', retention: '0', collectionStatus: 'Pendiente', currency: 'USD' }
  ]).onConflictDoNothing();
  const saleRows = await db.select().from(s.sales);
  const saleId = (inv: string) => saleRows.find((x) => x.invoiceNumber === inv)?.id ?? null;

  // ---------------- RETENCIONES (constancias R001 confirmadas) ----------------
  await db.insert(s.retentions).values([
    { constancia: 'R001-644', saleId: saleId('E001-1'), amount: '356.18', date: '2026-05-20', received: true, currency: 'PEN' },
    { constancia: 'R001-688', saleId: saleId('E001-2'), amount: '205.00', date: '2026-06-01', received: true, currency: 'PEN' },
    { constancia: 'R001-690', saleId: saleId('E001-7'), amount: '638.78', date: '2026-06-01', received: true, currency: 'PEN' },
    { constancia: 'R001-727', saleId: saleId('E001-11'), amount: '794.36', date: '2026-06-22', received: true, currency: 'PEN' },
    { constancia: 'R001-741', saleId: saleId('E001-13'), amount: '2659.61', date: '2026-06-30', received: true, currency: 'PEN' }
  ]).onConflictDoNothing();

  // ---------------- COMPRAS LOCALES ----------------
  await db.insert(s.localPurchases).values([
    { supplierName: 'GM Cylinders', ruc: '20550842549', quantity: '100', unitCost: '1.2712', invoice: 'FV04-001147', date: '2026-06-19', currency: 'USD' },
    { supplierName: 'GM Cylinders', ruc: '20550842549', quantity: '4', unitCost: '110.00', invoice: 'OC009574-TOR', date: '2026-07-01', currency: 'USD' }
  ]).onConflictDoNothing();

  // ---------------- PRÉSTAMOS ----------------
  await db.insert(s.loans).values([
    { lender: 'Lucía Vera', isCreditLine: false, loanDate: '2026-03-15', principal: '4591.00', currency: 'USD', interestRate: '0', rateType: 'mensual', status: 'Devuelto', notes: 'Devuelto 10/04/2026' },
    { lender: 'Línea de crédito (intercompañía alquiler)', isCreditLine: true, loanDate: '2026-06-30', principal: '6700.00', currency: 'USD', interestRate: '0', rateType: 'mensual', status: 'Vigente', notes: 'Retorno esquema alquiler declarado' }
  ]).onConflictDoNothing();

  // ---------------- OPTIMIZACIÓN TRIBUTARIA (ALQUILERES) ----------------
  await db.insert(s.rentalOptimization).values([
    { concept: 'Alquiler local/depa/vehículos', declaredAmount: '6700.00', realPaymentPct: '5', realAmount: '335.00', tiedToSalesPct: false, month: '2026-07-01', currency: 'USD' },
    { concept: 'Alquiler de marca Bellestet (desde ago)', declaredAmount: '0', realPaymentPct: '5', realAmount: '0', tiedToSalesPct: true, month: '2026-08-01', currency: 'USD' }
  ]).onConflictDoNothing();

  console.log('✓ Seed completado.');
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
