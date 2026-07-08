# Database Schema

## Overview

This document describes the complete database schema for UFAS Cortex, implemented in PostgreSQL via Supabase.

---

## Tables

### Academic Structure

#### academic_years

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| name | VARCHAR(100) | NOT NULL | Year name (e.g., "First Year") |
| order | INTEGER | NOT NULL, UNIQUE | Sort order |
| description | TEXT | NULLABLE | Year description |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | Default: NOW() | Last update timestamp |

**RLS:** All authenticated users can read; admins can manage.

#### semesters

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| year_id | UUID | FK → academic_years.id, NOT NULL | Parent year |
| name | VARCHAR(100) | NOT NULL | Semester name |
| code | VARCHAR(20) | NOT NULL | Semester code (S1, U1, etc.) |
| order | INTEGER | NOT NULL | Sort order |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | Default: NOW() | Last update timestamp |

**Constraints:** UNIQUE(year_id, code)

**RLS:** All authenticated users can read; admins can manage.

#### subjects

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| semester_id | UUID | FK → semesters.id, NOT NULL | Parent semester |
| name | VARCHAR(200) | NOT NULL | Subject name |
| code | VARCHAR(50) | NULLABLE | Subject code |
| description | TEXT | NULLABLE | Subject description |
| order | INTEGER | NOT NULL, Default: 0 | Sort order |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | Default: NOW() | Last update timestamp |

**RLS:** All authenticated users can read; admins can manage.

---

### Users

#### users

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, FK → auth.users.id | Supabase auth user ID |
| email | VARCHAR(255) | NOT NULL | User email |
| name | VARCHAR(200) | NULLABLE | Display name |
| avatar_url | TEXT | NULLABLE | Profile image URL |
| year_id | UUID | FK → academic_years.id, NULLABLE | Student's academic year |
| is_admin | BOOLEAN | Default: FALSE | Admin role flag |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | Default: NOW() | Last update timestamp |

**RLS:** Users can read/update own profile; admins can read all.

**Trigger:** Automatically created on auth.users insert via `handle_new_user()`.

---

### Resources

#### resources

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| title | VARCHAR(255) | NOT NULL | Resource title |
| description | TEXT | NULLABLE | Resource description |
| type | VARCHAR(20) | NOT NULL, CHECK | Resource type (exam, notes, practical, drive_link, other) |
| year_id | UUID | FK → academic_years.id, NOT NULL | Academic year |
| semester_id | UUID | FK → semesters.id, NULLABLE | Semester (optional) |
| subject_id | UUID | FK → subjects.id, NOT NULL | Subject |
| file_path | TEXT | NULLABLE | Storage path |
| file_size | BIGINT | NULLABLE | File size in bytes |
| drive_link | TEXT | NULLABLE | Google Drive link |
| download_count | INTEGER | Default: 0 | Total downloads |
| is_archived | BOOLEAN | Default: FALSE | Archived flag |
| uploaded_by | UUID | FK → users.id, NOT NULL | Admin who uploaded |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | Default: NOW() | Last update timestamp |

**Constraints:** 
- CHECK: (type = 'drive_link' AND drive_link IS NOT NULL) OR (type != 'drive_link' AND file_path IS NOT NULL)

**RLS:** Authenticated users can read non-archived; admins can manage all.

---

### User Tracking

#### bookmarks

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| user_id | UUID | FK → users.id, NOT NULL | User who bookmarked |
| resource_id | UUID | FK → resources.id, NOT NULL | Bookmarked resource |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |

**Constraints:** UNIQUE(user_id, resource_id)

**RLS:** Users can read/insert/delete own bookmarks.

#### downloads

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| user_id | UUID | FK → users.id, NOT NULL | User who downloaded |
| resource_id | UUID | FK → resources.id, NOT NULL | Downloaded resource |
| created_at | TIMESTAMPTZ | Default: NOW() | Download timestamp |

**Index:** user_id, resource_id

**RLS:** Users can read/insert own downloads.

---

### Premium System

#### activation_codes

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| code | VARCHAR(20) | UNIQUE, NOT NULL | Activation code (CORTEX-XXXX-XXXX-XXXX) |
| duration_days | INTEGER | NOT NULL, Default: 90 | Subscription duration |
| max_uses | INTEGER | Default: 1 | Maximum uses (always 1) |
| current_uses | INTEGER | Default: 0 | Current use count |
| expires_at | TIMESTAMPTZ | NULLABLE | Code expiry date |
| created_by | UUID | FK → users.id, NOT NULL | Admin who created |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |
| used_by | UUID | FK → users.id, NULLABLE | User who redeemed |
| used_at | TIMESTAMPTZ | NULLABLE | Redemption timestamp |
| is_active | BOOLEAN | Default: TRUE | Active flag |

**RLS:** Admin only access.

#### premium_subscriptions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| user_id | UUID | FK → users.id, UNIQUE, NOT NULL | Subscriber |
| activated_at | TIMESTAMPTZ | Default: NOW() | Activation timestamp |
| expires_at | TIMESTAMPTZ | NOT NULL | Expiration timestamp |
| activation_code_id | UUID | FK → activation_codes.id, NOT NULL | Used code |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | Default: NOW() | Last update timestamp |

**RLS:** Users can read own subscription; admins can manage all.

#### quota_usage

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| user_id | UUID | FK → users.id, NOT NULL | User |
| feature | VARCHAR(20) | NOT NULL, CHECK | Feature (summary, exam, flashcard) |
| used | INTEGER | Default: 0 | Usage count |
| limit | INTEGER | NOT NULL, Default: 50 | Monthly limit |
| period_start | TIMESTAMPTZ | NOT NULL | Period start |
| period_end | TIMESTAMPTZ | NOT NULL | Period end |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | Default: NOW() | Last update timestamp |

