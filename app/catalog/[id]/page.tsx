'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuantityInput } from '@/components/ui/quantity-input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

interface ProductVariant {
    id: string;
    nameFr: string;
    nameAr: string;
    priceAdjustment: number;
}

interface Product {
    id: string;
    nameFr: string;
    nameAr: string;
    descriptionFr: string;
    descriptionAr: string;
    price: number;
    type: string;
    category?: { nameFr: string; nameAr?: string | null } | null;
    image: string;
    hasVariants: boolean;
    variants?: ProductVariant[];
    isPinned: boolean;
    ribbonText?: string;
    newUntil?: string;
}

export default function ProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const { t, locale } = useLanguage();
    const { addItem, openCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<string>('base');

    useEffect(() => {
        if (id) {
            fetch(`/api/products?id=${id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.error) {
                        setProduct(data);
                    }
                })
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        const name = locale === 'ar' ? product.nameAr : product.nameFr;
        let variantName = '';
        let finalPrice = product.price;

        if (selectedVariant !== 'base') {
            const variant = product.variants?.find((v) => v.id === selectedVariant);
            if (variant) {
                variantName = locale === 'ar' ? variant.nameAr : variant.nameFr;
                finalPrice = variant.priceAdjustment;
            }
        } else if (locale === 'ar') {
            variantName = 'قياسي'; // Standard
        } else {
            variantName = 'Standard';
        }

        addItem({
            productId: product.id,
            productName: name,
            quantity,
            unitPrice: finalPrice,
            image: product.image,
            variantName: product.hasVariants ? variantName : undefined,
        });

        toast.success(t.products.addToCart);
        setQuantity(1);
        openCart();
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <p>{t.common.loading}</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <p>{t.products.noProducts}</p>
                <Button onClick={() => router.push('/')} className="mt-4">
                    Retour à l'accueil
                </Button>
            </div>
        );
    }

    const name = locale === 'ar' ? product.nameAr : product.nameFr;
    const description = locale === 'ar' ? product.descriptionAr : product.descriptionFr;
    const typeLabel = locale === 'ar' && product.category?.nameAr ? product.category.nameAr : product.category?.nameFr || 'Électroménager';
    const isNew = product.newUntil && new Date(product.newUntil) > new Date();
    const newLabel = locale === 'ar' ? 'جديد' : 'Nouveau';

    // Calculate current price based on variant
    let currentPrice = product.price;
    if (selectedVariant !== 'base') {
        const v = product.variants?.find((varItem) => varItem.id === selectedVariant);
        if (v) currentPrice = v.priceAdjustment;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-6 flex items-center gap-2 text-stone-300 hover:text-[var(--brand-pink)]"
            >
                <ArrowLeft className="h-4 w-4" />
                {t.common.cancel} {/* Using 'Annuler/Cancel' or back text */}
            </Button>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Gallery / Image */}
                <div className="relative h-fit overflow-hidden rounded-2xl border border-[#4b3710] bg-[#f5f2e9] shadow-lg">
                    <img
                        src={product.image}
                        alt={name}
                        className="w-full h-auto object-contain max-h-[500px] bg-gray-50"
                    />
                    <div className="absolute top-4 right-4 bg-[var(--brand-pink)] text-white px-4 py-1.5 rounded-full font-medium shadow-sm">
                        {typeLabel}
                    </div>

                    {/* Promotional Ribbon */}
                    {product.ribbonText && (
                        <div className="absolute top-6 left-0 bg-red-600 text-white px-8 py-1.5 text-base font-bold shadow-md z-10 transform -rotate-45 -translate-x-8">
                            {product.ribbonText}
                        </div>
                    )}

                    {/* New Label */}
                    {isNew && !product.ribbonText && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md z-10 animate-pulse">
                            {newLabel}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold text-[#f8f3e7] md:text-4xl">
                            {name}
                        </h1>
                        <p className="text-3xl font-bold font-mono" style={{ color: 'var(--brand-pink)' }}>
                            {currentPrice.toFixed(0)} DA
                        </p>
                    </div>

                    <div className="prose max-w-none text-stone-300">
                        <p className="whitespace-pre-wrap">{description}</p>
                    </div>

                    <div className="space-y-4 pt-6 border-t">
                        {product.hasVariants && (
                            <div>
                                <Label className="mb-2 block">{t.products.selectVariant}</Label>
                                <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="base">
                                            {locale === 'ar' ? 'قياسي' : 'Standard'} - {product.price.toFixed(0)} DA
                                        </SelectItem>
                                        {product.variants?.map((v) => (
                                            <SelectItem key={v.id} value={v.id}>
                                                {locale === 'ar' ? v.nameAr : v.nameFr} - {v.priceAdjustment.toFixed(0)} DA
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div>
                            <Label className="mb-2 block">{t.products.quantity}</Label>
                            <div className="flex w-fit items-center gap-2 rounded-lg border border-[#3a3320] bg-[#1b1b1b] p-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="h-10 w-10 hover:bg-[#2a220f] hover:shadow-sm"
                                >
                                    -
                                </Button>
                                <QuantityInput
                                    value={quantity}
                                    onChange={(v) => setQuantity(v)}
                                    className="h-10 w-16 text-center border-none bg-transparent focus-visible:ring-0 px-0 text-lg font-bold"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="h-10 w-10 hover:bg-[#2a220f] hover:shadow-sm"
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                onClick={handleAddToCart}
                                className="flex-1 h-12 text-lg cursor-pointer"
                                style={{ backgroundColor: 'var(--brand-pink)' }}
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                {t.products.addToCart}
                            </Button>
                        </div>

                        <p className="mt-4 text-center text-sm text-stone-400">
                            Livraison disponible dans toutes les wilayas
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
