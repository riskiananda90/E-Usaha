import { Home, Search, Calendar, User, Play } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  highlight?: boolean;
}

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isBusinessOwner, user } = useAuthStore();

  // 5-item navigation with video center
  const navItems: NavItem[] = [
    { icon: Home, label: "Beranda", path: "/" },
    { icon: Search, label: "Jelajah", path: "/explore" },
    { icon: Play, label: "Video", path: "/reels", highlight: true },
    { icon: Calendar, label: "Booking", path: "/my-bookings" },
    { icon: User, label: "Profil", path: "/profile" },
  ];

  return (
    <nav className="fixed -bottom-6 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border shadow-2xl safe-area-bottom md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl transition-all duration-300 touch-target group ${
                item.highlight
                  ? isActive
                    ? "text-white"
                    : "text-white/90 hover:text-white active:scale-95"
                  : isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground active:scale-95"
              } ${item.highlight ? "scale-110" : ""}`}
            >
              {/* Active indicator bar */}
              <div 
                className={`absolute -top-3 left-1/2 -translate-x-1/2 h-1 rounded-full bg-primary transition-all duration-300  ${
                  isActive ? "w-8 opacity-100" : "w-0 opacity-0"
                }`}
              />
              
              {/* Icon with enhanced animation and badge */}
              <div className={`relative ${item.highlight ? "w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-lg" : ""}`}>
                <Icon 
                  className={`transition-all duration-300 ${
                    item.highlight 
                      ? "w-6 h-6" 
                      : "w-5 h-5"
                  } ${
                    isActive && !item.highlight
                      ? "scale-110 drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" 
                      : "group-hover:scale-105"
                  }`} 
                  fill={item.highlight ? "currentColor" : "none"}
                />
              </div>
              
              {/* Label */}
              <span 
                className={`text-[10px] transition-all duration-300 ${
                  isActive 
                    ? "font-bold opacity-100" 
                    : "font-medium opacity-70 group-hover:opacity-100"
                }`}
              >
                {item.label}
              </span>

              {/* Subtle background glow for active */}
              {isActive && !item.highlight && (
                <div className="absolute inset-0 bg-primary/5 rounded-xl -z-10" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
