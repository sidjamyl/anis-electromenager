'use client';

import { useLanguage } from '@/lib/language-context';
import { HeroSlider } from '@/components/hero-slider';
import { ProductCard } from '@/components/product-card';
import { ReviewsSlider } from '@/components/reviews-slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

// Configuration des slides hero (images statiques)
// Pour ajouter une nouvelle image, ajoutez-la dans le dossier public/ et ajoutez une entrée ici
const HERO_SLIDES = [
  {
    id: '1',
    image: '/aniss-hero-v2.png',
    titleFr: 'Tout ce dont vous avez besoin, au même endroit.',
    titleAr: 'كل ما تحتاجه لمنزلك في مكان واحد',
    subtitleFr: 'Électroménager, cuisine et maison : commandez simplement.',
    subtitleAr: 'منتجات مختارة للمنزل والمطبخ، بطلب بسيط.',
  },
  { id: '2', image: '/aniss-kitchen-v2.png', titleFr: 'Cuisine, froid, lavage : tout pour s’équiper.', titleAr: 'للمطبخ والتنظيف والبيت', subtitleFr: 'Découvrez notre sélection électroménager.', subtitleAr: 'تصفّح تشكيلتنا واختر ما يناسبك.' },
];

export default function Home() {
  const { t } = useLanguage();
  const [popularProducts, setPopularProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    // Fetch popular products
    fetch('/api/products?popular=true')
      .then((res) => res.json())
      .then((data) => {
        setPopularProducts(data);
        setFilteredProducts(data);
      })
      .catch(() => {
        setPopularProducts([]);
        setFilteredProducts([]);
      });

    // Fetch reviews
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => setReviews([]));
    fetch('/api/categories').then((res) => res.json()).then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...popularProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product: any) =>
        product.nameFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameAr.includes(searchQuery) ||
        product.descriptionFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.descriptionAr.includes(searchQuery)
      );
    }

    // Type filter
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter((product: any) => product.categoryId === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [popularProducts, searchQuery, selectedCategory]);

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider slides={HERO_SLIDES} />

      {/* Popular Products */}
      <section className="container mx-auto px-4 py-16">
        <p className="mb-2 text-center text-xs font-extrabold uppercase tracking-[0.18em] text-[#f4c84a]">Notre sélection</p>
        <h2 className="mb-8 text-center text-3xl font-extrabold text-[#f8f3e7]">
          {t.products.popular}
        </h2>

        {/* Filters */}
        <div className="mb-8 space-y-4 max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder={t.products.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCategory === 'ALL' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('ALL')}
              style={selectedCategory === 'ALL' ? { backgroundColor: 'var(--brand-pink)', color: 'black' } : {}}
              className="hover:bg-[var(--brand-pink)] hover:text-black transition-colors"
            >
              {t.products.allProducts}
            </Button>
            {categories.map((category) => <Button key={category.id} variant={selectedCategory === category.id ? 'default' : 'outline'} onClick={() => setSelectedCategory(category.id)} style={selectedCategory === category.id ? { backgroundColor: 'var(--brand-pink)', color: 'black' } : {}} className="hover:bg-[var(--brand-pink)] hover:text-black transition-colors">{category.nameFr}</Button>)}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">{t.products.noProducts}</p>
        )}
      </section>

      {/* Reviews Slider */}
      {reviews.length > 0 && <ReviewsSlider reviews={reviews} />}
    </>
  );
}
