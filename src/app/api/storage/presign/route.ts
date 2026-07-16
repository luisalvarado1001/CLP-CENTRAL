import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createUploadUrl } from '@/lib/r2';

const payloadSchema = z.object({
  fileName: z.string().min(1).max(160),
  contentType: z.string().min(1).max(120),
  folder: z.enum(['importaciones','ventas','compras-locales','facturas-rh','prestamos','contratos','otros'])
});

function cleanName(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120) || 'archivo';
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const parsed = payloadSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });

  const key = `${parsed.data.folder}/${new Date().getUTCFullYear()}/${crypto.randomUUID()}-${cleanName(parsed.data.fileName)}`;
  const uploadUrl = await createUploadUrl(key, parsed.data.contentType);
  return NextResponse.json({ key, uploadUrl, expiresIn: 300 });
}
