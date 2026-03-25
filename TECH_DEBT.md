# Tech Debt

## Pending Migrations

| Migration | Description | Status | Notes |
|-----------|-------------|--------|-------|
| 001_initial_schema.sql | All tables, enums, indexes, triggers | Ready | Not yet applied — needs Supabase project |
| 002_rls_policies.sql | RLS on all tables | Ready | Storage policies commented out — apply after bucket creation |
| 003_auth_trigger.sql | Auto-create user on signup | Ready | Uses SECURITY DEFINER |

## Code Cleanup

| Item | Priority | Notes |
|------|----------|-------|
| Storage bucket policies | High | Commented out in 002_rls_policies.sql — must apply manually after creating `memorybox-media` bucket in Supabase dashboard |
| Supabase constants placeholder | High | `src/lib/constants.ts` has placeholder URL and anon key — must be replaced before app runs |
| EAS not configured | Medium | Need to run `eas init` and `eas build:configure` to generate proper eas.json and link to Expo account |
| DateTimePicker platform handling | Low | Current implementation uses basic DateTimePicker — may need platform-specific modal wrapper on Android |

## Architectural Notes

| Topic | Decision | Rationale |
|-------|----------|-----------|
| No .env file | Constants stored in `src/lib/constants.ts` | Simpler for solo dev; move to `expo-constants` + `.env` before open-sourcing or adding contributors |
| No error boundary yet | Deferred to Phase 4 | ErrorBoundary component planned but not implemented |
| No offline support | Deferred to Phase 4 | Upload queue and network status hook planned for polish phase |
