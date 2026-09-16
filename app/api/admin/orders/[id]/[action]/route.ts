import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth-server';

export async function POST(_: Request, { params }: { params: Promise<{ id: string; action: string }> }) {
  const user = await getUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, action } = await params;
  const status = action === 'confirm' ? 'CONFIRMED' : action === 'cancel' ? 'CANCELLED' : null;
  if (!status) return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  return NextResponse.json(await prisma.order.update({ where: { id }, data: { status } }));
}
