import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth-server';

export async function GET() { return NextResponse.json(await prisma.category.findMany({ orderBy: { nameFr: 'asc' }, include: { _count: { select: { products: true } } } })); }
export async function POST(request: Request) {
  if ((await getUser())?.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { nameFr, nameAr } = await request.json();
  if (!nameFr?.trim()) return NextResponse.json({ error: 'Nom requis' }, { status: 400 });
  try { return NextResponse.json(await prisma.category.create({ data: { nameFr: nameFr.trim(), nameAr: nameAr?.trim() || null } }), { status: 201 }); } catch { return NextResponse.json({ error: 'Cette catégorie existe déjà' }, { status: 400 }); }
}
export async function DELETE(request: Request) {
  if ((await getUser())?.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requis' }, { status: 400 });
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
