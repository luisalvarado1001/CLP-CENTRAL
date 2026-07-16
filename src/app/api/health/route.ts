import { NextResponse } from 'next/server';
import { integrations } from '@/lib/env';

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'clp-central',
    integrations,
    timestamp: new Date().toISOString()
  });
}
