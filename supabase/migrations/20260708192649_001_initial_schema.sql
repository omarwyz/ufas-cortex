-- ============================================
-- UFAS Cortex Database Schema
-- Version: 1.0
-- ============================================

-- ============================================
-- CORE TABLES
-- ============================================

-- Academic Years
CREATE TABLE academic_years (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  "order" INTEGER NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Semesters
CREATE TABLE semesters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) NOT NULL,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(year_id, code)
);

-- Subjects
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  code VARCHAR(50),
  description TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(200),
  avatar_url TEXT,
  year_id UUID REFERENCES academic_years(id) ON DELETE SET NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resources
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('exam', 'notes', 'practical', 'drive_link', 'other')),
  year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  semester_id UUID REFERENCES semesters(id) ON DELETE SET NULL,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  file_path TEXT,
  file_size BIGINT,
  drive_link TEXT,
  download_count INTEGER DEFAULT 0,
  is_archived BOOLEAN DEFAULT FALSE,
  uploaded_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_resource CHECK (
    (type = 'drive_link' AND drive_link IS NOT NULL) OR
    (type != 'drive_link' AND file_path IS NOT NULL)
  )
);

-- Bookmarks/Favorites
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, resource_id)
);

-- Downloads
CREATE TABLE downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_downloads_user_id ON downloads(user_id);
CREATE INDEX idx_downloads_resource_id ON downloads(resource_id);

-- ============================================
-- PREMIUM SYSTEM
-- ============================================

-- Activation Codes
CREATE TABLE activation_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) UNIQUE NOT NULL,
  duration_days INTEGER NOT NULL DEFAULT 90,
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  used_by UUID REFERENCES users(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  CHECK (code ~ '^CORTEX-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$')
);

-- Premium Subscriptions
CREATE TABLE premium_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  activation_code_id UUID NOT NULL REFERENCES activation_codes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quota Usage
CREATE TABLE quota_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  feature VARCHAR(20) NOT NULL CHECK (feature IN ('summary', 'exam', 'flashcard')),
  used INTEGER DEFAULT 0,
  "limit" INTEGER NOT NULL DEFAULT 50,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, feature, period_start)
);

-- ============================================
-- AI FEATURES
-- ============================================

-- AI Summaries
CREATE TABLE ai_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  model VARCHAR(100) DEFAULT 'gpt-4-turbo-preview',
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Exams
CREATE TABLE ai_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  questions JSONB NOT NULL,
  score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- AI Flashcard Decks
CREATE TABLE ai_flashcard_decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  cards JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COMMUNITY
-- ============================================

-- Posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  action_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_unread ON notifications(user_id) WHERE is_read = FALSE;

-- ============================================
-- ADMIN
-- ============================================

-- System Settings
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Admin Audit Logs
CREATE TABLE admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50) NOT NULL,
  target_id UUID,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_logs_admin ON admin_logs(admin_id);
CREATE INDEX idx_admin_logs_created ON admin_logs(created_at);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE activation_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quota_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_flashcard_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES: Academic Structure (Read for all authenticated)
-- ============================================

CREATE POLICY "academic_years_select" ON academic_years
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "semesters_select" ON semesters
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "subjects_select" ON subjects
  FOR SELECT TO authenticated USING (true);

-- Admin can manage academic structure
CREATE POLICY "academic_years_admin_all" ON academic_years
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "semesters_admin_all" ON semesters
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "subjects_admin_all" ON subjects
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- ============================================
-- RLS POLICIES: Users
-- ============================================

CREATE POLICY "users_select_own" ON users
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "users_update_own" ON users
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "users_insert" ON users
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Admin can view all users
CREATE POLICY "users_admin_select" ON users
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- ============================================
-- RLS POLICIES: Resources
-- ============================================

-- All authenticated users can read non-archived resources
CREATE POLICY "resources_select" ON resources
  FOR SELECT TO authenticated USING (is_archived = false);

-- Admin can manage all resources
CREATE POLICY "resources_admin_all" ON resources
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- ============================================
-- RLS POLICIES: Bookmarks
-- ============================================

CREATE POLICY "bookmarks_select_own" ON bookmarks
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "bookmarks_insert_own" ON bookmarks
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bookmarks_delete_own" ON bookmarks
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES: Downloads
-- ============================================

CREATE POLICY "downloads_select_own" ON downloads
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "downloads_insert_own" ON downloads
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES: Premium
-- ============================================

-- Users can read their own subscription
CREATE POLICY "subscriptions_select_own" ON premium_subscriptions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Admin can manage all subscriptions
CREATE POLICY "subscriptions_admin_all" ON premium_subscriptions
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- Activation codes: admin only
CREATE POLICY "codes_admin_all" ON activation_codes
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- Quota: users can read their own
CREATE POLICY "quota_select_own" ON quota_usage
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES: AI Features
-- ============================================

-- Users can read their own AI content
CREATE POLICY "ai_summaries_own" ON ai_summaries
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "ai_exams_own" ON ai_exams
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "ai_flashcards_own" ON ai_flashcard_decks
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Users can insert AI content (premium check in application logic)
CREATE POLICY "ai_summaries_insert" ON ai_summaries
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ai_exams_insert" ON ai_exams
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ai_exams_update" ON ai_exams
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "ai_flashcards_insert" ON ai_flashcard_decks
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES: Community
-- ============================================

-- Posts: all authenticated can read
CREATE POLICY "posts_select" ON posts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "posts_insert_own" ON posts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "posts_update_own" ON posts
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "posts_delete_own" ON posts
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Comments
CREATE POLICY "comments_select" ON comments
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "comments_insert_own" ON comments
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "comments_delete_own" ON comments
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Notifications
CREATE POLICY "notifications_own" ON notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "notifications_update_own" ON notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES: Admin Tables
-- ============================================

CREATE POLICY "settings_admin_all" ON system_settings
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "logs_admin_all" ON admin_logs
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- ============================================
-- TRIGGERS & FUNCTIONS
-- ============================================

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update timestamp triggers
CREATE TRIGGER update_academic_years_updated_at BEFORE UPDATE ON academic_years
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_semesters_updated_at BEFORE UPDATE ON semesters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON premium_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_quota_updated_at BEFORE UPDATE ON quota_usage
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Create user on auth.users insert
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- FUNCTIONS
-- ============================================

-- Check if user has premium
CREATE OR REPLACE FUNCTION is_premium(p_user_id UUID)
RETURNS BOOLEAN AS $$
SELECT EXISTS (
  SELECT 1 FROM premium_subscriptions
  WHERE user_id = $1 AND expires_at > NOW()
);
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Get remaining quota for user
CREATE OR REPLACE FUNCTION get_remaining_quota(
  p_user_id UUID,
  p_feature TEXT
)
RETURNS INTEGER AS $$
DECLARE
  v_used INTEGER;
  v_limit INTEGER;
BEGIN
  SELECT used, "limit" INTO v_used, v_limit
  FROM quota_usage
  WHERE user_id = p_user_id
    AND feature = p_feature
    AND period_start <= NOW()
    AND period_end >= NOW();
  
  IF NOT FOUND THEN
    RETURN 50; -- Default limit
  END IF;
  
  RETURN GREATEST(0, v_limit - v_used);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================
-- STORAGE BUCKET
-- ============================================

-- Create storage bucket for resources (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: authenticated users can read
CREATE POLICY "resources_storage_read" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'resources');

-- Storage policy: only admin can upload
CREATE POLICY "resources_storage_write" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'resources'
    AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "resources_storage_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'resources'
    AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );