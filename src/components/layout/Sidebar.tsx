'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import { BookOpen, Download, Chrome as Home, MessageSquare, Search, Settings, Sparkles, Star, User } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  variant?: 'default' | 'premium';
}

const studentNav: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/resources', label: 'Resources', icon: BookOpen },
  { href: '/dashboard/search', label: 'Search', icon: Search },
  { href: '/dashboard/favorites', label: 'Favorites', icon: Star },
  { href: '/dashboard/downloads', label: 'Downloads', icon: Download },
];

const premiumNav: NavItem[] = [
  { href: '/dashboard/ai', label: 'AI Features', icon: Sparkles, badge: 'Premium', variant: 'premium' },
];

const communityNav: NavItem[] = [
  { href: '/dashboard/community', label: 'Community', icon: MessageSquare },
];

const accountNav: NavItem[] = [
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

function NavSection({ title, items }: { title: string; items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <div>
      <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge variant={item.variant === 'premium' ? 'secondary' : 'default'} size="sm">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full w-64 flex-col border-r border-gray-200 bg-white',
        'dark:border-gray-800 dark:bg-gray-900',
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-4 dark:border-gray-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
          <span className="text-sm font-bold text-white">UC</span>
        </div>
        <span className="font-heading text-lg font-semibold text-gray-900 dark:text-white">
          UFAS Cortex
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        <NavSection title="Main" items={studentNav} />
        <NavSection title="Premium" items={premiumNav} />
        <NavSection title="Community" items={communityNav} />
        <NavSection title="Account" items={accountNav} />
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <Link
          href="/dashboard/premium"
          className="flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Upgrade to Premium
        </Link>
      </div>
    </aside>
  );
}
