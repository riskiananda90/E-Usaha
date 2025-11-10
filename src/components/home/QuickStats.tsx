import { motion } from 'framer-motion';
import { Building2, Users, Heart } from 'lucide-react';

export const QuickStats = () => {
  const stats = [
    {
      icon: Building2,
      value: '786+',
      label: 'Usaha Terdaftar',
      color: 'from-primary to-primary-glow',
    },
    {
      icon: Users,
      value: '12K+',
      label: 'Pengguna Aktif',
      color: 'from-secondary to-accent',
    },
    {
      icon: Heart,
      value: '98%',
      label: 'Kepuasan',
      color: 'from-accent to-destructive',
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="p-4 md:p-6 rounded-2xl bg-card shadow-md hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1">
              {/* Icon with gradient background */}
              <div className={`inline-flex p-2 sm:p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-3 sm:mb-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-background" />
              </div>

              {/* Value */}
              <div className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>

              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity blur-xl -z-10 duration-700`} />
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};
