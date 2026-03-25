# Module: src/

Core application code for MemoryBox.

## Submodules

### api/
Pure async functions that call Supabase. No React dependencies. Each file maps to a database table or domain:
- `families.ts` — CRUD for families table
- `children.ts` — CRUD for children table (supports expecting/born status)
- `people.ts` — CRUD for people table (grandparents, friends, teachers)
- `categories.ts` — Read-only fetch of moment categories

### hooks/
React Query hooks wrapping the api/ functions. Naming convention: `use{Entity}.ts`.
- Each hook uses `useAuth()` to get the current user ID
- Mutations invalidate relevant query keys on success
- `useCategories` has 1-hour stale time (categories rarely change)

### lib/
- `supabase.ts` — Singleton Supabase client with expo-secure-store adapter
- `constants.ts` — All config values, tier limits, compression settings

### providers/
- `AuthProvider.tsx` — Wraps Supabase auth session. Exposes `session`, `user`, `profile`, auth methods. Fetches `public.users` profile after auth.
- `QueryProvider.tsx` — TanStack Query client with 5-min stale time, 2 retries.

### components/ui/
Shared UI components using NativeWind. All accept `className` prop for overrides.
- `Button` — 4 variants: primary, secondary, ghost, destructive
- `Input` — Text input with label and error state
- `Avatar` — Image with initials fallback
- `TabBar` — Custom 5-tab bar with central FAB
- `Header` — Screen header with back button and optional right action

### theme/
Design tokens exported as TypeScript constants. Also wired into `tailwind.config.js`.
- Colors: primary (#4A90D9), secondary (#F5A623), background (#FAFAF8)
- Typography: xs through 4xl
- Spacing: xs (4) through 4xl (48)

## Data Flow

```
User Action → Screen Component → React Query Hook → API Function → Supabase
                                        ↓
                                  Cache Update → UI Re-render
```

## Business Rules

- Free users limited to 50 lifetime moments, 1 child, 1 photo per moment, no video/audio/inbox
- All data is user-scoped via RLS — no cross-user data access possible
- Onboarding must complete (family + first child) before accessing main app
- Auth tokens persisted in SecureStore (not AsyncStorage) for security
