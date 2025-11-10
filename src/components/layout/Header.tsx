import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  showBack?: boolean;
  title?: string;
  showSearch?: boolean;
  actions?: React.ReactNode;
}

export const Header = ({ showBack, title, showSearch = true, actions }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {showBack && (
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            )}
            {title ? (
              <h1 className="text-base sm:text-xl font-bold text-foreground truncate">{title}</h1>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0" onClick={() => navigate("/")}>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-2xl font-bold text-primary truncate">Meukat</h1>
                  <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Banda Aceh & Lhokseumawe</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {actions}
            <ThemeToggle />
            {showSearch && !title && (
              <Button variant="ghost" size="icon" onClick={() => navigate("/search")} className="h-8 w-8 sm:h-10 sm:w-10">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
