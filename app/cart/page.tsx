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
  const [info, setInfo] = useState({ name: '', phone: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subtotal = getSubtotal();
  const canCheckout = !!(items.length && info.name.trim() && info.phone.trim() && info.address.trim());
  const copy = locale === 'ar' ? { empty: 'سلة التسوق فارغة', browse: 'تصفّح المنتجات', title: 'أكمل طلبك', details: 'بيانات التوصيل', name: 'الاسم الكامل', phone: 'رقم الهاتف', address: 'العنوان الكامل', placeholder: 'الولاية، البلدية، الحي…', total: 'الإجمالي', note: 'سنتواصل معك هاتفيًا لتأكيد التوصيل.', send: 'أرسل الطلب', sending: 'جارٍ الإرسال…', required: 'أدخل الاسم ورقم الهاتف والعنوان.' } : { empty: 'Votre panier est vide', browse: 'Voir le catalogue', title: 'Votre commande', details: 'Vos coordonnées', name: 'Nom complet', phone: 'Téléphone', address: 'Adresse complète', placeholder: 'Wilaya, commune, quartier…', total: 'Total', note: 'Les modalités de livraison seront confirmées par téléphone.', send: 'Envoyer ma commande', sending: 'Envoi…', required: 'Indiquez votre nom, téléphone et adresse.' };

  const checkout = async () => {
    if (!canCheckout) return toast.error(copy.required);
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customerName: info.name, customerPhone: info.phone, address: info.address, items }) });
      if (!response.ok) throw new Error();
      clearCart();
      toast.success(locale === 'ar' ? 'تم إرسال طلبك. سنتواصل معك قريبًا لتأكيده.' : 'Commande envoyée. Nous vous contacterons bientôt.');
      router.push('/');
    } catch { toast.error(t.common.error); } finally { setIsSubmitting(false); }
  };

  if (!items.length) return <div className="container mx-auto px-4 py-20 text-center"><ShoppingCart className="mx-auto mb-4 h-16 w-16 text-slate-300" /><h1 className="text-2xl font-bold">{copy.empty}</h1><Button className="mt-6" onClick={() => router.push('/catalog')} style={{ backgroundColor: 'var(--brand-pink)' }}>{copy.browse}</Button></div>;

  return <div className="container mx-auto px-4 py-10"><h1 className="mb-8 text-3xl font-extrabold text-[#f8f3e7]">{copy.title}</h1><div className="grid gap-8 lg:grid-cols-3"><div className="space-y-3 lg:col-span-2">{items.map((item) => <Card key={`${item.productId}-${item.variantName || ''}`}><CardContent className="flex gap-4 p-4"><img src={item.image} alt={item.productName} className="h-20 w-20 rounded-lg object-cover" /><div className="flex-1"><p className="font-bold">{item.productName}</p>{item.variantName && <p className="text-sm text-slate-500">{item.variantName}</p>}<p className="mt-1 font-bold text-[var(--brand-pink)]">{item.unitPrice.toFixed(0)} DA</p></div><div className="flex flex-col items-end gap-2"><button onClick={() => removeItem(item.productId, item.variantName)} aria-label="Supprimer"><Trash2 className="h-4 w-4 text-slate-400" /></button><QuantityInput value={item.quantity} onChange={(value) => updateQuantity(item.productId, value, item.variantName)} className="w-20" /></div></CardContent></Card>)}</div><div className="space-y-4"><Card><CardHeader><CardTitle>{copy.details}</CardTitle></CardHeader><CardContent className="space-y-4"><div><Label>{copy.name} *</Label><Input value={info.name} onChange={(event) => setInfo({ ...info, name: event.target.value })} className="mt-1" /></div><div><Label>{copy.phone} *</Label><Input type="tel" value={info.phone} onChange={(event) => setInfo({ ...info, phone: event.target.value })} className="mt-1" /></div><div><Label>{copy.address} *</Label><Textarea value={info.address} onChange={(event) => setInfo({ ...info, address: event.target.value })} className="mt-1" placeholder={copy.placeholder} /></div></CardContent></Card><Card><CardContent className="p-5"><div className="flex justify-between text-lg font-extrabold"><span>{copy.total}</span><span>{subtotal.toFixed(0)} DA</span></div><p className="mt-2 text-xs text-stone-400">{copy.note}</p><Button onClick={checkout} disabled={!canCheckout || isSubmitting} className="mt-5 w-full" style={{ backgroundColor: 'var(--brand-pink)' }}>{isSubmitting ? copy.sending : copy.send}</Button></CardContent></Card></div></div></div>;
}