**Constraints:** UNIQUE(user_id, feature, period_start)

**RLS:** Users can read own quota.

---

### AI Features

#### ai_summaries

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| user_id | UUID | FK → users.id, NOT NULL | User who generated |
| resource_id | UUID | FK → resources.id, NOT NULL | Source resource |
| content | TEXT | NOT NULL | Generated summary |
| model | VARCHAR(100) | Default: 'gpt-4-turbo-preview' | AI model used |
| tokens_used | INTEGER | Default: 0 | Tokens consumed |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |

**RLS:** Users can read own summaries.

#### ai_exams

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| user_id | UUID | FK → users.id, NOT NULL | User who generated |
| resource_id | UUID | FK → resources.id, NOT NULL | Source resource |
| questions | JSONB | NOT NULL | Generated MCQ questions |
| score | INTEGER | NULLABLE | Exam score |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |
| completed_at | TIMESTAMPTZ | NULLABLE | Completion timestamp |

**RLS:** Users can read/update own exams.

#### ai_flashcard_decks

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| user_id | UUID | FK → users.id, NOT NULL | User who generated |
| resource_id | UUID | FK → resources.id, NOT NULL | Source resource |
| title | VARCHAR(200) | NOT NULL | Deck title |
| cards | JSONB | NOT NULL | Generated flashcards |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |

**RLS:** Users can read own flashcard decks.

---

### Community

#### posts

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| user_id | UUID | FK → users.id, NOT NULL | Post author |
| title | VARCHAR(255) | NOT NULL | Post title |
| content | TEXT | NOT NULL | Post content |
| is_pinned | BOOLEAN | Default: FALSE | Pinned flag |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | Default: NOW() | Last update timestamp |

**RLS:** All authenticated can read; authors can manage own posts.

#### comments

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| post_id | UUID | FK → posts.id, NOT NULL | Parent post |
| user_id | UUID | FK → users.id, NOT NULL | Comment author |
| parent_id | UUID | FK → comments.id, NULLABLE | Parent comment (threaded) |
| content | TEXT | NOT NULL | Comment content |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |
| updated_at | TIMESTAMPTZ | Default: NOW() | Last update timestamp |

**RLS:** All authenticated can read; authors can delete own comments.

#### notifications

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| user_id | UUID | FK → users.id, NOT NULL | Notification recipient |
| type | VARCHAR(50) | NOT NULL | Notification type |
| title | VARCHAR(200) | NOT NULL | Notification title |
| message | TEXT | NOT NULL | Notification message |
| action_url | TEXT | NULLABLE | Link to relevant resource |
| is_read | BOOLEAN | Default: FALSE | Read status |
| created_at | TIMESTAMPTZ | Default: NOW() | Creation timestamp |

**Index:** user_id WHERE is_read = FALSE

**RLS:** Users can read/update own notifications.

---

### Admin

#### system_settings

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| key | VARCHAR(100) | UNIQUE, NOT NULL | Setting key |
| value | JSONB | NOT NULL | Setting value |
| description | TEXT | NULLABLE | Setting description |
| updated_at | TIMESTAMPTZ | Default: NOW() | Last update timestamp |
| updated_by | UUID | FK → users.id, NOT NULL | Admin who updated |

**RLS:** Admin only access.

#### admin_logs

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default: gen_random_uuid() | Primary key |
| admin_id | UUID | FK → users.id, NOT NULL | Admin who performed action |
| action | VARCHAR(100) | NOT NULL | Action type |
| target_type | VARCHAR(50) | NOT NULL | Target entity type |
| target_id | UUID | NULLABLE | Target entity ID |
| details | JSONB | NULLABLE | Action details |
| ip_address | INET | NULLABLE | Request IP |
| created_at | TIMESTAMPTZ | Default: NOW() | Action timestamp |

**Index:** admin_id, created_at

**RLS:** Admin only access.

---

## Functions

### is_premium(user_id UUID) → BOOLEAN

Returns TRUE if user has active premium subscription.

```sql
SELECT is_premium('user-uuid');
```

### get_remaining_quota(user_id UUID, feature TEXT) → INTEGER

Returns remaining quota for the current period.

```sql
SELECT get_remaining_quota('user-uuid', 'summary');
```

---

## Triggers

### handle_new_user()

Automatically creates a profile in `users` table when a new user signs up via Supabase Auth.

### update_updated_at()

Automatically updates `updated_at` timestamp on row modification.

---

## Storage

### resources bucket

- **Public:** No
- **Policies:**
  - Read: All authenticated users
  - Write: Admins only
  - Delete: Admins only

---

## Relationships Summary

```
academic_years (6)
    └── semesters (14)
            └── subjects (60)

users
    ├── bookmarks
    ├── downloads
    ├── premium_subscriptions
    ├── quota_usage
    ├── ai_summaries
    ├── ai_exams
    ├── ai_flashcard_decks
    ├── posts
    │       └── comments
    └── notifications

resources
    ├── bookmarks
    ├── downloads
    ├── ai_summaries
    ├── ai_exams
    └── ai_flashcard_decks

activation_codes
    └── premium_subscriptions
```

---

## Migrations

| File | Description |
|------|-------------|
| 001_initial_schema | Complete database schema with RLS policies |
| 002_seed_academic_structure | Seed academic years, semesters, and subjects |
