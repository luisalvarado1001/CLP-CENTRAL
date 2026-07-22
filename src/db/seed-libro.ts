/** CLI: carga el Libro Mayor. Uso: npm run db:seed-libro */
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { seedLedger } from './seed-ledger';

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL no configurada');

seedLedger(drizzle(neon(url)))
  .then((n) => { console.log(`✓ ${n} movimientos cargados.`); process.exit(0); })
  .catch((e) => { console.error(e); process.exit(1); });
