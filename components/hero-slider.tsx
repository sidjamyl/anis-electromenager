'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  image: string;
  titleFr: string;
  titleAr: string;
  subtitleFr?: string;
  subtitleAr?: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

export function HeroSlider({ slides, autoPlayInterval = 8000 }: HeroSliderProps) {
  const { locale, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return (
      <div className="relative h-[60vh] bg-gradient-to-r from-black to-[#2c2008] flex items-center justify-center">
        <div className="px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.hero.title}</h1>
          <p className="text-xl md:text-2xl mb-8">{t.hero.subtitle}</p>
          <Button size="lg" className="bg-[#d4a017] font-extrabold text-black hover:bg-[#f4c84a]">
            {t.hero.viewCatalog}
          </Button>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];
  const title = locale === 'ar' ? slide.titleAr : slide.titleFr;
  const subtitle = locale === 'ar' ? slide.subtitleAr : slide.subtitleFr;

  return (
    <div className="relative h-[min(620px,65vh)] overflow-hidden border-b border-[#624a15] bg-[#060606]">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={s.image}
              alt={locale === 'ar' ? s.titleAr : s.titleFr}
              fill
              className="object-cover opacity-65 grayscale sepia-[.35] contrast-125"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_48%,rgba(244,200,74,.28),transparent_22rem),linear-gradient(90deg,#050505_0%,#050505_46%,rgba(5,5,5,.68)_69%,rgba(5,5,5,.2)_100%)]" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-10 z-10">
          <div className="max-w-xl">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#f4c84a]">DZ Shopping</p>
          <h1 className="mb-5 text-4xl font-extrabold leading-[1.04] tracking-tight text-white md:text-6xl">{title}</h1>
          {subtitle && <p className="mb-8 max-w-md text-base text-stone-300 md:text-xl">{subtitle}</p>}
          <Button
            size="lg"
            className="rounded-md bg-[#d4a017] px-6 font-extrabold text-black hover:bg-[#f4c84a]"
            onClick={() => window.location.href = '/catalog'}
          >
            {t.hero.viewCatalog}
          </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-md border border-[#735718] bg-black/70 p-2 hover:bg-[#241c0b]"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-[#f4c84a]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-md border border-[#735718] bg-black/70 p-2 hover:bg-[#241c0b]"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-[#f4c84a]" />
          </button>
        </>
      )}

      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-all ${index === currentSlide
                  ? 'bg-[#d4a017] w-8'
                  : 'bg-stone-600 hover:bg-[#f4c84a]'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
