'use client';

import { BentoTile } from './BentoTile';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { AnimatedProgressBar } from '@/components/ui/AnimatedProgressBar';
import type { Course } from '@/types/database';

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const statusText =
    course.progress >= 80
      ? 'Almost done!'
      : course.progress >= 50
      ? 'Good progress'
      : 'Keep going';

  return (
    <BentoTile index={index + 1}>
      <div className="flex flex-col gap-4 h-full min-h-[140px]">
        {/* Icon + Title */}
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 border border-accent-primary/10">
            <DynamicIcon
              name={course.icon_name}
              className="text-accent-primary"
              size={22}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-white leading-tight">
              {course.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{statusText}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-auto">
          <AnimatedProgressBar progress={course.progress} delay={0.3 + index * 0.15} />
        </div>
      </div>
    </BentoTile>
  );
}
