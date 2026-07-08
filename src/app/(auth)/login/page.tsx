'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Alert, Button, Input } from '@/components/ui';
import { createClient } from '@/lib/supabase';
import { loginSchema, type LoginInput } from '@/lib/utils/validators';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setIsLoading(false);
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(error.message);
      }
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="error" title="Login failed">
          {error}
        </Alert>
      )}

      <div className="space-y-4">
        <Input
          {...register('email')}
          type="email"
          label="Email address"
          placeholder="you@univ.dz"
          error={errors.email?.message}
          autoComplete="email"
          disabled={isLoading}
        />

        <Input
          {...register('password')}
          type="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          autoComplete="current-password"
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
        </label>
        <a
          href="/forgot-password"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          Forgot password?
        </a>
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Log in
      </Button>
    </form>
  );
}

function OAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" type="button" className="w-full" disabled>
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Google
      </Button>
      <Button variant="outline" type="button" className="w-full" disabled>
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
        </svg>
        Microsoft
      </Button>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600">
            <span className="text-lg font-bold text-white">UC</span>
          </div>
          <h1 className="mt-6 font-heading text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Log in to your UFAS Cortex account
          </p>
        </div>

        {/* Form */}
        <Suspense fallback={<div className="h-48 animate-pulse rounded-lg bg-gray-100" />}>
          <LoginForm />
        </Suspense>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-gray-50 px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <OAuthButtons />

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <a
            href="/signup"
            className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            Sign up free
          </a>
        </p>
      </div>
    </div>
  );
}
