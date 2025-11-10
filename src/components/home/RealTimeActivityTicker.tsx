import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";

interface Activity {
  id: string;
  userName: string;
  location: string;
  eventName: string;
  timeAgo: string;
}

const mockActivities: Activity[] = [
  { id: "1", userName: "Sarah", location: "Banda Aceh", eventName: "Festival Kuliner", timeAgo: "2 menit lalu" },
  { id: "2", userName: "Ahmad", location: "Aceh Besar", eventName: "Konser Musik Lokal", timeAgo: "5 menit lalu" },
  { id: "3", userName: "Fitri", location: "Ulee Kareng", eventName: "Workshop Fotografi", timeAgo: "8 menit lalu" },
  { id: "4", userName: "Rizki", location: "Syiah Kuala", eventName: "Festival Kuliner", timeAgo: "12 menit lalu" },
  { id: "5", userName: "Dewi", location: "Banda Aceh", eventName: "Pameran Seni", timeAgo: "15 menit lalu" },
];

export const RealTimeActivityTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockActivities.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentActivity = mockActivities[currentIndex];

  return (
    <div className="rounded-sm bg-secondary/5 mx-4 border-y border-border/50 py-1 overflow-hidden">
      <div className="container mx-auto px-1">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={currentActivity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2 text-[8px]"
            >
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <User className="w-4 h-4 text-secondary" />
                <span className="font-semibold text-foreground">{currentActivity.userName}</span>
                <span>dari</span>
                <span className="font-medium text-foreground">{currentActivity.location}</span>
                <span>baru beli tiket</span>
                <span className="font-semibold text-secondary">{currentActivity.eventName}</span>
                <span className="text-[8px] text-muted-foreground/70">{currentActivity.timeAgo}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
