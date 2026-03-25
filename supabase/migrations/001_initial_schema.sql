-- MemoryBox Initial Schema
-- All tables use UUID primary keys, created_at/updated_at timestamps, and RLS

-- ============================================================
-- Extensions
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- Custom ENUM Types
-- ============================================================
CREATE TYPE subscription_tier AS ENUM ('free', 'premium');
CREATE TYPE child_status AS ENUM ('expecting', 'born');
CREATE TYPE media_type AS ENUM ('photo', 'video', 'audio');
CREATE TYPE notification_type AS ENUM ('reminder', 'flashback', 'prompt', 'system');

-- ============================================================
-- Helper: auto-update updated_at timestamp
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Table: categories (lookup, no FK)
-- ============================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  emoji TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- ============================================================
-- Table: users
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  subscription_tier subscription_tier NOT NULL DEFAULT 'free',
  subscription_expires_at TIMESTAMPTZ,
  reminder_interval_days INTEGER NOT NULL DEFAULT 30,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  expo_push_token TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Table: families
-- ============================================================
CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Table: children
-- ============================================================
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status child_status NOT NULL DEFAULT 'born',
  date_of_birth DATE,
  expected_due_date DATE,
  avatar_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER children_updated_at
  BEFORE UPDATE ON children
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Table: people
-- ============================================================
CREATE TABLE people (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Table: moments
-- ============================================================
CREATE TABLE moments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL CHECK (char_length(title) <= 100),
  note TEXT CHECK (char_length(note) <= 5000),
  moment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_in_inbox BOOLEAN NOT NULL DEFAULT false,
  has_video BOOLEAN NOT NULL DEFAULT false,
  has_audio BOOLEAN NOT NULL DEFAULT false,
  media_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER moments_updated_at
  BEFORE UPDATE ON moments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Table: moment_children (join table)
-- ============================================================
CREATE TABLE moment_children (
  moment_id UUID NOT NULL REFERENCES moments(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  PRIMARY KEY (moment_id, child_id)
);

-- ============================================================
-- Table: moment_people (join table)
-- ============================================================
CREATE TABLE moment_people (
  moment_id UUID NOT NULL REFERENCES moments(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  PRIMARY KEY (moment_id, person_id)
);

-- ============================================================
-- Table: moment_media
-- ============================================================
CREATE TABLE moment_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  moment_id UUID NOT NULL REFERENCES moments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  media_type media_type NOT NULL,
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  file_size_bytes BIGINT NOT NULL DEFAULT 0,
  width INTEGER,
  height INTEGER,
  duration_seconds INTEGER,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Table: notification_log
-- ============================================================
CREATE TABLE notification_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notification_type notification_type NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  opened_at TIMESTAMPTZ
);

-- ============================================================
-- Indexes
-- ============================================================

-- Primary timeline query
CREATE INDEX idx_moments_user_date ON moments (user_id, moment_date DESC);

-- Filtered timeline by category
CREATE INDEX idx_moments_user_category_date ON moments (user_id, category_id, moment_date DESC);

-- Inbox view
CREATE INDEX idx_moments_user_inbox ON moments (user_id, is_in_inbox) WHERE is_in_inbox = true;

-- Child timeline lookup
CREATE INDEX idx_moment_children_child ON moment_children (child_id, moment_id);

-- Person filter lookup
CREATE INDEX idx_moment_people_person ON moment_people (person_id, moment_id);

-- Gallery ordering
CREATE INDEX idx_moment_media_order ON moment_media (moment_id, display_order);
