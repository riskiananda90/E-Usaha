import { Badge } from "@/components/ui/badge";
import { TrendingUp, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialProofBadgeProps {
  type: "trending" | "views";
  value?: number;
  className?: string;
}

export const SocialProofBadge = ({ type, value, className }: SocialProofBadgeProps) => {
  if (type === "trending") {
    return (
      <Badge className={cn("flex items-center gap-1 text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0", className)}>
        <TrendingUp className="w-3 h-3" />
        <span>TRENDING</span>
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className={cn("flex items-center gap-1 text-xs", className)}>
      <Eye className="w-3 h-3" />
      <span>{value ? `${(value / 1000).toFixed(1)}k views` : "0 views"}</span>
    </Badge>
  );
};
