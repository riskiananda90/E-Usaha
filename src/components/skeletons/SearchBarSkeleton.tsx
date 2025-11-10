import { Skeleton } from "@/components/ui/skeleton";

export const SearchBarSkeleton = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Skeleton className="h-12 sm:h-14 w-full rounded-full" />
    </div>
  );
};
