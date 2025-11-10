import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VideoCard } from "@/components/VideoCard";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/layout/Header";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import { FilterChips, FilterCategory } from "@/components/feed/FilterChips";
import { PromoBanner } from "@/components/home/PromoBanner";
import { SearchBarSkeleton } from "@/components/skeletons/SearchBarSkeleton";
import { DiscoveryFeedSkeleton } from "@/components/skeletons/DiscoveryFeedSkeleton";
import {
  UtensilsCrossed,
  Home,
  Wrench,
  Palmtree,
  Store,
  Calendar,
  MapPin,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVideos } from "@/hooks/useVideos";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("Semua");
  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden">
      <DesktopSidebar />

      <div className="flex-1 lg:pl-64 w-full max-w-full overflow-x-hidden pb-20 lg:pb-0">
        <Header />

        <section className="w-full max-w-full overflow-hidden py-4 bg-gradient-to-b from-background/50 to-background">
          <PromoBanner />
        </section>

        <section className="w-full max-w-full overflow-hidden sticky top-0 z-20 bg-background/95 backdrop-blur-md ">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {<SearchBarSkeleton />}
          </div>
          <FilterChips
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </section>

        <FeaturedVideosSection category={selectedCategory} />

        <section
          id="discovery-feed"
          className="w-full max-w-full overflow-hidden space-section scroll-mt-20"
        >
          <div className="container mx-auto space-container">
            {<DiscoveryFeedSkeleton />}
          </div>
        </section>

        <section
          className="w-full max-w-full overflow-hidden space-section"
          aria-labelledby="nearby-open-heading"
        >
          <div className="container mx-auto space-container">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-secondary/10">
                  <MapPin
                    className="w-5 h-5 text-secondary"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h2
                    id="nearby-open-heading"
                    className="text-xl font-bold text-foreground"
                  >
                    Buka Sekarang
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Usaha yang sedang beroperasi di sekitar Anda
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/nearby")}
                aria-label="Lihat semua usaha yang buka"
              >
                Lihat Semua
              </Button>
            </div>
            <div className=" gap-4">
              {<DiscoveryFeedSkeleton />}
            </div>
          </div>
        </section>

        <BottomNav />
      </div>
    </div>
  );
};

const FeaturedVideosSection = ({ category }: { category?: FilterCategory }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useVideos({
    limit: 5,
    sort: "trending",
    category:
      category && category !== "Semua" && category !== "Terdekat"
        ? category.toLowerCase()
        : undefined,
  });

  if (isLoading) {
    return (
      <section className="w-full max-w-full overflow-hidden space-section bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto space-container">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            <div className="h-9 w-24 bg-muted animate-pulse rounded" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="aspect-[9/16] bg-muted animate-pulse rounded-2xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const videos = data?.videos || [];
  if (videos.length === 0) return null;

  return (
    <section className="w-full max-w-full overflow-hidden space-section bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto space-container">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500">
              <Play className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Video Pilihan Hari Ini
              </h2>
              <p className="text-xs text-muted-foreground">
                Konten promosi terbaik dari usaha lokal
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/reels")}
            aria-label="Lihat semua video"
            className="gap-2"
          >
            Lihat Semua
            <Play className="w-4 h-4" />
          </Button>
        </div>

        <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2">
            {videos.map((video) => (
              <Card
                key={video._id}
                onClick={() => navigate(`/reels?v=${video._id}`)}
                className="flex-shrink-0 w-[160px] cursor-pointer overflow-hidden group hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[9/16] overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play
                        className="w-6 h-6 text-black ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6 border border-white/30">
                        <AvatarImage src={video.ownerId.profilePicture} />
                        <AvatarFallback className="text-xs">
                          {video.ownerId.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white text-xs font-medium truncate">
                        {video.ownerId.name}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-sm line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/70 text-xs">
                      <Play className="w-3 h-3" />
                      <span>{video.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-5 gap-3">
          {videos.map((video) => (
            <Card
              key={video._id}
              onClick={() => navigate(`/reels?v=${video._id}`)}
              className="cursor-pointer overflow-hidden group hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[9/16] overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play
                      className="w-8 h-8 text-black ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-7 w-7 border border-white/30">
                      <AvatarImage src={video.ownerId.profilePicture} />
                      <AvatarFallback className="text-xs">
                        {video.ownerId.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-white text-xs font-medium truncate">
                      {video.ownerId.name}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-sm line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/70 text-xs">
                    <Play className="w-3 h-3" />
                    <span>{video.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Index;
