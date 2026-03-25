# First Steps — Getting MemoryBox Running

## 1. Create Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) and create a new project
2. Copy your **Project URL** and **anon public key** from Settings → API
3. Update `src/lib/constants.ts`:
   ```ts
   export const SUPABASE_URL = "https://YOUR_PROJECT_REF.supabase.co";
   export const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";
   ```

## 2. Apply Database Migrations

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

This applies all 3 migrations (schema, RLS, auth trigger) and creates:
- 11 tables with enums, indexes, and triggers
- Row-level security on every table
- Auto user row creation on signup

## 3. Seed Categories

```bash
npx supabase db seed
```

Or run `supabase/seed.sql` manually in the Supabase SQL Editor. This inserts all 14 moment categories.

## 4. Create Storage Bucket

In the Supabase Dashboard:
1. Go to Storage → New Bucket
2. Name: `memorybox-media`
3. Public: **No** (private bucket)
4. Then run the commented-out storage policies from `supabase/migrations/002_rls_policies.sql` in the SQL Editor

## 5. Start the App

```bash
npx expo start
```

Scan the QR code with Expo Go (iOS/Android) or press `i` for iOS simulator / `a` for Android emulator.

## 6. Test the Flow

1. **Sign up** with email + password
2. **Onboarding** — enter family name, add your first child
3. **Navigate** — all 5 tabs should work (Home, Explore, +, Inbox, Profile)
4. **Profile** — edit family name, add/edit children and people
5. **Sign out** and sign in again to verify session persistence

## What Was Built (Phase 1)

### Backend (Supabase)
- `supabase/migrations/001_initial_schema.sql` — 11 tables, 4 enums, 6 indexes, auto-update triggers
- `supabase/migrations/002_rls_policies.sql` — RLS on all tables (user_id = auth.uid())
- `supabase/migrations/003_auth_trigger.sql` — auto-create user row on signup
- `supabase/seed.sql` — 14 moment categories

### App Foundation
- Expo + NativeWind v4 + TanStack Query + Supabase client with SecureStore
- `AuthProvider` + `QueryProvider` wrapping the app
- Root layout with auth redirect + onboarding check

### Navigation (5 tabs)
- Home, Explore, Add (+FAB), Inbox, Profile
- Custom TabBar with elevated FAB button
- Hidden routes for moment detail, onboarding, profile sub-screens

### API + Hooks
- `src/api/` — families, children, people, categories (pure async functions)
- `src/hooks/` — React Query hooks wrapping each API module

### UI Components
- Button (4 variants), Input, Avatar (initials fallback), CategoryBadge, ChildSelector, EmptyState, Card, Header

### Screens
- **Auth:** sign-in, sign-up (email/password)
- **Profile:** settings hub, family name edit, children CRUD, people CRUD
- **Onboarding:** 4-step flow (welcome → family name → first child → done)

## Next: Phase 2 — Core Experience (Weeks 4–8)

See `PLAN.md` for the full roadmap. Phase 2 covers:
- Media capture + compression pipeline
- Moment creation flow
- Timeline view with pagination
- Moment detail + editing
- Category & people filtering
- Inbox / quick capture
