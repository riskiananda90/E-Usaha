import { Skeleton } from "@/components/ui/skeleton";

export const BusinessCardSkeleton = () => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-md p-4">
      <div className="flex gap-4">
        <Skeleton className="w-32 h-32 flex-shrink-0 rounded-xl" />

        <div className="flex-1 flex flex-col justify-between min-w-0 space-y-2">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-10" />
            </div>
            
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-lg" />
              <Skeleton className="h-5 w-12 rounded-lg" />
            </div>

            <Skeleton className="h-4 w-full" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-9 flex-1 rounded-lg" />
            <Skeleton className="h-9 w-9 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
