import { MapPin, TrendingUp, Sparkles } from 'lucide-react';
import { useLocationStore } from '@/stores/useLocationStore';
import heroImage from '@/assets/hero-aceh.jpg';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const DynamicHero = () => {
  const userLocation = useLocationStore((state) => state.userLocation);
  const navigate = useNavigate();
  
  const nearbyCount = 23;
  const cityName = userLocation ? 'Banda Aceh' : 'Aceh';

  const scrollToDiscovery = () => {
    const discoverySection = document.getElementById('discovery-feed');
    if (discoverySection) {
      discoverySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative h-[40vh] sm:h-[50vh] lg:h-[55vh] w-full max-w-full overflow-hidden">
      <div className="absolute inset-0 w-full max-w-full">
        <img 
          src={heroImage} 
          alt="Pemandangan warisan budaya dan alam Aceh yang menampilkan keindahan lokal"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-primary/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
      </div>

      <div className="relative h-full w-full max-w-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center lg:justify-end pb-6 lg:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl w-full space-y-3 sm:space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-background/90 backdrop-blur-xl rounded-full text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            role="status"
            aria-label={`${nearbyCount} usaha baru ditemukan di ${cityName}`}
          >
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" aria-hidden="true" />
            <span className="text-foreground">
              {nearbyCount} usaha baru di {cityName}
            </span>
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" aria-hidden="true" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight"
          >
            Temukan Produk & Usaha{' '}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent" aria-label="Lokal Aceh">
              Lokal Aceh
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-background/95 font-medium max-w-2xl"
          >
            Cari kuliner, kos, jasa, wisata terbaik & dapatkan reward disetiap aktivitas
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3 pt-2"
          >
            <Button 
              onClick={scrollToDiscovery}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-background font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-label="Mulai menjelajahi usaha lokal di sekitar Anda"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" aria-hidden="true" />
              Mulai Jelajah
            </Button>
            <Button 
              onClick={() => navigate('/explore')}
              size="lg"
              variant="outline"
              className="bg-background/90 hover:bg-background border-2 border-background/20 backdrop-blur-sm font-semibold shadow-lg hover:shadow-xl transition-all"
              aria-label="Lihat semua kategori usaha"
            >
              Lihat Semua
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
