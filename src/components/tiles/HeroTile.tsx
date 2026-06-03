'use client';

import { motion } from 'framer-motion';
import { Flame, Calendar, TrendingUp } from 'lucide-react';
import { BentoTile } from './BentoTile';

export function HeroTile() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <BentoTile className="md:col-span-2" index={0}>
      <div className="flex flex-col gap-4">
        {/* Date */}
        <div className="flex items-center gap-2 text-slate-400">
          <Calendar className="h-4 w-4" />
          <span className="text-xs font-medium">{dateStr}</span>
        </div>

        {/* Welcome */}
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            Welcome back,{' '}
            <span className="gradient-text">Student</span>
            {' '}👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-1 text-sm text-slate-400"
          >
            Keep up the great work! You&apos;re making excellent progress.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 md:gap-6 mt-2 flex-wrap">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-center gap-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 px-4 py-2.5"
          >
            <Flame className="h-5 w-5 text-orange-400" />
            <div>
              <p className="text-lg font-bold text-orange-400 leading-tight">12</p>
              <p className="text-[10px] text-orange-400/70 font-medium">Day Streak</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-center gap-2.5 rounded-xl bg-accent-primary/10 border border-accent-primary/20 px-4 py-2.5"
          >
            <TrendingUp className="h-5 w-5 text-accent-primary" />
            <div>
              <p className="text-lg font-bold text-accent-primary leading-tight">4.5h</p>
              <p className="text-[10px] text-accent-primary/70 font-medium">Today</p>
            </div>
          </motion.div>
        </div>
      </div>
    </BentoTile>
  );
}
