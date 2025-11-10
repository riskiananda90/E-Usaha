import { Search, MapPin, Coffee, Store, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  category?: string;
  onReset?: () => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Kuliner: <Coffee className="w-16 h-16 text-muted-foreground/40" />,
  Kos: <Store className="w-16 h-16 text-muted-foreground/40" />,
  Jasa: <Sparkles className="w-16 h-16 text-muted-foreground/40" />,
  Wisata: <MapPin className="w-16 h-16 text-muted-foreground/40" />,
  Toko: <Store className="w-16 h-16 text-muted-foreground/40" />,
  Event: <Sparkles className="w-16 h-16 text-muted-foreground/40" />,
};

export const EmptyState = ({ category = "Semua", onReset }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-12 animate-fade-in">
      {/* Icon */}
      <div className="mb-6 animate-bounce-slow">
        {categoryIcons[category] || <Search className="w-16 h-16 text-muted-foreground/40" />}
      </div>
      
      {/* Illustration using emoji */}
      <div className="text-6xl mb-4 opacity-40">🔍</div>
      
      {/* Message */}
      <div className="text-center max-w-md space-y-3">
        <h3 className="text-xl font-bold text-foreground">
          {category === "Semua" 
            ? "Belum Ada Video" 
            : `Belum Ada Video ${category}`}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {category === "Semua"
            ? "Sepertinya belum ada video yang tersedia saat ini. Coba lagi nanti atau jelajahi kategori lain."
            : `Belum ada video ${category.toLowerCase()} yang tersedia di area ini. Coba kategori lain atau ubah filter pencarian.`}
        </p>
      </div>
      
      {/* Action Button */}
      {onReset && category !== "Semua" && (
        <Button 
          onClick={onReset}
          className="mt-6 gap-2"
          variant="default"
        >
          <Search className="w-4 h-4" />
          Lihat Semua Kategori
        </Button>
      )}
      
      {/* Tips */}
      <div className="mt-8 p-4 rounded-lg bg-muted/50 max-w-md">
        <p className="text-xs text-muted-foreground text-center">
          💡 <span className="font-medium">Tips:</span> Coba filter "Terdekat" untuk menemukan video di sekitar Anda
        </p>
      </div>
    </div>
  );
};
