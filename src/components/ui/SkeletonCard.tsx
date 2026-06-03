export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <article
      className={`rounded-2xl border border-white/5 bg-bg-secondary p-6 ${className}`}
    >
      <div className="animate-pulse space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/5" />
          <div className="h-4 w-32 rounded bg-white/5" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-white/5" />
          <div className="h-3 w-2/3 rounded bg-white/5" />
        </div>
        <div className="h-2 w-full rounded-full bg-white/5" />
      </div>
    </article>
  );
}
