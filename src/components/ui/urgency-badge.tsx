import { Badge } from "@/components/ui/badge";
import { Clock, Users, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface UrgencyBadgeProps {
  type: "stock" | "buyers" | "hot";
  value?: number;
  className?: string;
}

export const UrgencyBadge = ({ type, value, className }: UrgencyBadgeProps) => {
  const configs = {
    stock: {
      icon: Clock,
      text: value ? `Tinggal ${value} tiket` : "Hampir habis",
      className: "bg-destructive/90 text-destructive-foreground border-0 animate-pulse",
    },
    buyers: {
      icon: Users,
      text: value ? `${value} orang baru beli` : "Populer",
      className: "bg-secondary/90 text-secondary-foreground border-0",
    },
    hot: {
      icon: Flame,
      text: "HOT",
      className: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse",
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <Badge className={cn("flex items-center gap-1 text-xs font-semibold shadow-sm", config.className, className)}>
      <Icon className="w-3 h-3" />
      <span>{config.text}</span>
    </Badge>
  );
};
