'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getSiteSettings() {
    try {
        const settings = await (prisma as any).siteSettings.findFirst();
        if (!settings) {
            // Create default settings if not exists
            return await (prisma as any).siteSettings.create({
                data: {
                    themeColor: '#D4A017',
                    storeName: 'DZ Shopping',
                    logoUrl: '/dz-shopping-logo.svg',
                    phone: '+213 000 000 000',
                    adminEmail: 'admin@example.com',
                },
            });
        }
        if (settings.storeName === 'Aniss Électroménager') return await (prisma as any).siteSettings.update({ where: { id: settings.id }, data: { themeColor: '#D4A017', storeName: 'DZ Shopping', logoUrl: '/dz-shopping-logo.svg' } });
        return settings;
    } catch (error) {
        console.error('Error fetching site settings:', error);
        return { themeColor: '#D4A017', storeName: 'DZ Shopping', logoUrl: '/dz-shopping-logo.svg', phone: '+213 000 000 000', adminEmail: 'admin@example.com' };
    }
}

export async function updateSiteSettings(data: { themeColor: string; storeName: string; logoUrl: string; phone: string; adminEmail: string }) {
    try {
        const first = await (prisma as any).siteSettings.findFirst();

        if (first) {
            await (prisma as any).siteSettings.update({
                where: { id: first.id },
                data,
            });
        } else {
            await (prisma as any).siteSettings.create({
                data,
            });
        }

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error updating site settings:', error);
        return { success: false, error: 'Failed to update settings' };
    }
}
