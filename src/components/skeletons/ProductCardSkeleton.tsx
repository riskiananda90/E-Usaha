import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <Skeleton className="aspect-square w-full" />
      
      <div className="p-3 sm:p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12 rounded-lg" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>

        <div className="pt-1 border-t border-border/50">
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </Card>
  );
};
