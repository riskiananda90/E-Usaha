import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export const DiscoveryFeedSkeleton = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((section) => (
        <div key={section} className="w-full max-w-full overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-8 h-8 rounded-xl" />
            <Skeleton className="h-6 w-40" />
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((card) => (
              <div key={card} className="flex-shrink-0 w-[200px] sm:w-[240px]">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
