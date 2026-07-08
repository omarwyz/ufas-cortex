'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Alert, Button, Input } from '@/components/ui';
import { createClient } from '@/lib/supabase';
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/utils/validators';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      setIsLoading(false);
      setError(error.message);
      return;
    }

    router.push('/login?reset=true');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600">
            <span className="text-lg font-bold text-white">UC</span>
          </div>
          <h1 className="mt-6 font-heading text-2xl font-bold text-gray-900 dark:text-white">
            Set new password
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter a new password for your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="error" title="Error">
              {error}
            </Alert>
          )}

          <div className="space-y-4">
            <Input
              {...register('password')}
              type="password"
              label="New password"
              placeholder="Min. 8 characters"
              error={errors.password?.message}
              autoComplete="new-password"
              disabled={isLoading}
            />

            <Input
              {...register('confirmPassword')}
              type="password"
              label="Confirm new password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
