'use client';

import { motion } from 'framer-motion';
import { HeroTile } from '@/components/tiles/HeroTile';
import { CourseCard } from '@/components/tiles/CourseCard';
import { ActivityTile } from '@/components/tiles/ActivityTile';
import { ErrorState } from '@/components/ui/ErrorState';
import type { Course, Activity } from '@/types/database';

interface DashboardContentProps {
  courses: Course[];
  activity: Activity[];
  error?: string | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export function DashboardContent({
  courses,
  activity,
  error,
}: DashboardContentProps) {
  if (error) {
    return (
      <div className="p-6 lg:p-8">
        <ErrorState
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 pt-16 lg:pt-6 lg:p-8"
    >
      {/* Page header */}
      <header className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Overview
        </h2>
      </header>

      {/* Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Hero Tile — spans 2 columns */}
        <div className="md:col-span-2">
          <HeroTile />
        </div>

        {/* Course Cards */}
        {courses.map((course, index) => (
          <div key={course.id} className="col-span-1">
            <CourseCard course={course} index={index} />
          </div>
        ))}

    <div className="lg:col-span-4">
  <ActivityTile activityData={activity} />
</div>
      </section>
    </motion.div>
  );
}
