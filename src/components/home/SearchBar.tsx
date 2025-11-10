import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate();

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div 
        className="relative w-full cursor-pointer"
        onClick={() => navigate("/search")}
      >
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
        <Input
          placeholder="Cari produk, toko, atau kategori..."
          className="pl-10 sm:pl-12 pr-4 h-11 sm:h-12 bg-card/95 backdrop-blur-md border-border shadow-lg hover:shadow-xl focus:shadow-2xl focus:shadow-primary/20 transition-all duration-300 text-sm sm:text-base pointer-events-none rounded-2xl"
          readOnly
        />
      </div>
    </div>
  );
};