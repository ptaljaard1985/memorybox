-- MemoryBox Row-Level Security Policies
-- Every table has RLS enabled. Users can only access their own data.

-- ============================================================
-- Enable RLS on all tables
-- ============================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE moment_children ENABLE ROW LEVEL SECURITY;
ALTER TABLE moment_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE moment_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- categories: read-only for all authenticated users
-- ============================================================
CREATE POLICY "Categories are viewable by authenticated users"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================
-- users: own row only
-- ============================================================
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can delete own profile"
  ON users FOR DELETE
  TO authenticated
  USING (id = auth.uid());

-- ============================================================
-- families: owner only
-- ============================================================
CREATE POLICY "Families are viewable by owner"
  ON families FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Families are insertable by owner"
  ON families FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Families are updatable by owner"
  ON families FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Families are deletable by owner"
  ON families FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================
-- children: owner only
-- ============================================================
CREATE POLICY "Children are viewable by owner"
  ON children FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Children are insertable by owner"
  ON children FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Children are updatable by owner"
  ON children FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Children are deletable by owner"
  ON children FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================
-- people: owner only
-- ============================================================
CREATE POLICY "People are viewable by owner"
  ON people FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "People are insertable by owner"
  ON people FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "People are updatable by owner"
  ON people FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "People are deletable by owner"
  ON people FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================
-- moments: owner only
-- ============================================================
CREATE POLICY "Moments are viewable by owner"
  ON moments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Moments are insertable by owner"
  ON moments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Moments are updatable by owner"
  ON moments FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Moments are deletable by owner"
  ON moments FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================
-- moment_children: access via parent moment ownership
-- ============================================================
CREATE POLICY "Moment children viewable by moment owner"
  ON moment_children FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM moments
      WHERE moments.id = moment_children.moment_id
      AND moments.user_id = auth.uid()
    )
  );

CREATE POLICY "Moment children insertable by moment owner"
  ON moment_children FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM moments
      WHERE moments.id = moment_children.moment_id
      AND moments.user_id = auth.uid()
    )
  );

CREATE POLICY "Moment children deletable by moment owner"
  ON moment_children FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM moments
      WHERE moments.id = moment_children.moment_id
      AND moments.user_id = auth.uid()
    )
  );

-- ============================================================
-- moment_people: access via parent moment ownership
-- ============================================================
CREATE POLICY "Moment people viewable by moment owner"
  ON moment_people FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM moments
      WHERE moments.id = moment_people.moment_id
      AND moments.user_id = auth.uid()
    )
  );

CREATE POLICY "Moment people insertable by moment owner"
  ON moment_people FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM moments
      WHERE moments.id = moment_people.moment_id
      AND moments.user_id = auth.uid()
    )
  );

CREATE POLICY "Moment people deletable by moment owner"
  ON moment_people FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM moments
      WHERE moments.id = moment_people.moment_id
      AND moments.user_id = auth.uid()
    )
  );

-- ============================================================
-- moment_media: owner only
-- ============================================================
CREATE POLICY "Moment media viewable by owner"
  ON moment_media FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Moment media insertable by owner"
  ON moment_media FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Moment media updatable by owner"
  ON moment_media FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Moment media deletable by owner"
  ON moment_media FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================
-- notification_log: owner only
-- ============================================================
CREATE POLICY "Notification log viewable by owner"
  ON notification_log FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Notification log insertable by owner"
  ON notification_log FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- ============================================================
-- Storage policies (run in Supabase dashboard or via SQL)
-- Bucket: memorybox-media
-- ============================================================
-- NOTE: Storage bucket and policies must be created after the bucket exists.
-- These are included here for reference. Apply via Supabase dashboard if
-- the bucket is created there, or uncomment after bucket creation.

-- INSERT INTO storage.buckets (id, name, public) VALUES ('memorybox-media', 'memorybox-media', false);

-- CREATE POLICY "Users can upload to own folder"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH CHECK (bucket_id = 'memorybox-media' AND (storage.foldername(name))[1] = auth.uid()::text);

-- CREATE POLICY "Users can view own files"
--   ON storage.objects FOR SELECT
--   TO authenticated
--   USING (bucket_id = 'memorybox-media' AND (storage.foldername(name))[1] = auth.uid()::text);

-- CREATE POLICY "Users can update own files"
--   ON storage.objects FOR UPDATE
--   TO authenticated
--   USING (bucket_id = 'memorybox-media' AND (storage.foldername(name))[1] = auth.uid()::text);

-- CREATE POLICY "Users can delete own files"
--   ON storage.objects FOR DELETE
--   TO authenticated
--   USING (bucket_id = 'memorybox-media' AND (storage.foldername(name))[1] = auth.uid()::text);
