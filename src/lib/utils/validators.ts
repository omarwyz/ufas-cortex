import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address').min(1, 'Email is required');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters');

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(100, 'Name must be less than 100 characters');

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  yearId: z.string().uuid('Please select your academic year'),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
});

export const activationCodeSchema = z.object({
  code: z
    .string()
    .min(1, 'Activation code is required')
    .regex(/^CORTEX-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/, 'Invalid code format (CORTEX-XXXX-XXXX-XXXX)'),
});

export const profileSchema = z.object({
  name: nameSchema.optional(),
  yearId: z.string().uuid().optional().nullable(),
});

export const resourceUploadSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  description: z.string().max(1000, 'Description is too long').optional(),
  yearId: z.string().uuid('Please select an academic year'),
  semesterId: z.string().uuid('Please select a semester').optional().nullable(),
  subjectId: z.string().uuid('Please select a subject'),
  type: z.enum(['exam', 'notes', 'practical', 'drive_link', 'other']),
});

export const examGeneratorSchema = z.object({
  resourceId: z.string().uuid(),
  questionCount: z.coerce.number().int().min(5).max(50),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

export const flashcardGeneratorSchema = z.object({
  resourceId: z.string().uuid(),
  cardCount: z.coerce.number().int().min(5).max(50),
});

export const searchSchema = z.object({
  query: z.string().min(1),
  yearId: z.string().uuid().optional(),
  subjectId: z.string().uuid().optional(),
  type: z.enum(['exam', 'notes', 'practical', 'drive_link', 'other']).optional(),
  sortBy: z.enum(['relevance', 'date', 'downloads']).default('relevance'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ActivationCodeInput = z.infer<typeof activationCodeSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ResourceUploadInput = z.infer<typeof resourceUploadSchema>;
export type ExamGeneratorInput = z.infer<typeof examGeneratorSchema>;
export type FlashcardGeneratorInput = z.infer<typeof flashcardGeneratorSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
