'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Alert, Button, Input } from '@/components/ui';
import { createClient } from '@/lib/supabase';
import { signupSchema, type SignupInput } from '@/lib/utils/validators';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignupInput) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          year_id: data.yearId,
        },
      },
    });

    if (error) {
      setIsLoading(false);
      if (error.message.includes('already registered')) {
        setError('An account with this email already exists.');
      } else {
        setError(error.message);
      }
      return;
    }

    setIsLoading(false);
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-100 dark:bg-success-900">
            <svg
              className="h-6 w-6 text-success-600 dark:text-success-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
              Check your email
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              We&apos;ve sent a confirmation link to your email address. Please click the link to
              activate your account.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setEmailSent(false);
            }}
          >
            Back to signup
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600">
            <span className="text-lg font-bold text-white">UC</span>
          </div>
          <h1 className="mt-6 font-heading text-2xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join UFAS Cortex and start learning smarter
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="error" title="Signup failed">
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
              placeholder="Min. 8 characters"
              error={errors.password?.message}
              autoComplete="new-password"
              disabled={isLoading}
              helperText="Must be at least 8 characters"
            />

            <Input
              {...register('confirmPassword')}
              type="password"
              label="Confirm password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Academic Year
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'year-1', label: 'Year 1' },
                { id: 'year-2', label: 'Year 2' },
                { id: 'year-3', label: 'Year 3' },
                { id: 'year-4', label: 'Year 4' },
                { id: 'year-5', label: 'Year 5' },
                { id: 'year-6', label: 'Year 6' },
              ].map((year) => (
                <label
                  key={year.id}
                  className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50 has-[:checked]:border-primary-600 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-700 dark:border-gray-700 dark:hover:bg-gray-800 dark:has-[:checked]:bg-primary-950 dark:has-[:checked]:text-primary-300"
                >
                  <input
                    type="radio"
                    value={year.id}
                    {...register('yearId')}
                    className="sr-only"
                    disabled={isLoading}
                  />
                  {year.label}
                </label>
              ))}
            </div>
            {errors.yearId && (
              <p className="text-sm text-error-600">{errors.yearId.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-500">
          By signing up, you agree to our{' '}
          <a href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
            Privacy Policy
          </a>
        </p>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a
            href="/login"
            className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
