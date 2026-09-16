'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';

type Settings = { storeName: string; phone: string };

export function Footer({ settings }: { settings: Settings }) {
  return <footer className="mt-16 bg-slate-950 text-slate-300">
    <div className="container mx-auto flex flex-col gap-6 px-4 py-10 md:flex-row md:items-end md:justify-between"><div><p className="text-lg font-extrabold text-white">{settings.storeName}</p><p className="mt-2 max-w-md text-sm">L’électroménager utile, fiable et adapté à votre maison.</p></div><div className="flex flex-col gap-3 text-sm md:items-end"><a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 font-bold text-white"><Phone className="h-4 w-4 text-[var(--brand-pink)]" /> {settings.phone}</a><div className="flex gap-4"><Link href="/catalog">Catalogue</Link><Link href="/contact">Contact</Link><Link href="/admin">Administration</Link></div></div></div>
    <div className="border-t border-slate-800 px-4 py-4 text-center text-xs">© {new Date().getFullYear()} {settings.storeName}</div>
  </footer>;
}
