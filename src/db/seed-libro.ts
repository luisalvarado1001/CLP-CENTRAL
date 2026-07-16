/**
 * SEED LIBRO MAYOR — 128 movimientos reales BCP USD (12/03 al 15/07/2026).
 * Ya reconciliado con saldo real $5,936.41. Ejecutar: npx tsx src/db/seed-libro.ts
 */
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as s from './schema';

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL no configurada');
const db = drizzle(neon(url));

const movimientos = [
  {
    "category": "CAJA",
    "detail": "Capital inicial",
    "date": "2026-03-12",
    "amount": "10234.04",
    "currency": "USD",
    "comment": "Luis A",
    "originModule": "libro-mayor"
  },
  {
    "category": "CAJA",
    "detail": "Aporte",
    "date": "2026-03-13",
    "amount": "5000.0",
    "currency": "USD",
    "comment": "Cesar T",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-03-15",
    "amount": "-0.25",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "TIANEN",
    "date": "2026-03-16",
    "amount": "-10840.0",
    "currency": "USD",
    "comment": "Compra cont 40\" tanques GLP 30% + Comisiones BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Mantenimiento cuenta",
    "date": "2026-03-16",
    "amount": "-3.77",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-03-16",
    "amount": "-0.5",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "DAMESA",
    "date": "2026-03-17",
    "amount": "-1880.94",
    "currency": "USD",
    "comment": "Compra y flete abrazaderas + Comisiones BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-03-17",
    "amount": "-0.05",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "CAJA",
    "detail": "Aporte",
    "date": "2026-03-25",
    "amount": "30000.0",
    "currency": "USD",
    "comment": "Luis A",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-03-25",
    "amount": "-1.5",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "Hunan Huketek",
    "date": "2026-03-30",
    "amount": "-2465.0",
    "currency": "USD",
    "comment": "Cañería y manómetro GNV",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-03-30",
    "amount": "-0.1",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "CAJA",
    "detail": "Aporte",
    "date": "2026-03-30",
    "amount": "6720.0",
    "currency": "USD",
    "comment": "Cesar T",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "AUTOGAS RUIZ",
    "date": "2026-03-30",
    "amount": "-6720.0",
    "currency": "USD",
    "comment": "Compra de 100 reductores y 40 MTV BE",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "FARO",
    "date": "2026-03-31",
    "amount": "-13063.78",
    "currency": "USD",
    "comment": "Mangueras GNV y GLP",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "Interés ganado",
    "date": "2026-03-31",
    "amount": "0.9",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Mantenimiento cuenta",
    "date": "2026-03-31",
    "amount": "-5.66",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-03-31",
    "amount": "-0.65",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "TIANEN",
    "date": "2026-04-01",
    "amount": "-10806.0",
    "currency": "USD",
    "comment": "Compra 2do ctn 40\"",
    "originModule": "libro-mayor"
  },
  {
    "category": "CAJA",
    "detail": "Aporte",
    "date": "2026-04-01",
    "amount": "20000.0",
    "currency": "USD",
    "comment": "Luis A",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "D WILLIAMS",
    "date": "2026-04-04",
    "amount": "-1200.0",
    "currency": "USD",
    "comment": "Compra de tanques GNV 3 GAL",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-04-03",
    "amount": "-1.55",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "AMAX",
    "date": "2026-04-06",
    "amount": "-18576.2",
    "currency": "USD",
    "comment": "Compra de cañerías AMX",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "BCP",
    "date": "2026-04-06",
    "amount": "-1.32",
    "currency": "USD",
    "comment": "BCP Envío de estado de cuenta",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-04-06",
    "amount": "-0.9",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "SCHARFF",
    "date": "2026-04-09",
    "amount": "-487.66",
    "currency": "USD",
    "comment": "Pago envío aéreo DAMESA",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "DAMESA",
    "date": "2026-04-10",
    "amount": "-2390.04",
    "currency": "USD",
    "comment": "Pago segundo pedido aéreo DAMESA",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES",
    "date": "2026-04-10",
    "amount": "11515.59",
    "currency": "USD",
    "comment": "Pago VARI",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "Lucia Vera",
    "date": "2026-04-10",
    "amount": "-4591.38",
    "currency": "USD",
    "comment": "Devolución de préstamo",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-04-10",
    "amount": "-0.85",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "CAJA",
    "detail": "Aporte",
    "date": "2026-04-14",
    "amount": "25000.0",
    "currency": "USD",
    "comment": "Luis A.",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-04-14",
    "amount": "-1.25",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Mantenimiento cuenta",
    "date": "2026-04-15",
    "amount": "-3.77",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "REEMBOLSO",
    "detail": "DEVOLUCIÓN DWILLIAMS",
    "date": "2026-04-21",
    "amount": "1200.0",
    "currency": "USD",
    "comment": "Compra de tanques GNV 3 GAL",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-04-21",
    "amount": "-0.05",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "NEXUS",
    "date": "2026-04-30",
    "amount": "-1315.12",
    "currency": "USD",
    "comment": "Pago agenciamiento aduanas segundo pedido DAMESA",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "BCP",
    "date": "2026-04-30",
    "amount": "2.23",
    "currency": "USD",
    "comment": "Interés ganado",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Mantenimiento cuenta",
    "date": "2026-04-30",
    "amount": "-5.66",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Operación ventanilla",
    "date": "2026-04-30",
    "amount": "-2.07",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-04-30",
    "amount": "-0.05",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "TRAN.CTAS.TERC.BM",
    "date": "2026-05-01",
    "amount": "-23.14",
    "currency": "USD",
    "comment": "01/05 7:20 PM - Transferencia menor BCP - VERIFICAR origen",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "SUNAT",
    "date": "2026-05-04",
    "amount": "-1080.61",
    "currency": "USD",
    "comment": "Pago derechos SUNAT - DAMESA 114 (IMG_1252)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-05-04",
    "amount": "-0.05",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Envío estado cuenta",
    "date": "2026-05-05",
    "amount": "-1.32",
    "currency": "USD",
    "comment": "BCP - ENVIO.ESTADO.CTA",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "TIANEN",
    "date": "2026-05-12",
    "amount": "-25190.0",
    "currency": "USD",
    "comment": "TRANSF.EXT H2733 - Saldo final 70% TIANEN-1 (995 tanques GLP)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-05-12",
    "amount": "-1.25",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "CENTRAL CARGO",
    "date": "2026-05-15",
    "amount": "-2032.72",
    "currency": "USD",
    "comment": "TRAN.CTAS.TERC.HK - Anticipo gastos FARO 113 (IMG_1251)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Mantenimiento cuenta",
    "date": "2026-05-15",
    "amount": "-3.77",
    "currency": "USD",
    "comment": "BCP - MANT TD ADIC NEG",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-05-17",
    "amount": "-0.1",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "REGGIOGAS",
    "date": "2026-05-19",
    "amount": "-840.0",
    "currency": "USD",
    "comment": "19/05 5:52 PM - Compra 8 tanques ATIKER (F001-00011475)",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "TRAN.CTAS.TERC.BM",
    "date": "2026-05-20",
    "amount": "10000.0",
    "currency": "USD",
    "comment": "20/05 10:36 AM - Entrada por transferencia tercero - VERIFICAR origen",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "TRAN.CTAS.TERC.BM",
    "date": "2026-05-20",
    "amount": "4000.0",
    "currency": "USD",
    "comment": "20/05 10:37 AM - Entrada por transferencia tercero - VERIFICAR origen",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "TRAN.CTAS.TERC.BM",
    "date": "2026-05-20",
    "amount": "-10000.0",
    "currency": "USD",
    "comment": "20/05 10:45 AM - Pago a tercero - VERIFICAR destino",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "TRAN.CTAS.TERC.BM",
    "date": "2026-05-20",
    "amount": "-2000.0",
    "currency": "USD",
    "comment": "20/05 10:46 AM - Pago a tercero - VERIFICAR destino",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "GASTEK SERVICES",
    "date": "2026-05-20",
    "amount": "-2650.0",
    "currency": "USD",
    "comment": "20/05 10:56 AM - Compra 30 tanques (10 NACIONAL + 20 ZK) F001-13707",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "CVRGAS PERU",
    "date": "2026-05-20",
    "amount": "-4117.65",
    "currency": "USD",
    "comment": "20/05 4:07 PM - Compra 50 tanques CN (E001-6937, equivale S/14,000)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-05-20",
    "amount": "-1.6",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "NEXUS AGENCIA ADUANAS",
    "date": "2026-05-21",
    "amount": "-1112.22",
    "currency": "USD",
    "comment": "21/05 11:47 AM - Pago liquidación DAMESA 114 (IMG_1250)",
    "originModule": "libro-mayor"
  },
  {
    "category": "CAJA",
    "detail": "Aporte",
    "date": "2026-05-21",
    "amount": "30000.0",
    "currency": "USD",
    "comment": "Luis A. - Depósito efectivo (Silgas + GM)",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "CENTRAL CARGO",
    "date": "2026-05-21",
    "amount": "-1864.54",
    "currency": "USD",
    "comment": "21/05 4:27 PM - Pago FE01-781/782 - FARO 113",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-3",
    "date": "2026-05-21",
    "amount": "2172.45",
    "currency": "USD",
    "comment": "Cobro 0100000003 VARI AL",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-4",
    "date": "2026-05-21",
    "amount": "1476.53",
    "currency": "USD",
    "comment": "Cobro 0100000004 VARI AL",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-5",
    "date": "2026-05-21",
    "amount": "726.82",
    "currency": "USD",
    "comment": "Cobro 0100000005 VARI AL",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-2",
    "date": "2026-05-21",
    "amount": "476.15",
    "currency": "USD",
    "comment": "Cobro 0100000002 VARI AL",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-6",
    "date": "2026-05-21",
    "amount": "108.74",
    "currency": "USD",
    "comment": "Cobro 0100000006 VARI AL",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "GM CYLINDERS",
    "date": "2026-05-21",
    "amount": "-10000.0",
    "currency": "USD",
    "comment": "21/05 8:35 PM - Compra 200 tanques STEP pago 1/3",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "GM CYLINDERS",
    "date": "2026-05-21",
    "amount": "-10000.0",
    "currency": "USD",
    "comment": "21/05 8:37 PM - Compra 200 tanques STEP pago 2/3",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-05-21",
    "amount": "-2.75",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "GM CYLINDERS",
    "date": "2026-05-22",
    "amount": "-600.0",
    "currency": "USD",
    "comment": "22/05 9:05 AM - Compra 200 tanques STEP pago 3/3",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "SUNAT",
    "date": "2026-05-22",
    "amount": "-3177.83",
    "currency": "USD",
    "comment": "Pago derechos SUNAT - FARO 113 (IMG_1254)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-05-22",
    "amount": "-0.15",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "TRAN.CTAS.PROP.BM",
    "date": "2026-05-25",
    "amount": "-280.24",
    "currency": "USD",
    "comment": "25/05 12:21 PM - Transferencia entre cuentas propias (USD→PEN)",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-7",
    "date": "2026-05-28",
    "amount": "20653.92",
    "currency": "USD",
    "comment": "Cobro 1-00000007 VARI AL (238 tanques)",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "SUNAT",
    "date": "2026-05-28",
    "amount": "-4570.1",
    "currency": "USD",
    "comment": "Pago derechos SUNAT - AMAX 115 (IMG_1255)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-05-28",
    "amount": "-1.2",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Mantenimiento cuenta",
    "date": "2026-05-30",
    "amount": "-5.66",
    "currency": "USD",
    "comment": "BCP - MANT. CUENTA MAY26",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "Interés ganado",
    "date": "2026-05-30",
    "amount": "1.59",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Microsoft 365",
    "date": "2026-06-02",
    "amount": "-7.2",
    "currency": "USD",
    "comment": "Suscripción MICROSOFT#G1619413",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "TRAN.CTAS.PROP.BM",
    "date": "2026-06-02",
    "amount": "-212.58",
    "currency": "USD",
    "comment": "02/06 - Transferencia entre cuentas propias (cambio USD→S/720)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Envío estado cuenta",
    "date": "2026-06-03",
    "amount": "-1.32",
    "currency": "USD",
    "comment": "BCP - ENVIO.ESTADO.CTA",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-8",
    "date": "2026-06-11",
    "amount": "1877.14",
    "currency": "USD",
    "comment": "Cobro 0100000008 VARI AL (abrazaderas 12-22/9)",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-10",
    "date": "2026-06-11",
    "amount": "21355.49",
    "currency": "USD",
    "comment": "Cobro 0100000010 VARI AL (anticipo tanques STEP)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-06-11",
    "amount": "-1.1",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "AJUSTE CUADRE 12-15 JUN",
    "date": "2026-06-15",
    "amount": "-2694.59",
    "currency": "USD",
    "comment": "Movimientos 12-15/06 sin captura + ITF transf. internacionales 16/06 (cuadra saldo real BCP). SOLICITAR extracto para desglose",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "TRANSF.EXT K145191",
    "date": "2026-06-16",
    "amount": "-18996.0",
    "currency": "USD",
    "comment": "16/06 8:30 AM - Pago importacion (VERIFICAR proveedor: posible TIANEN-2 30% o FARO)",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "TRANSF.EXT J014520",
    "date": "2026-06-16",
    "amount": "-1717.07",
    "currency": "USD",
    "comment": "16/06 8:56 AM - Pago importacion / flete (VERIFICAR proveedor)",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-11",
    "date": "2026-06-18",
    "amount": "3296.45",
    "currency": "USD",
    "comment": "Cobro 0100000011 VARI AL (18/06 7:34 PM)",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-12",
    "date": "2026-06-18",
    "amount": "4293.69",
    "currency": "USD",
    "comment": "Cobro 0100000012 VARI AL (18/06 7:34 PM)",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "TRANSF.EXT K146433",
    "date": "2026-06-18",
    "amount": "-11610.0",
    "currency": "USD",
    "comment": "18/06 8:40 AM - YONGNOU/YNLPGTank 30% (~995-1100 tanques GLP, banco Fujian)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-06-18",
    "amount": "-0.9",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "TRANSF.EXT J014759",
    "date": "2026-06-19",
    "amount": "-12282.94",
    "currency": "USD",
    "comment": "19/06 9:00 AM - Pago importacion (VERIFICAR proveedor: posible FARO/AMAX)",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "GM CYLINDERS",
    "date": "2026-06-19",
    "amount": "-150.0",
    "currency": "USD",
    "comment": "19/06 10:33 AM - GM00020610995200 - Compra local (T de agua / componentes)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-06-19",
    "amount": "-0.6",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "DAMESA",
    "date": "2026-06-23",
    "amount": "-4148.71",
    "currency": "USD",
    "comment": "23/06 9:13 AM - TRANSF.EXT J014930 - DAMESA maritimo FOB (43,800 abrazaderas)",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "SCHARFF",
    "date": "2026-06-23",
    "amount": "-461.66",
    "currency": "USD",
    "comment": "23/06 8:28 AM - SCHA873198948123 - Courier Scharff",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "SUNAT",
    "date": "2026-06-23",
    "amount": "-576.55",
    "currency": "USD",
    "comment": "23/06 6:19 AM - Pago derechos SUNAT (VERIFICAR importacion asociada)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-06-23",
    "amount": "-0.2",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-13",
    "date": "2026-06-25",
    "amount": "5190.76",
    "currency": "USD",
    "comment": "Cobro 0100000013 VARI AL (25/06 7:32 PM)",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-14",
    "date": "2026-06-25",
    "amount": "16402.12",
    "currency": "USD",
    "comment": "Cobro 0100000014 VARI AL (25/06 7:32 PM - canerias Astara)",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-15",
    "date": "2026-06-25",
    "amount": "3057.23",
    "currency": "USD",
    "comment": "Cobro 0100000015 VARI AL (25/06 7:32 PM)",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-16",
    "date": "2026-06-25",
    "amount": "457.84",
    "currency": "USD",
    "comment": "Cobro 0100000016 VARI AL (25/06 7:32 PM)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-06-25",
    "amount": "-1.2",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "ALQUILER / L.CREDITO",
    "date": "2026-06-30",
    "amount": "-900.0",
    "currency": "USD",
    "comment": "30/06 12:49 PM - TRAN.CTAS.TERC.BM - Salida esquema alquiler declarado",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "ALQUILER / L.CREDITO",
    "date": "2026-06-30",
    "amount": "-1200.0",
    "currency": "USD",
    "comment": "30/06 12:50 PM - TRAN.CTAS.TERC.BM - Salida esquema alquiler declarado",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "ALQUILER / L.CREDITO",
    "date": "2026-06-30",
    "amount": "-2500.0",
    "currency": "USD",
    "comment": "30/06 12:52 PM - TRAN.CTAS.TERC.BM - Salida esquema alquiler declarado",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "ALQUILER / L.CREDITO",
    "date": "2026-06-30",
    "amount": "4600.0",
    "currency": "USD",
    "comment": "30/06 12:59 PM - TRAN.CTAS.TERC.BM - Retorno via linea de credito (intercompania)",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "ALQUILER / L.CREDITO",
    "date": "2026-06-30",
    "amount": "-900.0",
    "currency": "USD",
    "comment": "30/06 12:59 PM - TRAN.CTAS.TERC.BM - Salida esquema alquiler declarado",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "ALQUILER / L.CREDITO",
    "date": "2026-06-30",
    "amount": "-1200.0",
    "currency": "USD",
    "comment": "30/06 1:01 PM - TRAN.CTAS.TERC.BM - Salida esquema alquiler declarado",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "ALQUILER / L.CREDITO",
    "date": "2026-06-30",
    "amount": "2100.0",
    "currency": "USD",
    "comment": "30/06 1:03 PM - TRAN.CTAS.TERC.BM - Retorno via linea de credito (intercompania)",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "DAMESA",
    "date": "2026-06-30",
    "amount": "-3542.55",
    "currency": "USD",
    "comment": "30/06 8:16 AM - TRANSF.EXT J015211 - DAMESA aereo FOB (17,300 abrazaderas)",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "Interes ganado",
    "date": "2026-06-30",
    "amount": "2.12",
    "currency": "USD",
    "comment": "BCP - INTERES GANADO",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Mantenimiento cuenta",
    "date": "2026-06-30",
    "amount": "-5.66",
    "currency": "USD",
    "comment": "BCP - MANT. CUENTA JUN26",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-06-30",
    "amount": "-0.65",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "INVENTARIO",
    "detail": "GM CYLINDERS",
    "date": "2026-07-01",
    "amount": "-490.0",
    "currency": "USD",
    "comment": "01/07 - GM00020610995200 - Compra local (T de agua / componentes)",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "TRAN.CTAS.PROP.BM",
    "date": "2026-07-01",
    "amount": "-176.42",
    "currency": "USD",
    "comment": "01/07 11:10 AM - Transferencia entre cuentas propias (USD->PEN)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Microsoft 365",
    "date": "2026-07-02",
    "amount": "-8.4",
    "currency": "USD",
    "comment": "Suscripcion MICROSOFT#G1683279",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-07-02",
    "amount": "-0.4",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "CENTRAL CARGO",
    "date": "2026-07-02",
    "amount": "-8165.04",
    "currency": "USD",
    "comment": "02/07 - TRAN.CTAS.TERC.BM - Nacionalizacion TIANEN-1 (FE01-908/909/910)",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "TRAN.CTAS.TERC.BM",
    "date": "2026-07-02",
    "amount": "-517.62",
    "currency": "USD",
    "comment": "02/07 - Pago a tercero (VERIFICAR: posible agente/servicio TIANEN-1)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Envio estado cuenta",
    "date": "2026-07-03",
    "amount": "-1.32",
    "currency": "USD",
    "comment": "BCP - ENVIO.ESTADO.CTA",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "TRAN.CTAS.PROP.BM",
    "date": "2026-07-03",
    "amount": "-59.03",
    "currency": "USD",
    "comment": "03/07 - Transferencia entre cuentas propias (USD->PEN)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-07-07",
    "amount": "-0.45",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "SUNAT",
    "date": "2026-07-07",
    "amount": "-9784.05",
    "currency": "USD",
    "comment": "07/07 - PAGO DE IMPUESTOS - SUNAT TIANEN-1 (IGV+percepcion, CREDITO FISCAL recuperable)",
    "originModule": "libro-mayor"
  },
  {
    "category": "VENTA",
    "detail": "VARI ALMACENES E001-17",
    "date": "2026-07-09",
    "amount": "1273.37",
    "currency": "USD",
    "comment": "09/07 - Cobro 0100000017 VARI AL (mangueras, neto retencion 3%)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "ITF",
    "date": "2026-07-09",
    "amount": "-0.05",
    "currency": "USD",
    "comment": "BCP",
    "originModule": "libro-mayor"
  },
  {
    "category": "OTRO",
    "detail": "TRAN.CTAS.PROP.BM",
    "date": "2026-07-13",
    "amount": "-471.42",
    "currency": "USD",
    "comment": "13/07 - Transferencia entre cuentas propias (USD->PEN)",
    "originModule": "libro-mayor"
  },
  {
    "category": "ADYACENTES",
    "detail": "SUNAT",
    "date": "2026-07-13",
    "amount": "-546.34",
    "currency": "USD",
    "comment": "13/07 - PAGO DE IMPUESTOS (VERIFICAR: posible derechos DAMESA aereo)",
    "originModule": "libro-mayor"
  },
  {
    "category": "GASTO FINANCIERO",
    "detail": "Mantenimiento cuenta",
    "date": "2026-07-15",
    "amount": "-3.77",
    "currency": "USD",
    "comment": "BCP - MANT TD ADIC NEG",
    "originModule": "libro-mayor"
  }
];

async function main() {
  console.log(`→ Cargando ${movimientos.length} movimientos al Libro Mayor...`);
  // Inserta en lotes de 50
  for (let i = 0; i < movimientos.length; i += 50) {
    await db.insert(s.ledger).values(movimientos.slice(i, i + 50) as never);
  }
  console.log('✓ Libro Mayor cargado.');
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
