import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '@/lib/env';

export const sql = env.databaseUrl ? neon(env.databaseUrl) : null;
export const db = sql ? drizzle(sql) : null;

export function requireDb() {
  if (!db) throw new Error('DATABASE_URL no está configurada.');
  return db;
}
