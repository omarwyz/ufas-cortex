export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          year_id: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          year_id?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          year_id?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      academic_years: {
        Row: {
          id: string;
          name: string;
          order: number;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          order: number;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          order?: number;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      semesters: {
        Row: {
          id: string;
          year_id: string;
          name: string;
          code: string;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          year_id: string;
          name: string;
          code: string;
          order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          year_id?: string;
          name?: string;
          code?: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      subjects: {
        Row: {
          id: string;
          semester_id: string;
          name: string;
          code: string | null;
          description: string | null;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          semester_id: string;
          name: string;
          code?: string | null;
          description?: string | null;
          order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          semester_id?: string;
          name?: string;
          code?: string | null;
          description?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      resources: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          type: 'exam' | 'notes' | 'practical' | 'drive_link' | 'other';
          year_id: string;
          semester_id: string | null;
          subject_id: string;
          file_path: string | null;
          file_size: number | null;
          drive_link: string | null;
          download_count: number;
          is_archived: boolean;
          uploaded_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          type: 'exam' | 'notes' | 'practical' | 'drive_link' | 'other';
          year_id: string;
          semester_id?: string | null;
          subject_id: string;
          file_path?: string | null;
          file_size?: number | null;
          drive_link?: string | null;
          download_count?: number;
          is_archived?: boolean;
          uploaded_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          type?: 'exam' | 'notes' | 'practical' | 'drive_link' | 'other';
          year_id?: string;
          semester_id?: string | null;
          subject_id?: string;
          file_path?: string | null;
          file_size?: number | null;
          drive_link?: string | null;
          download_count?: number;
          is_archived?: boolean;
          uploaded_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          resource_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          resource_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          resource_id?: string;
          created_at?: string;
        };
      };
      downloads: {
        Row: {
          id: string;
          user_id: string;
          resource_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          resource_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          resource_id?: string;
          created_at?: string;
        };
      };
      activation_codes: {
        Row: {
          id: string;
          code: string;
          duration_days: number;
          max_uses: number;
          current_uses: number;
          expires_at: string | null;
          created_by: string;
          created_at: string;
          used_by: string | null;
          used_at: string | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          code: string;
          duration_days?: number;
          max_uses?: number;
          current_uses?: number;
          expires_at?: string | null;
          created_by: string;
          created_at?: string;
          used_by?: string | null;
          used_at?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          code?: string;
          duration_days?: number;
          max_uses?: number;
          current_uses?: number;
          expires_at?: string | null;
          created_by?: string;
          created_at?: string;
          used_by?: string | null;
          used_at?: string | null;
          is_active?: boolean;
        };
      };
      premium_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          activated_at: string;
          expires_at: string;
          activation_code_id: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          activated_at?: string;
          expires_at: string;
          activation_code_id: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          activated_at?: string;
          expires_at?: string;
          activation_code_id?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_summaries: {
        Row: {
          id: string;
          user_id: string;
          resource_id: string;
          content: string;
          model: string;
          tokens_used: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          resource_id: string;
          content: string;
          model?: string;
          tokens_used?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          resource_id?: string;
          content?: string;
          model?: string;
          tokens_used?: number;
          created_at?: string;
        };
      };
      ai_exams: {
        Row: {
          id: string;
          user_id: string;
          resource_id: string;
          questions: Json;
          score: number | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          resource_id: string;
          questions: Json;
          score?: number | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          resource_id?: string;
          questions?: Json;
          score?: number | null;
          created_at?: string;
          completed_at?: string | null;
        };
      };
      ai_flashcard_decks: {
        Row: {
          id: string;
          user_id: string;
          resource_id: string;
          title: string;
          cards: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          resource_id: string;
          title: string;
          cards: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          resource_id?: string;
          title?: string;
          cards?: Json;
          created_at?: string;
        };
      };
      quota_usage: {
        Row: {
          id: string;
          user_id: string;
          feature: 'summary' | 'exam' | 'flashcard';
          used: number;
          limit: number;
          period_start: string;
          period_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          feature: 'summary' | 'exam' | 'flashcard';
          used?: number;
          limit?: number;
          period_start: string;
          period_end: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          feature?: 'summary' | 'exam' | 'flashcard';
          used?: number;
          limit?: number;
          period_start?: string;
          period_end?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      system_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          description: string | null;
          updated_at: string;
          updated_by: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          description?: string | null;
          updated_at?: string;
          updated_by: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          description?: string | null;
          updated_at?: string;
          updated_by?: string;
        };
      };
      admin_logs: {
        Row: {
          id: string;
          admin_id: string;
          action: string;
          target_type: string;
          target_id: string | null;
          details: Json | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id: string;
          action: string;
          target_type: string;
          target_id?: string | null;
          details?: Json | null;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string;
          action?: string;
          target_type?: string;
          target_id?: string | null;
          details?: Json | null;
          ip_address?: string | null;
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          is_pinned: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: string;
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          parent_id: string | null;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          parent_id?: string | null;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          parent_id?: string | null;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          action_url: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          action_url?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          action_url?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      resource_type: 'exam' | 'notes' | 'practical' | 'drive_link' | 'other';
      ai_feature: 'summary' | 'exam' | 'flashcard';
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T];

export type User = Database['public']['Tables']['users']['Row'];
export type AcademicYear = Database['public']['Tables']['academic_years']['Row'];
export type Semester = Database['public']['Tables']['semesters']['Row'];
export type Subject = Database['public']['Tables']['subjects']['Row'];
export type Resource = Database['public']['Tables']['resources']['Row'];
export type Bookmark = Database['public']['Tables']['bookmarks']['Row'];
export type Download = Database['public']['Tables']['downloads']['Row'];
export type ActivationCode = Database['public']['Tables']['activation_codes']['Row'];
export type PremiumSubscription = Database['public']['Tables']['premium_subscriptions']['Row'];
export type AISummary = Database['public']['Tables']['ai_summaries']['Row'];
export type AIExam = Database['public']['Tables']['ai_exams']['Row'];
export type AIFlashcardDeck = Database['public']['Tables']['ai_flashcard_decks']['Row'];
export type QuotaUsage = Database['public']['Tables']['quota_usage']['Row'];
export type SystemSettings = Database['public']['Tables']['system_settings']['Row'];
export type AdminLog = Database['public']['Tables']['admin_logs']['Row'];
export type Post = Database['public']['Tables']['posts']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];

export type ResourceType = Database['public']['Enums']['resource_type'];
export type AIFeature = Database['public']['Enums']['ai_feature'];
