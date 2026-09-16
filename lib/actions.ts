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
                    themeColor: '#F59E0B',
                    storeName: 'Aniss Électroménager',
                    logoUrl: '/aniss-logo.png',
                    phone: '+213 000 000 000',
                    adminEmail: 'admin@example.com',
                },
            });
        }
        return settings;
    } catch (error) {
        console.error('Error fetching site settings:', error);
        return { themeColor: '#F59E0B', storeName: 'Aniss Électroménager', logoUrl: '/aniss-logo.png', phone: '+213 000 000 000', adminEmail: 'admin@example.com' };
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
