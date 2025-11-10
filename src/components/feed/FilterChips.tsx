import { UtensilsCrossed, Home, Wrench, Palmtree, Store, Calendar, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type FilterCategory = 'Semua' | 'Kuliner' | 'Kos' | 'Jasa' | 'Wisata' | 'Toko' | 'Event' | 'Terdekat';

interface FilterChipsProps {
  selectedCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
  counts?: Record<FilterCategory, number>;
}

const categories: Array<{
  value: FilterCategory;
  label: string;
  icon: typeof UtensilsCrossed;
  color: string;
}> = [
  { value: 'Semua', label: 'Semua', icon: Sparkles, color: 'bg-secondary text-secondary-foreground' },
  { value: 'Kuliner', label: 'Kuliner', icon: UtensilsCrossed, color: 'bg-accent text-accent-foreground' },
  { value: 'Kos', label: 'Kos', icon: Home, color: 'bg-primary text-primary-foreground' },
  { value: 'Wisata', label: 'Wisata', icon: Palmtree, color: 'bg-[hsl(210,80%,50%)] text-white' },
  { value: 'Jasa', label: 'Jasa', icon: Wrench, color: 'bg-[hsl(30,90%,55%)] text-white' },
  { value: 'Toko', label: 'Toko', icon: Store, color: 'bg-[hsl(270,60%,55%)] text-white' },
  { value: 'Event', label: 'Event', icon: Calendar, color: 'bg-[hsl(340,70%,55%)] text-white' },
  { value: 'Terdekat', label: 'Terdekat', icon: MapPin, color: 'bg-[hsl(140,70%,45%)] text-white' },
];

export const FilterChips = ({ selectedCategory, onCategoryChange, counts }: FilterChipsProps) => {
  return (
    <div className="w-full py-2 ">
      <div className="overflow-x-auto hide-scrollbar   ">
        <div className="flex gap-2 px-4 min-w-max md:gap-2.5 md:px-6 lg:gap-3 lg:px-8 items-center justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.value;
            const count = counts?.[category.value];
            
            return (
              <button
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                  transition-all duration-200 whitespace-nowrap active:scale-95
                  md:gap-2 md:px-4 md:py-2 md:text-sm lg:text-base lg:px-5 lg:py-2.5
                  ${isActive 
                    ? category.color + ' shadow-lg scale-105 my-1' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-[1.02]'
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>{category.label}</span>
                {count !== undefined && count > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="ml-0.5 px-1 py-0 text-[8px] h-3.5 min-w-3.5"
                  >
                    {count}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
