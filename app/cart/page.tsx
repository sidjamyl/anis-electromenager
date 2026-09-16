'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { QuantityInput } from '@/components/ui/quantity-input';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } = useCart();
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [info, setInfo] = useState({ name: '', phone: '', email: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subtotal = getSubtotal();
  const canCheckout = !!(items.length && info.name.trim() && info.phone.trim() && info.address.trim());

  const checkout = async () => {
    if (!canCheckout) return toast.error('Indiquez votre nom, téléphone et adresse.');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customerName: info.name, customerPhone: info.phone, customerEmail: info.email, address: info.address, items }) });
      if (!response.ok) throw new Error();
      clearCart();
      toast.success(locale === 'ar' ? 'تم إرسال طلبك بنجاح!' : 'Commande envoyée. Nous vous contacterons bientôt.');
      router.push('/');
    } catch { toast.error(t.common.error); } finally { setIsSubmitting(false); }
  };

  if (!items.length) return <div className="container mx-auto px-4 py-20 text-center"><ShoppingCart className="mx-auto mb-4 h-16 w-16 text-slate-300" /><h1 className="text-2xl font-bold">Votre panier est vide</h1><Button className="mt-6" onClick={() => router.push('/catalog')} style={{ backgroundColor: 'var(--brand-pink)' }}>Voir le catalogue</Button></div>;

  return <div className="container mx-auto px-4 py-10"><h1 className="mb-8 text-3xl font-extrabold text-slate-900">Votre commande</h1><div className="grid gap-8 lg:grid-cols-3"><div className="space-y-3 lg:col-span-2">{items.map((item) => <Card key={`${item.productId}-${item.variantName || ''}`}><CardContent className="flex gap-4 p-4"><img src={item.image} alt={item.productName} className="h-20 w-20 rounded-lg object-cover" /><div className="flex-1"><p className="font-bold">{item.productName}</p>{item.variantName && <p className="text-sm text-slate-500">{item.variantName}</p>}<p className="mt-1 font-bold text-[var(--brand-pink)]">{item.unitPrice.toFixed(0)} DA</p></div><div className="flex flex-col items-end gap-2"><button onClick={() => removeItem(item.productId, item.variantName)} aria-label="Supprimer"><Trash2 className="h-4 w-4 text-slate-400" /></button><QuantityInput value={item.quantity} onChange={(value) => updateQuantity(item.productId, value, item.variantName)} className="w-20" /></div></CardContent></Card>)}</div><div className="space-y-4"><Card><CardHeader><CardTitle>Vos coordonnées</CardTitle></CardHeader><CardContent className="space-y-4"><div><Label>Nom complet *</Label><Input value={info.name} onChange={(event) => setInfo({ ...info, name: event.target.value })} className="mt-1" /></div><div><Label>Téléphone *</Label><Input type="tel" value={info.phone} onChange={(event) => setInfo({ ...info, phone: event.target.value })} className="mt-1" /></div><div><Label>E-mail</Label><Input type="email" value={info.email} onChange={(event) => setInfo({ ...info, email: event.target.value })} className="mt-1" /></div><div><Label>Adresse complète *</Label><Textarea value={info.address} onChange={(event) => setInfo({ ...info, address: event.target.value })} className="mt-1" placeholder="Wilaya, commune, quartier…" /></div></CardContent></Card><Card><CardContent className="p-5"><div className="flex justify-between text-lg font-extrabold"><span>Total</span><span>{subtotal.toFixed(0)} DA</span></div><p className="mt-2 text-xs text-slate-500">Les modalités de livraison seront confirmées par téléphone.</p><Button onClick={checkout} disabled={!canCheckout || isSubmitting} className="mt-5 w-full" style={{ backgroundColor: 'var(--brand-pink)' }}>{isSubmitting ? 'Envoi…' : 'Envoyer ma commande'}</Button></CardContent></Card></div></div></div>;
}
