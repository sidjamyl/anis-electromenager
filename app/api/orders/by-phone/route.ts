import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const phone = new URL(request.url).searchParams.get('phone')?.trim();
  if (!phone || phone.length < 9) return NextResponse.json({ error: 'Numéro invalide' }, { status: 400 });
  return NextResponse.json(await prisma.order.findMany({ where: { customerPhone: phone }, include: { items: true }, orderBy: { createdAt: 'desc' } }));
}
