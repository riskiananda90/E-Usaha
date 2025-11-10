import { MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { LazyImage } from "./common/LazyImage";
interface VideoCardProps {
  businessName: string;
  category: string;
  location: string;
  isOpen: boolean;
  thumbnail: string;
  duration?: string;
}
export const VideoCard = ({
  businessName,
  category,
  location,
  isOpen,
  thumbnail,
  duration = "0:15"
}: VideoCardProps) => {
  return <article className="group relative overflow-hidden rounded-2xl bg-card border border-border/30 shadow-lg hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] dark:border-border/20 dark:hover:border-border/40" aria-label={`Video dari ${businessName}, kategori ${category}`}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl">
        <LazyImage src={thumbnail} alt={`Video showcase dari ${businessName} di ${location}`} aspectRatio="9/16" className="group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-primary-foreground px-2.5 py-1 rounded-lg text-xs font-medium shadow-sm" aria-label={`Durasi video ${duration}`}>
          {duration}
        </div>
        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300" aria-label={`Putar video ${businessName}`}>
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 bg-secondary/90 backdrop-blur-sm rounded-lg text-xs font-medium shadow-sm">
              {category}
            </span>
            <span className={`px-2.5 py-1 backdrop-blur-sm rounded-lg text-xs font-medium shadow-sm ${isOpen ? "bg-secondary/90" : "bg-accent/90"}`}>
              {isOpen ? "Buka" : "Tutup"}
            </span>
          </div>
          <h3 className="font-bold text-xl mb-3">{businessName}</h3>
          <Button variant="hero" size="sm" className="w-full" aria-label={`Lihat detail ${businessName}`}>
            Lihat Detail
          </Button>
        </div>
      </div>
    </article>;
};