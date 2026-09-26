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
      <div className="relative h-[60vh] bg-gradient-to-r from-[#082b5b] to-[#2b0aa8] flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.hero.title}</h1>
          <p className="text-xl md:text-2xl mb-8">{t.hero.subtitle}</p>
          <Button size="lg" className="bg-white text-[#383738] hover:bg-gray-100">
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
    <div className="relative h-[min(620px,65vh)] overflow-hidden bg-[#f3f1ff]">
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
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-10 z-10">
          <div className="max-w-xl">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#2b0aa8]">Aniss Électroménager</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.04] tracking-tight text-[#082b5b] mb-5">{title}</h1>
          {subtitle && <p className="max-w-md text-base text-[#52647d] md:text-xl mb-8">{subtitle}</p>}
          <Button
            size="lg"
            className="rounded-lg bg-[#2b0aa8] px-6 text-white hover:bg-[#220886]"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 border border-[#dbe2eb] bg-white/90 hover:bg-white p-2 rounded-lg z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" style={{ color: '#082b5b' }} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 border border-[#dbe2eb] bg-white/90 hover:bg-white p-2 rounded-lg z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" style={{ color: '#082b5b' }} />
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
                  ? 'bg-[#2b0aa8] w-8'
                  : 'bg-[#bdb7df] hover:bg-[#8d82c9]'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
