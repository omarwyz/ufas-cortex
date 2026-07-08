'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  className?: string;
  variant?: 'landing' | 'dashboard';
}

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#years', label: 'Academic Years' },
  { href: '/#about', label: 'About' },
];

export function Navbar({ className, variant = 'landing' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md',
        'dark:border-gray-800 dark:bg-gray-900/80',
        className
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <span className="text-sm font-bold text-white">UC</span>
          </div>
          <span className="hidden font-heading text-lg font-semibold text-gray-900 dark:text-white sm:block">
            UFAS Cortex
          </span>
        </Link>

        {/* Desktop Navigation */}
        {variant === 'landing' && (
          <div className="hidden items-center space-x-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center space-x-3 md:flex">
          {variant === 'landing' ? (
            <>
              <Button variant="ghost" onClick={() => router.push('/login')}>
                Log in
              </Button>
              <Button onClick={() => router.push('/signup')}>Get Started</Button>
            </>
          ) : null}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 md:hidden dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden dark:border-gray-800 dark:bg-gray-900">
          <div className="space-y-1 px-4 py-3">
            {variant === 'landing' && (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-800">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push('/login')}
                  >
                    Log in
                  </Button>
                  <Button className="w-full" onClick={() => router.push('/signup')}>
                    Get Started
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
