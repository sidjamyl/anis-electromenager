'use client';

import { useRouter } from 'next/navigation';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const { items, removeItem, getSubtotal, isCartOpen, closeCart } = useCart();
  const router = useRouter();
  const goToCart = () => { closeCart(); router.push('/cart'); };
  return <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}><SheetContent className="flex w-[88%] max-w-md flex-col"><SheetHeader><SheetTitle className="flex items-center gap-2"><ShoppingCart className="h-5 w-5" /> Panier</SheetTitle></SheetHeader><div className="flex-1 space-y-3 overflow-y-auto py-5">{items.length ? items.map((item) => <div className="flex gap-3" key={`${item.productId}-${item.variantName || ''}`}><img src={item.image} alt="" className="h-14 w-14 rounded object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{item.productName}</p><p className="text-sm text-slate-500">{item.quantity} × {item.unitPrice.toFixed(0)} DA</p></div><button onClick={() => removeItem(item.productId, item.variantName)} aria-label="Supprimer"><Trash2 className="h-4 w-4 text-slate-400" /></button></div>) : <p className="text-sm text-slate-500">Votre panier est vide.</p>}</div>{items.length > 0 && <div className="border-t pt-4"><p className="mb-4 flex justify-between font-extrabold"><span>Total</span><span>{getSubtotal().toFixed(0)} DA</span></p><Button className="w-full" onClick={goToCart} style={{ backgroundColor: 'var(--brand-pink)' }}>Finaliser la commande</Button></div>}</SheetContent></Sheet>;
}
