import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative group overflow-hidden hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {/* Ripple effect */}
      {isAnimating && (
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-[ripple_0.6s_ease-out]" />
      )}
      
      {/* Sun icon */}
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 ease-out dark:-rotate-90 dark:scale-0 text-accent group-hover:text-primary" />
      
      {/* Moon icon */}
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 ease-out dark:rotate-0 dark:scale-100 text-primary group-hover:text-primary-glow" />
      
      {/* Subtle glow effect */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0" />
    </Button>
  );
};
