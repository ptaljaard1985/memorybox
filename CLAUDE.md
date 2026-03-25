# MemoryBox

Mobile-first app for parents to capture and preserve children's moments — photos, videos, audio, and notes — in a secure digital memory vault.

## Tech Stack

- **App**: Expo SDK 55 (React Native 0.83) + TypeScript with Expo Router (file-based routing)
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **State**: TanStack React Query v5 (server state) + React Context (UI state)
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Payments**: RevenueCat (Apple/Google subscription management)
- **Notifications**: Expo Notifications + Supabase Edge Functions (daily cron)
- **Media**: expo-image-manipulator (compression), expo-av (audio/video), react-native-view-shot (sharing)

## Project Structure

```
app/                          # Expo Router screens
  (auth)/                     # Auth screens (sign-in, sign-up)
  (app)/                      # Main app (5-tab layout)
    moment/                   # Moment detail, edit, share
    profile/                  # Family, children, people management
      children/               # Children CRUD screens
      people/                 # People CRUD screens
src/
  api/                        # Pure async Supabase query functions
  hooks/                      # React Query hooks wrapping api/ functions
  lib/                        # Utilities (supabase client, constants)
  components/ui/              # Reusable UI components (Button, Input, Avatar, etc.)
  providers/                  # AuthProvider, QueryProvider
  theme/                      # Colors, typography, spacing
supabase/
  migrations/                 # SQL migrations (numbered 001–003)
  seed.sql                    # Category seed data (14 categories)
```

## Architecture Patterns

- **API layer separation**: `src/api/*.ts` has pure async functions; `src/hooks/*.ts` wraps them in React Query. Keep these separate.
- **Subscription enforcement is dual-layer**: RevenueCat client-side + `users.subscription_tier` server-side via webhook. Both must agree.
- **Inbox is a flag, not a table**: `moments.is_in_inbox = true` — categorising is just updating the moment.
- **Media compression is always client-side** before upload (1200px max, JPEG quality 80%).
- **RLS on every table**: `user_id = auth.uid()`. Join tables check parent moment's user_id via subquery.
- **Auth tokens stored in SecureStore**: Supabase client uses `expo-secure-store` adapter, not AsyncStorage.
- **Onboarding state**: `users.onboarding_completed` boolean — root layout checks this to redirect new users.

## Key Commands

```bash
npx expo start                # Start dev server
npx expo start --clear        # Start with cache cleared
npx tsc --noEmit              # Type check
eas build --profile dev       # Development build
eas build --profile prod      # Production build
eas update                    # OTA update
npx supabase db push          # Push migrations
npx supabase functions serve  # Local edge functions
```

## Conventions

- Use NativeWind `className` for all styling — no StyleSheet.create
- Use `date-fns` for all date formatting/calculation
- Store all env vars (Supabase URL, anon key, RevenueCat key) in `src/lib/constants.ts`
- Moment media storage path: `{user_id}/{child_id}/{type}/{moment_id}_{order}.ext`
- All Supabase tables use UUID primary keys and `created_at`/`updated_at` timestamps
- Free tier: 50 lifetime moments, 1 child, 1 photo/moment, no video/audio/inbox
- Premium: unlimited everything at R99/mo (ZAR), EUR4.99, USD4.99
- Color palette: soft blue primary (#4A90D9), warm amber secondary (#F5A623), warm off-white background (#FAFAF8)

## Session Log

### Session 1 — 2026-03-25

**What we built:**
- Full Phase 1 foundation (all 10 steps from PLAN.md)
- Expo project with NativeWind v4, TanStack Query, Supabase client
- Database schema: 11 tables, 4 enums, 6 indexes, RLS on everything, auth trigger
- 14 seeded moment categories
- Auth flow: email/password sign-in/sign-up with AuthProvider context
- 5-tab navigation shell with custom TabBar and central FAB button
- API layer + React Query hooks for families, children, people, categories
- 8 shared UI components (Button, Input, Avatar, CategoryBadge, ChildSelector, EmptyState, Card, Header)
- Profile management screens: family name, children CRUD, people CRUD
- 4-step onboarding flow: welcome → family name → first child → done

**Decisions made:**
- NativeWind v4 over Tamagui/StyleSheet (fast DX, Tailwind familiarity)
- Email-only auth for MVP (Google + Apple added pre-launch)
- Warm family-friendly color palette (blue/amber/off-white)
- `@react-native-community/datetimepicker` for native date pickers
- Removed template boilerplate (components/, constants/, (tabs)/) in favor of src/ structure

**Incomplete / next session:**
- Supabase project not yet created — need to set URL + anon key in constants.ts
- Storage bucket `memorybox-media` needs manual creation + storage policies
- EAS not initialized (need `eas init` + `eas build:configure`)
- Phase 2: media pipeline, moment creation, timeline, detail, filtering, inbox
