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

  return <nav className="sticky top-0 z-30 border-b border-[#4b3710] bg-[#080808]/95 text-white backdrop-blur">
    <div className="container mx-auto flex min-h-18 items-center justify-between gap-4 px-4 py-3">
      <Link href="/" className="flex min-w-0 items-center gap-2">
        <img src={settings.logoUrl || '/dz-shopping-logo.svg'} alt={`${settings.storeName} logo`} className="h-12 w-20 shrink-0 object-contain" />
        <span className="max-w-40 text-sm font-extrabold leading-tight tracking-tight text-[#f4c84a] md:max-w-none md:text-base">{settings.storeName}</span>
      </Link>
      <div className="hidden items-center gap-6 text-sm font-semibold text-stone-300 md:flex">
        {links.map(([href, label]) => <Link key={href} href={href} className="transition-colors hover:text-[var(--brand-pink)]">{label}</Link>)}
      </div>
      <div className="hidden items-center gap-3 md:flex">
        <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 rounded-md bg-[#d4a017] px-3 py-2 text-xs font-extrabold text-black transition hover:bg-[#f4c84a]"><Phone className="h-3.5 w-3.5" /> Appelez-nous</a>
        <LanguageSwitcher />
        <button onClick={openCart} className="relative rounded-md p-2 text-[#f4c84a] hover:bg-[#241c0b]" aria-label="Panier"><ShoppingCart className="h-5 w-5" />{itemCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-pink)] text-[10px] font-bold text-black">{itemCount}</span>}</button>
      </div>
      <div className="flex items-center gap-1 text-[#f4c84a] md:hidden"><button onClick={openCart} className="relative rounded-md p-2" aria-label="Panier"><ShoppingCart className="h-5 w-5" />{itemCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--brand-pink)] text-[9px] text-black">{itemCount}</span>}</button><button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-md p-2" aria-label="Menu">{mobileMenuOpen ? <X /> : <Menu />}</button></div>
    </div>
    {mobileMenuOpen && <div className="border-t border-[#4b3710] bg-[#080808] px-4 py-4 md:hidden"><div className="container mx-auto flex flex-col gap-3 font-semibold text-stone-200">{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}>{label}</Link>)}<a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-[var(--brand-pink)]"><Phone className="h-4 w-4" /> Appelez-nous</a></div></div>}
  </nav>;
}
