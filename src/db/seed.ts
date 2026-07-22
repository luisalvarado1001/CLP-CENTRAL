/** CLI: carga la data inicial. Uso: npm run db:seed */
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { seedBase } from './seed-base';

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL no configurada');

seedBase(drizzle(neon(url)))
  .then(() => { console.log('✓ Data inicial cargada.'); process.exit(0); })
  .catch((e) => { console.error(e); process.exit(1); });
