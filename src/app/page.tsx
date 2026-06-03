export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import type { Course, Activity } from '@/types/database';

// Fallback data used when Supabase is not configured
const fallbackCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    progress: 75,
    icon_name: 'Atom',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'TypeScript Mastery',
    progress: 42,
    icon_name: 'FileCode',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'System Design',
    progress: 88,
    icon_name: 'Network',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Data Structures & Algorithms',
    progress: 60,
    icon_name: 'BrainCircuit',
    created_at: new Date().toISOString(),
  },
];
async function fetchCourses(): Promise<{ courses: Course[]; error: string | null }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { courses: fallbackCourses, error: null };
  }

  try {
    const { createServerSupabaseClient } = await import('@/lib/supabase/server');
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase query error:', error);
      return { courses: fallbackCourses, error: null };
    }

    return { courses: data || fallbackCourses, error: null };
  } catch (err) {
    console.error('Failed to fetch courses:', err);
    return { courses: fallbackCourses, error: null };
  }
}
async function fetchActivity(): Promise<Activity[]> {
  try {
    const { createServerSupabaseClient } = await import('@/lib/supabase/server');

    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from('activity')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Activity query error:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Failed to fetch activity:', err);
    return [];
  }
}

function DashboardSkeleton() {
  return (
    <div className="p-4 pt-16 lg:pt-6 lg:p-8">
      <div className="mb-6">
        <div className="h-4 w-20 rounded bg-white/5 animate-pulse" />
      </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <SkeletonCard className="md:col-span-2" />
  <SkeletonCard />
  <SkeletonCard />
  <SkeletonCard />
  <SkeletonCard />
  <SkeletonCard className="lg:col-span-4" />
</div>
    </div>
  );
}

async function DashboardData() {
  const { courses, error } = await fetchCourses();
  const activity = await fetchActivity();

  return (
    <DashboardContent
      courses={courses}
      activity={activity}
      error={error}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardData />
    </Suspense>
  );
}
