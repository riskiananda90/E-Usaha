import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const CommunityHighlights = () => {
  // Data Pura pura
   const topReviewers = [
    { name: 'Ahmad R.', reviews: 156, avatar: 'AR', badge: 'gold' },
    { name: 'Siti N.', reviews: 134, avatar: 'SN', badge: 'silver' },
    { name: 'Rizki F.', reviews: 128, avatar: 'RF', badge: 'bronze' },
  ];

  const trendingHashtags = [
    { tag: 'kulinerAceh', count: 1234 },
    { tag: 'kopisolong', count: 876 },
    { tag: 'wisataAceh', count: 654 },
  ];

  const mostLoved = [
    { name: 'Warung Kopi Solong', rating: 4.9, reviews: 456 },
    { name: 'Pantai Lampuuk', rating: 4.9, reviews: 543 },
    { name: 'Mie Razali', rating: 4.8, reviews: 389 },
  ];

  const badges = {
    gold: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    silver: 'bg-gradient-to-br from-gray-300 to-gray-500',
    bronze: 'bg-gradient-to-br from-orange-400 to-orange-600',
  };

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="p-1.5 sm:p-2 rounded-xl bg-card shadow-sm">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">Community Highlights</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Yang lagi trending di komunitas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
            <h4 className="font-semibold text-sm sm:text-base text-foreground">Top Reviewers</h4>
          </div>
          <div className="space-y-2">
            {topReviewers.map((reviewer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarFallback className={badges[reviewer.badge as keyof typeof badges]}>
                      {reviewer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-card rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-[10px] sm:text-xs">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs sm:text-sm truncate">{reviewer.name}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    {reviewer.reviews} reviews
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-secondary fill-secondary" />
            <h4 className="font-semibold text-sm sm:text-base text-foreground">Most Loved</h4>
          </div>
          <div className="space-y-2">
            {mostLoved.map((place, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <p className="font-medium text-xs sm:text-sm truncate">{place.name}</p>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-secondary text-secondary" />
                    <span>{place.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{place.reviews} reviews</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            <h4 className="font-semibold text-sm sm:text-base text-foreground">Trending Hashtags</h4>
          </div>
          <div className="space-y-2">
            {trendingHashtags.map((hashtag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <Badge variant="outline" className="font-normal text-[10px] sm:text-xs">
                  #{hashtag.tag}
                </Badge>
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  {hashtag.count} posts
                </span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};
