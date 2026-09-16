import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const [cuisine, lavage, froid] = await Promise.all([
    prisma.category.upsert({ where: { nameFr: 'Cuisine' }, update: {}, create: { nameFr: 'Cuisine', nameAr: 'المطبخ' } }),
    prisma.category.upsert({ where: { nameFr: 'Lavage' }, update: {}, create: { nameFr: 'Lavage', nameAr: 'الغسيل' } }),
    prisma.category.upsert({ where: { nameFr: 'Froid' }, update: {}, create: { nameFr: 'Froid', nameAr: 'التبريد' } }),
  ]);
  await prisma.siteSettings.upsert({ where: { id: 'aniss-settings' }, update: {}, create: { id: 'aniss-settings', themeColor: '#F59E0B', storeName: 'Aniss Électroménager', logoUrl: '/aniss-logo.png', phone: '+213 000 000 000', adminEmail: 'admin@example.com' } });
  const products: [string, string, string, string, number, string, string][] = [
    ['Réfrigérateur', 'ثلاجة', 'Réfrigérateur familial performant.', 'ثلاجة عملية للعائلة.', 85000, froid.id, '/images/products/IMG_0520.WEBP'],
    ['Lave-linge', 'غسالة', 'Lave-linge pour votre quotidien.', 'غسالة للاستخدام اليومي.', 68000, lavage.id, '/images/products/IMG_0522.JPG'],
    ['Four encastrable', 'فرن مدمج', 'Four moderne pour votre cuisine.', 'فرن حديث لمطبخك.', 54000, cuisine.id, '/images/products/IMG_0523.JPG'],
    ['Petit électroménager', 'أجهزة صغيرة', 'Un appareil utile et fiable pour la maison.', 'جهاز مفيد وموثوق للمنزل.', 12500, cuisine.id, '/images/products/IMG_0514.jpg'],
    ['Appareil de cuisine', 'جهاز مطبخ', 'Équipement pratique pour la cuisine.', 'معدات عملية للمطبخ.', 18000, cuisine.id, '/images/products/IMG_0518.jpg'],
  ];
  for (const [nameFr, nameAr, descriptionFr, descriptionAr, price, categoryId, image] of products) {
    await prisma.product.upsert({ where: { id: `seed-${nameFr}` }, update: {}, create: { id: `seed-${nameFr}`, nameFr, nameAr, descriptionFr, descriptionAr, price, categoryId, image, type: 'GENERAL', isPopular: true } });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
