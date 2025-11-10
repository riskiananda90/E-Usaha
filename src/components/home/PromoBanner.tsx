import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LazyImage } from '@/components/common/LazyImage';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface BannerSlide {
  id: string;
  image: string;
  title: string;
  link?: string;
}

// Mock banner data - nanti bisa dari API/CMS
const mockBanners: BannerSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=400&fit=crop',
    title: 'Promo Kuliner Aceh - Diskon 20%',
    link: '/category/kuliner'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=400&fit=crop',
    title: 'Wisata Aceh - Paket Hemat',
    link: '/category/wisata'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=400&fit=crop',
    title: 'UMKM Terbaik Bulan Ini',
    link: '/explore'
  }
];

export const PromoBanner = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockBanners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); 
  };

  const goToPrevious = () => {
    goToSlide(currentSlide === 0 ? mockBanners.length - 1 : currentSlide - 1);
  };

  const goToNext = () => {
    goToSlide((currentSlide + 1) % mockBanners.length);
  };

  const handleBannerClick = (link?: string) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <section 
      className="w-full max-w-full overflow-hidden"
      aria-label="Banner promosi dan iklan"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group rounded-2xl overflow-hidden shadow-lg">
          <div 
            className="relative h-44 sm:h-44 md:h-52 lg:h-72 overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {mockBanners.map((banner, index) => (
              <div
                key={banner.id}
                className={cn(
                  "absolute inset-0 transition-all duration-500 ease-in-out cursor-pointer",
                  index === currentSlide 
                    ? "opacity-100 translate-x-0" 
                    : index < currentSlide
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                )}
                onClick={() => handleBannerClick(banner.link)}
                role="button"
                tabIndex={index === currentSlide ? 0 : -1}
                aria-label={banner.title}
              >
                <LazyImage
                  src={banner.image}
                  alt={banner.title}
                  aspectRatio="21/10"
                  className="hover:scale-105 transition-transform duration-700"
                />
                
              </div>
            ))}
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
            aria-label="Banner sebelumnya"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" aria-hidden="true" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
            aria-label="Banner selanjutnya"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" aria-hidden="true" />
          </button>

          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
            {mockBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === currentSlide 
                    ? "w-6 sm:w-8 bg-background shadow-lg" 
                    : "w-1.5 bg-background/50 hover:bg-background/70"
                )}
                aria-label={`Ke banner ${index + 1}`}
                aria-current={index === currentSlide}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
