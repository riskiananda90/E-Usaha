import { Skeleton } from "@/components/ui/skeleton";

export const CategoryCardSkeleton = () => {
  return (
    <div className="flex-shrink-0 w-[140px] sm:w-[160px] rounded-2xl bg-card border border-border/50 shadow-sm p-4">
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl" />
        
        <Skeleton className="h-5 w-20" />
        
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
};
