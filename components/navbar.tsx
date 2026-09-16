'use client';

import Link from 'next/link';
import { Menu, Phone, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { useCart } from '@/lib/cart-context';
import { LanguageSwitcher } from './language-switcher';

type Settings = { storeName: string; logoUrl: string; phone: string };

export function Navbar({ settings }: { settings: Settings }) {
  const { t } = useLanguage();
  const { items, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const links = [['/', t.nav.home], ['/catalog', t.nav.catalog], ['/about', t.nav.about], ['/contact', t.nav.contact]];

  return <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div className="container mx-auto flex min-h-18 items-center justify-between gap-4 px-4 py-3">
      <Link href="/" className="flex min-w-0 items-center gap-2">
        <img src={settings.logoUrl || '/aniss-logo.png'} alt={`${settings.storeName} logo`} className="h-11 w-11 shrink-0 object-contain" />
        <span className="max-w-40 text-sm font-extrabold leading-tight tracking-tight text-slate-900 md:max-w-none md:text-base">{settings.storeName}</span>
      </Link>
      <div className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
        {links.map(([href, label]) => <Link key={href} href={href} className="transition-colors hover:text-[var(--brand-pink)]">{label}</Link>)}
      </div>
      <div className="hidden items-center gap-3 md:flex">
        <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-700"><Phone className="h-3.5 w-3.5" /> Appelez-nous</a>
        <LanguageSwitcher />
        <button onClick={openCart} className="relative rounded-full p-2 text-slate-800 hover:bg-amber-50" aria-label="Panier"><ShoppingCart className="h-5 w-5" />{itemCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-pink)] text-[10px] font-bold text-white">{itemCount}</span>}</button>
      </div>
      <div className="flex items-center gap-1 md:hidden"><button onClick={openCart} className="relative rounded-full p-2" aria-label="Panier"><ShoppingCart className="h-5 w-5" />{itemCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--brand-pink)] text-[9px] text-white">{itemCount}</span>}</button><button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg p-2" aria-label="Menu">{mobileMenuOpen ? <X /> : <Menu />}</button></div>
    </div>
    {mobileMenuOpen && <div className="border-t bg-white px-4 py-4 md:hidden"><div className="container mx-auto flex flex-col gap-3 font-semibold text-slate-700">{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}>{label}</Link>)}<a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-[var(--brand-pink)]"><Phone className="h-4 w-4" /> Appelez-nous</a></div></div>}
  </nav>;
}
