# Module: supabase/

Database schema, security policies, and backend functions for MemoryBox.

## Migrations

Applied in order:

1. **001_initial_schema.sql** — All tables, enums, indexes, triggers
   - 4 enum types: subscription_tier, child_status, media_type, notification_type
   - 11 tables: users, families, children, people, moments, moment_children, moment_people, moment_media, notification_log, categories
   - 6 performance indexes (timeline, inbox, child lookup, person lookup, gallery order)
   - Auto-update `updated_at` trigger on users, children, moments

2. **002_rls_policies.sql** — Row-Level Security
   - Every table has RLS enabled
   - Direct tables: `user_id = auth.uid()`
   - Join tables: subquery check on parent moment's user_id
   - Categories: read-only for all authenticated users
   - Storage policies included as comments (apply after bucket creation)

3. **003_auth_trigger.sql** — Auto user creation
   - Trigger on `auth.users` INSERT creates a row in `public.users`
   - Pulls display_name from user metadata
   - Uses SECURITY DEFINER to bypass RLS during insert

## seed.sql

Inserts 14 moment categories (pregnancy, birth_story, life_milestone, etc.) with slugs, labels, emojis, and display order. Uses ON CONFLICT DO NOTHING for idempotency.

## Storage

Bucket `memorybox-media` (private) — must be created manually in dashboard.
Path convention: `{user_id}/{child_id}/{type}/{moment_id}_{order}.ext`

## Key Constraints

- All PKs are UUID (uuid_generate_v4)
- Cascading deletes: deleting a user cascades to all their data
- Deleting a moment cascades to moment_children, moment_people, moment_media
- Title max 100 chars, note max 5000 chars (enforced via CHECK constraints)
- moment_date defaults to CURRENT_DATE
