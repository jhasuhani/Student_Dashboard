import { SkeletonCard } from '@/components/ui/SkeletonCard';

export default function Loading() {
  return (
    <div className="p-4 pt-16 lg:pt-6 lg:p-8 animate-pulse">
      <div className="mb-6">
        <div className="h-4 w-20 rounded bg-white/5" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Hero skeleton */}
        <div className="md:col-span-2">
          <article className="rounded-2xl border border-white/5 bg-bg-secondary p-6">
            <div className="space-y-4">
              <div className="h-3 w-40 rounded bg-white/5" />
              <div className="space-y-2">
                <div className="h-8 w-64 rounded bg-white/5" />
                <div className="h-4 w-48 rounded bg-white/5" />
              </div>
              <div className="flex gap-4">
                <div className="h-14 w-28 rounded-xl bg-white/5" />
                <div className="h-14 w-28 rounded-xl bg-white/5" />
              </div>
            </div>
          </article>
        </div>

        {/* Course skeletons */}
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />

        {/* Activity skeleton */}
        <div className="md:col-span-2">
          <article className="rounded-2xl border border-white/5 bg-bg-secondary p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="h-4 w-32 rounded bg-white/5" />
                <div className="h-3 w-24 rounded bg-white/5" />
              </div>
              <div className="flex gap-1 flex-wrap">
                {Array.from({ length: 84 }).map((_, i) => (
                  <div key={i} className="h-[14px] w-[14px] rounded-sm bg-white/[0.04]" />
                ))}
              </div>
              <div className="h-3 w-48 rounded bg-white/5" />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
