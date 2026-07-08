import { createClient } from '@/lib/supabase/server';
import { BookOpen, Sparkles, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user.email?.split('@')[0]}!
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your learning today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Resources Viewed"
          value="0"
          description="This month"
          icon={BookOpen}
        />
        <StatCard
          title="Downloads"
          value="0"
          description="Total"
          icon={TrendingUp}
        />
        <StatCard
          title="Favorites"
          value="0"
          description="Total"
          icon={Star}
        />
        <StatCard
          title="AI Generations"
          value="0"
          description="This month"
          icon={Sparkles}
          premium
        />
      </div>

      {/* Getting Started Card */}
      <Card variant="bordered">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to UFAS Cortex! Start exploring academic resources by selecting your year and
            subject from the sidebar.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="/dashboard/resources"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
            >
              <BookOpen className="h-4 w-4" />
              Browse Resources
            </a>
            <a
              href="/dashboard/premium"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            >
              <Sparkles className="h-4 w-4" />
              Upgrade to Premium
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  premium,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  premium?: boolean;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </span>
            {premium && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary-100 px-2 py-0.5 text-xs font-medium text-secondary-700 dark:bg-secondary-900/50 dark:text-secondary-300">
                Premium
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">{description}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
          <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
    </Card>
  );
}
