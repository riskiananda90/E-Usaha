import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4 overflow-x-auto pb-2">
      <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors whitespace-nowrap">
        <Home className="w-4 h-4" />
        <span>Beranda</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 whitespace-nowrap">
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          {item.href && index < items.length - 1 ? (
            <Link 
              to={item.href} 
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};
