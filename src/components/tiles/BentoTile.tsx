'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function BentoTile({ children, className = '', index = 0 }: BentoTileProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: index * 0.1,
      }}
      whileHover={{
        scale: 1.015,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-secondary p-5 md:p-6 transition-shadow duration-300 hover:border-accent-primary/20 hover:shadow-lg hover:shadow-accent-primary/10 ${className}`}
    >
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.06), transparent 50%)',
        }}
      />
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Hover glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.06), transparent 70%)' }}
      />
      <div className="relative z-10">{children}</div>
    </motion.article>
  );
}
