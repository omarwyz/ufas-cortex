import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 text-sm',
  {
    variants: {
      variant: {
        default: 'bg-white border-gray-200 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100',
        info: 'bg-primary-50 border-primary-200 text-primary-900 dark:bg-primary-950 dark:border-primary-800 dark:text-primary-100',
        success: 'bg-success-50 border-success-200 text-success-900 dark:bg-success-950 dark:border-success-800 dark:text-success-100',
        warning: 'bg-warning-50 border-warning-200 text-warning-900 dark:bg-warning-950 dark:border-warning-800 dark:text-warning-100',
        error: 'bg-error-50 border-error-200 text-error-900 dark:bg-error-950 dark:border-error-800 dark:text-error-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
}

function Alert({ className, variant, title, children, ...props }: AlertProps) {
  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {title && (
        <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>
      )}
      <div className="text-sm [&_p]:leading-relaxed">{children}</div>
    </div>
  );
}

export { Alert, alertVariants };
