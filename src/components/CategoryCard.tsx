import { LucideIcon } from "lucide-react";
import { LazyImage } from "./common/LazyImage";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  count: string;
  image?: string;
  onClick?: () => void;
}

export const CategoryCard = ({ icon: Icon, title, count, image, onClick }: CategoryCardProps) => {
  return (
    <article
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl hover:border-border hover:-translate-y-1 transition-all duration-300 cursor-pointer dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)] dark:border-border/30 dark:hover:border-border/60"
      role="button"
      tabIndex={0}
      aria-label={`Kategori ${title} dengan ${count} usaha terdaftar`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" aria-hidden="true" />
      
      {image ? (
        <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden rounded-2xl">
          <LazyImage
            src={image}
            alt={`Gambar kategori ${title} menampilkan contoh usaha populer`}
            aspectRatio="16/9"
            className="group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent group-hover:from-primary transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-primary-foreground">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-all duration-300" aria-hidden="true" />
              <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
            </div>
            <p className="text-xs sm:text-sm opacity-90">{count} usaha</p>
          </div>
          {/* Badge for Popular */}
          <div 
            className="absolute top-2 right-2 px-2 py-0.5 bg-accent/90 backdrop-blur-sm rounded-lg text-[10px] font-semibold text-accent-foreground opacity-0 group-hover:opacity-100 transition-all duration-300"
            aria-label="Kategori populer"
          >
            Popular
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 md:p-6 relative">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-secondary/20 group-hover:scale-110 transition-all duration-300">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" aria-hidden="true" />
          </div>
          <h3 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">{count} usaha</p>
        </div>
      )}
    </article>
  );
};
