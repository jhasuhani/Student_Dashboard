'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedProgressBarProps {
  progress: number;
  delay?: number;
}

export function AnimatedProgressBar({ progress, delay = 0 }: AnimatedProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const motionProgress = useMotionValue(0);
  const width = useTransform(motionProgress, [0, 100], ['0%', '100%']);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const controls = animate(motionProgress, progress, {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        duration: 1.5,
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });
      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [progress, delay, motionProgress]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-slate-400 font-medium">Progress</span>
        <span className="text-xs font-bold text-accent-primary">{displayValue}%</span>
      </div>
      <div className="h-2 rounded-full bg-bg-primary overflow-hidden relative">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            width,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: 'shimmer 2s infinite',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
