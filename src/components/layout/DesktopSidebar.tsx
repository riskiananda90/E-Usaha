import { Home, Search, PlusCircle, Heart, User,  Download, Receipt, Ticket, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";

export const DesktopSidebar = () => {
  const { isBusinessOwner, isAuthenticated } = useAuthStore();

  const mainLinks: Array<{
    icon: any;
    label: string;
    path: string;
    highlight?: boolean;
    badge?: string;
  }> = [
    { icon: Home, label: "Beranda", path: "/" },
    { icon: Search, label: "Jelajah", path: "/explore" },
    ...(isBusinessOwner() ? [{ icon: PlusCircle, label: "Upload", path: "/upload", highlight: true }] : []),
    { icon: Heart, label: "Favorit", path: "/bookmarks" },
    { icon: Ticket, label: "Tiket Saya", path: "/my-tickets" },
    { icon: Receipt, label: "Transaksi", path: "/transactions" },
    { icon: ShoppingCart, label: "Keranjang", path: "/cart" },
    { icon: Download, label: "Install App", path: "/install", badge: "PWA" },
    { icon: User, label: "Profil", path: "/profile" },
  ];
  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bottom-0 bg-card border-r border-border z-40 transition-colors duration-300">
      <div className="p-4 border-b border-border">  
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary  flex items-center justify-center transition-all duration-300">
              <span className="text-foreground font-bold text-lg">RA</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">Rizki Ananda</h1>
              <p className="text-xs text-muted-foreground">Peuniti, Banda aceh  </p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">MENU UTAMA</p>
          {mainLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-secondary text-secondary-foreground font-medium shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  link.highlight && "text-secondary font-semibold"
                )
              }
              >
                <link.icon className="w-5 h-5" />
                <span className="flex-1">{link.label}</span>
              </NavLink>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">MENU LAIN</p>

        </div>
      </nav>

      <div className="p-4 border-t border-border">
        {isBusinessOwner() ? (
          <NavLink
            to="/dashboard"
            className="block w-full text-center bg-gradient-to-br from-secondary to-secondary/80 hover:opacity-90 transition-opacity rounded-xl py-3 text-sm font-medium text-secondary-foreground"
          >
            Dashboard Owner
          </NavLink>
        ) : (
          <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-xl p-4 text-secondary-foreground">
            <p className="text-xs font-semibold mb-1">Punya Usaha?</p>
            <p className="text-[10px] opacity-90 mb-3">Promosikan gratis sekarang!</p>
            <NavLink
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="block w-full text-center bg-secondary-foreground/20 hover:bg-secondary-foreground/30 transition-colors rounded-lg py-2 text-xs font-medium backdrop-blur-sm"
            >
              {isAuthenticated ? "Upgrade ke Owner" : "Daftar Sekarang"}
            </NavLink>
          </div>
        )}
      </div>
    </aside>
  );
};
