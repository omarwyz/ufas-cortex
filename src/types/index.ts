import type { User } from '@supabase/supabase-js';

import type {
  AcademicYear,
  Semester,
  Subject,
  Resource,
  Bookmark,
  Download,
  ActivationCode,
  PremiumSubscription,
  AISummary,
  AIExam,
  AIFlashcardDeck,
  QuotaUsage,
  Post,
  Comment,
  Notification,
} from './database';

export type {
  AcademicYear,
  Semester,
  Subject,
  Resource,
  Bookmark,
  Download,
  ActivationCode,
  PremiumSubscription,
  AISummary,
  AIExam,
  AIFlashcardDeck,
  QuotaUsage,
  Post,
  Comment,
  Notification,
};

export interface UserWithProfile extends User {
  profile: {
    id: string;
    name: string | null;
    avatar_url: string | null;
    year_id: string | null;
    is_admin: boolean;
  };
  premium?: PremiumSubscription | null;
}

export interface ResourceWithRelations extends Resource {
  year: AcademicYear;
  semester: Semester | null;
  subject: Subject;
  is_bookmarked?: boolean;
}

export interface YearWithSemesters extends AcademicYear {
  semesters: Semester[];
}

export interface SemesterWithSubjects extends Semester {
  subjects: Subject[];
}

export interface SubjectWithResources extends Subject {
  resources: Resource[];
  resource_count: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
    retryAfter?: number;
  };
}

export interface UserStats {
  downloads: number;
  bookmarks: number;
  ai_summaries: number;
  ai_exams: number;
  ai_flashcards: number;
}

export interface AdminStats {
  total_users: number;
  total_resources: number;
  total_premium: number;
  active_users_today: number;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correct_option_id: string;
  explanation?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export type UserRole = 'student' | 'premium' | 'admin';

export type Theme = 'light' | 'dark' | 'system';
