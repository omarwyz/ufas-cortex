import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100',
        secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-100',
        success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100',
        warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100',
        error: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-100',
        outline: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-100',
      },
      size: {
        sm: 'px-2 py-0.5 text-2xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
