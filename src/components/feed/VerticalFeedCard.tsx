import { Business } from "@/data/mockBusinesses";
import { BookmarkButton } from "./BookmarkButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Navigation, Info, Share2, Star, MapPin, Heart, Ticket } from "lucide-react";
import { UrgencyBadge } from "@/components/ui/urgency-badge";
import { SocialProofBadge } from "@/components/ui/social-proof-badge";
import { formatDistance } from "@/utils/distanceCalculator";
import { getTimeUntilClose } from "@/utils/timeChecker";
import { useState, useRef, useEffect } from "react";
import { CommentDrawer } from "./CommentDrawer";
import { useBookmarkStore } from "@/stores/useBookmarkStore";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
interface VerticalFeedCardProps {
  business: Business & {
    calculatedDistance?: number;
  };
  distance?: number;
}
export const VerticalFeedCard = ({
  business,
  distance
}: VerticalFeedCardProps) => {
  const navigate = useNavigate();
  const [commentOpen, setCommentOpen] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    isBookmarked,
    toggleBookmark
  } = useBookmarkStore();
  const { addItem } = useCartStore();
  const bookmarked = isBookmarked(business.id);

  // Check if business has tickets (Event category)
  const hasTickets = business.category === 'Event' && business.eventDetails?.ticketPrice;

  // Auto-play/pause based on scroll position
  useEffect(() => {
    const videoElement = videoRef.current;
    const containerElement = containerRef.current;
    if (!videoElement || !containerElement) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.75) {
          // Video is mostly visible, play it
          videoElement.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            // Autoplay prevented, user interaction needed
            setIsPlaying(false);
          });
        } else {
          // Video is not visible, pause it
          videoElement.pause();
          setIsPlaying(false);
        }
      });
    }, {
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    });
    observer.observe(containerElement);
    return () => {
      observer.disconnect();
    };
  }, []);
  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${business.location.lat},${business.location.lng}`;
    window.open(url, '_blank');
  };
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: `Cek ${business.name} di Meukat!`,
        url: window.location.href
      });
    }
  };
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!bookmarked) {
      toggleBookmark(business.id);
      toast({
        title: "Disimpan!",
        description: `${business.name}`,
        duration: 2000
      });
    }
    setShowLikeAnimation(true);
    setTimeout(() => setShowLikeAnimation(false), 1000);
  };
  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasTickets && business.eventDetails?.ticketPrice) {
      // Add 1 ticket to cart and go directly to checkout
      addItem({
        id: `${business.id}-quick-regular`,
        businessId: business.id,
        businessName: business.name,
        businessImage: business.thumbnail,
        ticketType: 'Tiket Regular',
        price: business.eventDetails.ticketPrice,
        quantity: 1,
        maxQuantity: 10,
      });
      
      toast({
        title: '✅ Tiket ditambahkan',
        description: 'Mengarahkan ke checkout...',
        duration: 1500,
      });

      setTimeout(() => {
        navigate('/checkout');
      }, 500);
    }
  };
  return <>
      <div ref={containerRef} className="relative h-[calc(100dvh-5rem)] md:h-auto snap-start cursor-pointer group animate-fade-in" onDoubleClick={handleDoubleClick} onClick={() => navigate(`/business/${business.id}`)}>
        {/* Video/Image Background */}
        {business.videoUrl ? <video ref={videoRef} src={business.videoUrl} className="absolute inset-0 w-full h-full object-cover" loop playsInline muted onClick={handleVideoClick} poster={business.thumbnail} /> : <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${business.thumbnail})`
      }} />}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Urgency Badges - Top Left - Mobile */}
        <div className="absolute top-4 left-3 z-30 flex flex-col gap-2 md:hidden">
          {business.rating >= 4.7 && <UrgencyBadge type="hot" />}
          {business.views > 3000 && <UrgencyBadge type="buyers" value={Math.floor(business.views / 100)} />}
        </div>

        {/* Double-Click Like Animation */}
        {showLikeAnimation && <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
            <Heart className="w-24 h-24 md:w-32 md:h-32 text-white fill-accent animate-like-bounce" />
          </div>}

        {/* Right Action Column - TikTok Style - Mobile Only */}
        <div className="absolute right-2 bottom-24 flex flex-col gap-4 z-30 md:hidden">
          {/* Like/Bookmark Button */}
          <div className="flex flex-col items-center gap-0.5">
            <button onClick={e => {
            e.stopPropagation();
            toggleBookmark(business.id);
            toast({
              title: bookmarked ? "Dihapus" : "Disimpan!",
              description: bookmarked ? undefined : business.name,
              duration: 1500
            });
          }} className="w-11 h-11 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm hover:scale-110 transition-transform active:scale-95">
              <Heart className={`w-6 h-6 ${bookmarked ? 'fill-accent text-accent' : 'text-white'}`} />
            </button>
            <span className="text-white text-[10px] font-semibold drop-shadow-lg">
              {formatCount(business.bookmarkCount + (bookmarked ? 1 : 0))}
            </span>
          </div>

          {/* Comment Button */}
          <div className="flex flex-col items-center gap-0.5">
            <button onClick={e => {
            e.stopPropagation();
            setCommentOpen(true);
          }} className="w-11 h-11 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm hover:scale-110 transition-transform active:scale-95">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <span className="text-white text-[10px] font-semibold drop-shadow-lg">
              {formatCount(business.comments || 0)}
            </span>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center gap-0.5">
            <button onClick={handleShare} className="w-11 h-11 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm hover:scale-110 transition-transform active:scale-95">
              <Share2 className="w-6 h-6 text-white" />
            </button>
            <span className="text-white text-[10px] font-semibold drop-shadow-lg">
              {formatCount(business.shareCount)}
            </span>
          </div>

          {/* Navigation Button */}
          <div className="flex flex-col items-center gap-0.5">
            <button onClick={handleNavigate} className="w-11 h-11 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm hover:scale-110 transition-transform active:scale-95">
              <Navigation className="w-6 h-6 text-white" />
            </button>
            <span className="text-white text-[10px] font-semibold drop-shadow-lg">Rute</span>
          </div>

          {/* Quick Buy Button - Only for Events */}
          {hasTickets && (
            <div className="flex flex-col items-center gap-0.5">
              <button 
                onClick={handleQuickBuy}
                className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-r from-primary to-primary-glow hover:scale-110 transition-transform active:scale-95 shadow-lg"
              >
                <Ticket className="w-6 h-6 text-primary-foreground" />
              </button>
              <span className="text-white text-[10px] font-semibold drop-shadow-lg">Beli</span>
            </div>
          )}
        </div>

        {/* Bottom Content - TikTok Style - Mobile Only */}
        <div className="absolute bottom-4 left-3 right-20 z-20 md:hidden">
          <div className="space-y-1.5">
            {/* Business Name */}
            <h3 className="text-white text-md font-bold drop-shadow-lg">
              @{business.name.replace(/\s+/g, '').toLowerCase()}
            </h3>

            {/* Description */}
            <p className="text-white text-xs drop-shadow-lg line-clamp-2">
              {business.description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-2 text-white/90 text-[10px] drop-shadow-lg">
              <div className="flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{business.rating}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5" />
                <span className="text-[9px]">
                  {business.calculatedDistance ? formatDistance(business.calculatedDistance) : distance ? formatDistance(distance) : business.distance}
                </span>
              </div>
              <span>•</span>
              <Badge className="bg-secondary/80 text-white text-[8px] px-1.5 py-0 border-0 h-4">
                {business.category}
              </Badge>
            </div>

            {/* Open Status */}
            {business.isOpen && <div className="flex items-center gap-1.5">
                <Badge className="bg-[hsl(140,70%,45%)]/90 text-white text-[8px] px-1.5 py-0 border-0 h-4">
                  Buka
                </Badge>
                <span className="text-white/70 text-[9px] drop-shadow-lg">
                  {getTimeUntilClose(business.hours.close)}
                </span>
              </div>}
          </div>
        </div>


        {/* Desktop Version - GoFood Style Clean Cards */}
        <div className="hidden md:flex md:flex-col md:bg-card md:rounded-xl md:overflow-hidden md:shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:transition-all md:duration-200 md:hover:-translate-y-0.5 md:w-full md:h-full">
          {/* Video Container - Compact GoFood Style */}
          <div className="relative md:h-[320px] lg:h-[360px] md:bg-muted/30 md:overflow-hidden">
            {/* Video/Image Background */}
            {business.videoUrl ? (
              <video 
                ref={videoRef}
                src={business.videoUrl} 
                className="absolute inset-0 w-full h-full object-cover"
                loop 
                playsInline 
                muted 
                onClick={handleVideoClick}
                poster={business.thumbnail}
              />
            ) : (
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url(${business.thumbnail})` }}
              />
            )}
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
            
            {/* Urgency Badges - Top Left - Desktop */}
            <div className="absolute top-3 left-3 z-20 flex gap-2">
              {business.rating >= 4.7 && <UrgencyBadge type="hot" />}
              {business.views > 3000 && <SocialProofBadge type="trending" />}
            </div>
            
            {/* Play/Pause Indicator */}
            {business.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  {isPlaying ? (
                    <div className="flex gap-1">
                      <div className="w-1 h-5 bg-white rounded-full"></div>
                      <div className="w-1 h-5 bg-white rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Caption Section - GoFood Clean Style */}
          <div className="md:p-5 lg:p-6 md:bg-card">
            {/* Business Name - Bold & Clear */}
            <h3 className="text-lg font-bold text-foreground mb-2">
              {business.name}
            </h3>
            
            {/* Urgency & Social Proof Badges */}
            <div className="flex items-center flex-wrap gap-2 mb-3">
              {business.views > 3000 && <UrgencyBadge type="buyers" value={Math.floor(business.views / 100)} />}
              <SocialProofBadge type="views" value={business.views} />
            </div>

            {/* Meta Info Row - Compact Single Line */}
            <div className="flex items-center flex-wrap gap-2 text-sm mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold text-foreground">{business.rating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-sm">{business.calculatedDistance ? formatDistance(business.calculatedDistance) : distance ? formatDistance(distance) : business.distance}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{business.category}</span>
              {business.isOpen && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm font-medium text-[hsl(140,70%,45%)]">Buka</span>
                </>
              )}
            </div>
            
            {/* Description - Readable */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {business.description}
            </p>
            
            {/* Time Until Close */}
            {business.isOpen && (
              <p className="text-xs text-muted-foreground mb-4">
                {getTimeUntilClose(business.hours.close)}
              </p>
            )}
            
            {/* Divider */}
            <div className="border-t border-border pt-4 mt-auto">
              {/* Bottom Actions - Clean Layout */}
              <div className="flex items-center justify-between">
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(business.id);
                      toast({
                        title: bookmarked ? "Dihapus" : "Disimpan!",
                        description: bookmarked ? undefined : business.name,
                        duration: 1500
                      });
                    }}
                    className="flex items-center gap-1.5 hover:text-accent transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${bookmarked ? 'fill-accent text-accent' : ''}`} />
                    <span className="text-xs font-medium">{formatCount(business.bookmarkCount + (bookmarked ? 1 : 0))}</span>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCommentOpen(true);
                    }}
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">{formatCount(business.comments || 0)}</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs font-medium">{formatCount(business.shareCount)}</span>
                  </button>
                </div>
                
                {/* Quick Buy for Events OR Navigate */}
                {hasTickets ? (
                  <Button
                    onClick={handleQuickBuy}
                    size="sm"
                    className="gap-1.5 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 shadow-sm"
                  >
                    <Ticket className="w-4 h-4" />
                    Beli Tiket
                  </Button>
                ) : (
                  <button 
                    onClick={handleNavigate}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors text-sm font-medium shadow-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    Arahkan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CommentDrawer business={business} open={commentOpen} onOpenChange={setCommentOpen} />
    </>;
};