import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth-server';
import { sendOrderNotification } from '@/lib/utils/email';

export async function POST(request: Request) {
  try {
    const user = await getUser().catch(() => null);
    const body = await request.json();
    const { customerName, customerPhone, customerEmail, address, items } = body;
    if (!customerName?.trim() || !customerPhone?.trim() || !address?.trim() || !Array.isArray(items) || !items.length) return NextResponse.json({ error: 'Informations de commande incomplètes' }, { status: 400 });
    const productIds = items.map((item: { productId: string }) => item.productId);
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
    if (products.length !== productIds.length) return NextResponse.json({ error: 'Produit invalide' }, { status: 400 });
    const normalizedItems = items.map((item: { productId: string; variantName?: string; quantity: number; unitPrice: number }) => {
      const product = products.find((p) => p.id === item.productId)!;
      const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
      const unitPrice = Number(item.unitPrice);
      if (!Number.isFinite(unitPrice) || unitPrice < 0) throw new Error('Prix invalide');
      return { productId: product.id, productName: product.nameFr, variantName: item.variantName || null, quantity, unitPrice, total: quantity * unitPrice };
    });
    const subtotal = normalizedItems.reduce((sum, item) => sum + item.total, 0);
    const orderNumber = `ANS-${Date.now().toString().slice(-8)}`;
    const order = await prisma.order.create({ data: { orderNumber, userId: user?.id, customerName: customerName.trim(), customerPhone: customerPhone.trim(), customerEmail: customerEmail?.trim() || null, address: address.trim(), wilaya: '', wilayaId: '', municipality: '', municipalityId: '', deliveryType: 'MANUAL', shippingCost: 0, subtotal, total: subtotal, status: 'PENDING', items: { create: normalizedItems } }, include: { items: true } });
    const settings = await prisma.siteSettings.findFirst();
    await sendOrderNotification(order, settings?.adminEmail === 'admin@example.com' ? undefined : settings?.adminEmail).catch((error) => console.error('Order email failed:', error));
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ error: 'Impossible d’envoyer la commande' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const user = await getUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const status = new URL(request.url).searchParams.get('status');
  return NextResponse.json(await prisma.order.findMany({ where: status && status !== 'ALL' ? { status } : undefined, include: { items: true }, orderBy: { createdAt: 'desc' } }));
}
