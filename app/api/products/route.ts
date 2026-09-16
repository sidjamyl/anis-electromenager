import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth-server';

const include = { variants: true, category: true };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const product = id ? await prisma.product.findUnique({ where: { id }, include }) : null;
  if (id) return product ? NextResponse.json(product) : NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
  return NextResponse.json(await prisma.product.findMany({ where: searchParams.get('popular') === 'true' ? { isPopular: true } : undefined, include, orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }] }));
}

async function isAdmin() { return (await getUser())?.role === 'ADMIN'; }
function validProduct(body: any) { return body.nameFr?.trim() && body.nameAr?.trim() && body.descriptionFr?.trim() && body.descriptionAr?.trim() && Number(body.price) > 0 && body.image?.trim() && body.categoryId; }

export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  if (!validProduct(body) || !await prisma.category.findUnique({ where: { id: body.categoryId } })) return NextResponse.json({ error: 'Produit ou catégorie invalide' }, { status: 400 });
  const { variants = [], ...data } = body;
  return NextResponse.json(await prisma.product.create({ data: { ...data, type: 'GENERAL', price: Number(data.price), variants: data.hasVariants ? { create: variants } : undefined }, include }), { status: 201 });
}

export async function PUT(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = new URL(request.url).searchParams.get('id');
  const body = await request.json();
  if (!id || !validProduct(body) || !await prisma.category.findUnique({ where: { id: body.categoryId } })) return NextResponse.json({ error: 'Produit ou catégorie invalide' }, { status: 400 });
  const { variants = [], ...data } = body;
  await prisma.productVariant.deleteMany({ where: { productId: id } });
  return NextResponse.json(await prisma.product.update({ where: { id }, data: { ...data, type: 'GENERAL', price: Number(data.price), variants: data.hasVariants ? { create: variants } : undefined }, include }));
}

export async function DELETE(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requis' }, { status: 400 });
  await prisma.$transaction([prisma.orderItem.deleteMany({ where: { productId: id } }), prisma.productVariant.deleteMany({ where: { productId: id } }), prisma.product.delete({ where: { id } })]);
  return NextResponse.json({ success: true });
}
