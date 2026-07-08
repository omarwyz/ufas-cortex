'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Alert, Button, Input } from '@/components/ui';
import { createClient } from '@/lib/supabase';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/utils/validators';

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
            <svg
              className="h-6 w-6 text-primary-600 dark:text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
              Check your email
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              We&apos;ve sent a password reset link to your email address. The link will expire in
              1 hour.
            </p>
          </div>
          <Button variant="outline" onClick={() => setSuccess(false)}>
            Send another email
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
            Reset your password
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="error" title="Error">
              {error}
            </Alert>
          )}

          <Input
            {...register('email')}
            type="email"
            label="Email address"
            placeholder="you@univ.dz"
            error={errors.email?.message}
            autoComplete="email"
            disabled={isLoading}
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Send Reset Link
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{' '}
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
