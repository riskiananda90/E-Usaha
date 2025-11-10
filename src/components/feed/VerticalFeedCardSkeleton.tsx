import { Skeleton } from "@/components/ui/skeleton";

export const VerticalFeedCardSkeleton = () => {
  return (
    <div className="relative h-[calc(100dvh-5rem)] md:h-auto snap-start">
      {/* Mobile Skeleton - TikTok Style */}
      <div className="md:hidden absolute inset-0">
        {/* Background */}
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        
        {/* Bottom Content */}
        <div className="absolute bottom-4 left-3 right-20 z-20 space-y-2">
          <Skeleton className="h-5 w-32 bg-white/20" />
          <Skeleton className="h-4 w-48 bg-white/20" />
          <Skeleton className="h-3 w-40 bg-white/20" />
        </div>
        
        {/* Right Action Column */}
        <div className="absolute right-2 bottom-24 flex flex-col gap-4 z-30">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <Skeleton className="w-11 h-11 rounded-full bg-white/20" />
              <Skeleton className="h-2 w-6 bg-white/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Skeleton - GoFood Style */}
      <div className="hidden md:flex md:flex-col md:bg-card md:rounded-xl md:overflow-hidden md:shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:max-w-[420px] lg:max-w-[460px]">
        {/* Video Placeholder */}
        <Skeleton className="md:h-[320px] lg:h-[360px] rounded-none" />
        
        {/* Caption Section */}
        <div className="md:p-5 lg:p-6 space-y-3">
          {/* Business Name */}
          <Skeleton className="h-6 w-3/4" />
          
          {/* Meta Info */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-1 rounded-full" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-1 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          
          {/* Time */}
          <Skeleton className="h-3 w-32" />
          
          {/* Divider */}
          <div className="border-t border-border pt-4 mt-4">
            {/* Bottom Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
