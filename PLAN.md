# MemoryBox MVP — Implementation Plan

Target: 12–14 week build for solo developer using Claude Code.

---

## Pre-Phase: Project Bootstrapping (Day 1)

- [ ] Initialize Expo project: `npx create-expo-app@latest memorybox --template tabs`
- [ ] Install core dependencies:
  - `@supabase/supabase-js`, `@tanstack/react-query`, `react-native-mmkv`
  - `expo-image-picker`, `expo-image-manipulator`, `expo-av`
  - `expo-notifications`, `expo-sharing`, `react-native-view-shot`
  - `react-native-purchases` (RevenueCat), `date-fns`, `expo-secure-store`
- [ ] Set up EAS Build (`eas.json`) with dev, preview, production profiles

---

## Phase 1: Foundation (Weeks 1–3)

### Week 1: Supabase Backend + Auth

**Task 1.1: Supabase Project Setup**
- [ ] Create Supabase project
- [ ] Create `src/lib/supabase.ts` — client singleton with `expo-secure-store` adapter
- [ ] Create `src/lib/constants.ts` — Supabase URL, anon key, bucket names, tier limits

**Task 1.2: Database Schema Migration**
- [ ] Create `supabase/migrations/001_initial_schema.sql`
- [ ] Tables in order: categories, users, families, children, people, moments, moment_children, moment_people, moment_media, notification_log
- [ ] ENUM types: subscription_tier, child_status, media_type, notification_type
- [ ] All 6 indexes from spec
- [ ] `updated_at` auto-update trigger
- [ ] Seed categories (14 from Appendix A)

**Task 1.3: Row-Level Security**
- [ ] Create `supabase/migrations/002_rls_policies.sql`
- [ ] RLS on all tables: `user_id = auth.uid()`
- [ ] Join table RLS via parent moment subquery
- [ ] Categories: read-only for all authenticated users
- [ ] Storage bucket policies: user can only access `{auth.uid()}/` prefix

**Task 1.4: Auth Screens**
- [ ] `src/providers/AuthProvider.tsx` — session context, signIn/signUp/signOut
- [ ] `src/providers/QueryProvider.tsx` — TanStack Query provider
- [ ] `app/(auth)/sign-in.tsx`, `sign-up.tsx`, `_layout.tsx`
- [ ] Google Sign-In via `expo-auth-session` + Supabase OAuth
- [ ] Apple Sign-In via `expo-apple-authentication` + Supabase OAuth
- [ ] `supabase/migrations/003_auth_trigger.sql` — auto-create user row on signup

### Week 2: Navigation Shell + Family/Child CRUD

**Task 1.5: Navigation Shell**
- [ ] `app/(app)/_layout.tsx` — 5-tab navigator (Home, Explore, +, Inbox, Profile)
- [ ] `src/components/ui/TabBar.tsx` — custom tab bar with central FAB
- [ ] Placeholder screens for all tabs
- [ ] `app/_layout.tsx` — root layout with auth redirect
- [ ] `app/(app)/create.tsx` — modal screen for moment creation

**Task 1.6: API Hooks**
- [ ] `src/api/families.ts` — createFamily, getFamily, updateFamily
- [ ] `src/api/children.ts` — CRUD + reorder
- [ ] `src/api/people.ts` — CRUD
- [ ] `src/hooks/useFamily.ts`, `useChildren.ts`, `usePeople.ts` — React Query hooks

**Task 1.7: Management Screens**
- [ ] `app/(app)/profile/family.tsx` — family name edit
- [ ] `app/(app)/profile/children/index.tsx` + `[id].tsx` — child list + add/edit
- [ ] `app/(app)/profile/people/index.tsx` + `[id].tsx` — people list + add/edit

### Week 3: Onboarding + Shared Components

**Task 1.8: Onboarding**
- [ ] `app/(app)/onboarding.tsx` — welcome, create family, add first child, notification permission

**Task 1.9: UI Components**
- [ ] Button, Input, Avatar, CategoryBadge, ChildSelector, EmptyState
- [ ] `src/theme/` — colors, typography, spacing

---

## Phase 2: Core Experience (Weeks 4–8)

### Week 4: Media Pipeline

**Task 2.1: Image Handling**
- [ ] `src/lib/media.ts` — pickFromCamera, pickFromLibrary, compressImage (1200px, quality 0.8), generateThumbnail (300px)
- [ ] `src/lib/upload.ts` — uploadMedia, getPublicUrl, buildStoragePath

**Task 2.2: Audio Recording**
- [ ] `src/components/AudioRecorder.tsx` — record UI with duration, waveform, stop/cancel/save (max 3 min)

**Task 2.3: Video Handling**
- [ ] `src/lib/video.ts` — getVideoInfo, generateVideoPosterFrame
- [ ] Video selection via expo-image-picker (60s max, 720p)

### Week 5: Moment Creation

**Task 2.4: Create Moment Screen**
- [ ] Multi-step form: media → details → category → date → tagging
- [ ] Quick capture shortcut (skip to inbox)
- [ ] `src/api/moments.ts` — createMoment (transactional: moment + joins + media upload), updateMoment, deleteMoment
- [ ] `src/hooks/useMoments.ts` — React Query mutations

**Task 2.5: Free Tier Enforcement**
- [ ] `src/hooks/useSubscription.ts` — isPremium, momentCount, momentsRemaining, canCreateMoment, media limits
- [ ] Show "X of 50 moments used" in create screen

### Week 6: Timeline

**Task 2.6: Timeline Screen**
- [ ] `app/(app)/index.tsx` — ChildSelector + SectionList grouped by month/year
- [ ] `src/components/MomentCard.tsx` — thumbnail, title, date, category badge, media count
- [ ] `src/api/timeline.ts` — paginated query with child/category/person filters
- [ ] `src/hooks/useTimeline.ts` — useInfiniteQuery for pagination
- [ ] Empty state with "Add your first moment" CTA

**Task 2.7: Optimistic UI**
- [ ] Optimistic insert on moment creation in timeline cache
- [ ] `src/components/ui/Toast.tsx` — error/success toasts

### Week 7: Detail + Filtering

**Task 2.8: Moment Detail**
- [ ] `app/(app)/moment/[id].tsx` — photo gallery, video/audio player, title, note, date, category, tags, age calculation
- [ ] Edit, Delete (with confirmation), Share buttons

**Task 2.9: Edit Moment**
- [ ] `app/(app)/moment/[id]/edit.tsx` — reuse create form in edit mode

**Task 2.10: Explore Screen**
- [ ] `app/(app)/explore.tsx` — 2-column category grid with counts + people section
- [ ] `app/(app)/explore/category/[slug].tsx` — filtered timeline
- [ ] `app/(app)/explore/person/[id].tsx` — filtered timeline

### Week 8: Inbox

**Task 2.11: Inbox Tab**
- [ ] `app/(app)/inbox.tsx` — grid of uncategorised items, tap to categorise, bulk delete
- [ ] `src/api/inbox.ts` — getInboxItems, categorizeInboxItem, deleteInboxItems

**Task 2.12: Tab Badge**
- [ ] `src/hooks/useInboxCount.ts` — badge count on inbox tab

---

## Phase 3: Retention & Revenue (Weeks 9–11)

### Week 9: Notifications + Reminders

**Task 3.1: Push Setup**
- [ ] `src/lib/notifications.ts` — registerForPushNotifications, store expo push token
- [ ] Migration `004_push_token.sql` — add `expo_push_token` to users

**Task 3.2: Reminder Cron**
- [ ] `supabase/functions/daily-reminders/index.ts` — check inactivity, send reminders, log to notification_log
- [ ] On This Day check in same cron

**Task 3.3: On This Day**
- [ ] `src/components/OnThisDayCarousel.tsx` — horizontal carousel on home screen
- [ ] `src/api/flashbacks.ts` + `src/hooks/useFlashbacks.ts`

**Task 3.4: Notification Settings**
- [ ] Toggle reminders on/off, interval picker (7/14/30/60 days), On This Day toggle

### Week 10: RevenueCat + Paywall

**Task 3.5: RevenueCat Integration**
- [ ] `src/lib/revenue-cat.ts` — init, identify, checkSubscription, purchase, restore
- [ ] `supabase/functions/revenuecat-webhook/index.ts` — sync subscription state to DB

**Task 3.6: Paywall Screen**
- [ ] `app/(app)/paywall.tsx` — feature comparison, price, subscribe CTA, restore link
- [ ] Trigger from: moment limit, video/audio attempt, inbox access, settings upgrade

**Task 3.7: Free Tier Enforcement (Complete)**
- [ ] Wire up all enforcement points with RevenueCat + server-side checks

### Week 11: Memory Sharing

**Task 3.8: Share Templates**
- [ ] `src/components/share/SharePreview.tsx` — styled view for screenshot capture
- [ ] `src/components/share/templates.ts` — 4 styles (light, dark, colourful, minimal)

**Task 3.9: Share Flow**
- [ ] `app/(app)/moment/[id]/share.tsx` — preview, template selector, save/share
- [ ] Free tier: watermark. Premium: small logo only.

---

## Phase 4: Polish & Launch (Weeks 12–14)

### Week 12: UI Polish + Animations

**Task 4.1: Visual Polish**
- [ ] Consistent spacing, typography, colors across all screens
- [ ] Loading skeletons, pull-to-refresh, haptic feedback

**Task 4.2: Animations**
- [ ] Card press, FAB pulse, carousel entrance, gallery swipe, success animation
- [ ] Use `react-native-reanimated`

**Task 4.3: Error Handling**
- [ ] `src/hooks/useNetworkStatus.ts` — offline banner
- [ ] Basic upload queue for offline resilience
- [ ] `src/components/ui/ErrorBoundary.tsx`

### Week 13: App Store Prep

**Task 4.4: Assets**
- [ ] App icon, splash screen, screenshots (iPhone + iPad + Android), feature graphic
- [ ] Store description + ASO keywords

**Task 4.5: Privacy & Legal**
- [ ] Privacy policy (POPIA + GDPR compliant)
- [ ] Terms of service
- [ ] `supabase/functions/delete-account/index.ts` — full account + data deletion
- [ ] App Store privacy nutrition labels

**Task 4.6: EAS Configuration**
- [ ] Bundle identifiers, version, permissions, splash, EAS Update, EAS Submit

### Week 14: Testing + Submission

**Task 4.7: TestFlight Beta**
- [ ] Production build, TestFlight group, 10–20 testers, feedback form
- [ ] Fix critical bugs from beta

**Task 4.8: Pre-Launch Checklist**
- [ ] Verify RLS with multiple accounts
- [ ] End-to-end subscription flow (sandbox)
- [ ] Push notifications in production
- [ ] Free tier limits enforced
- [ ] Performance with 50+ moments
- [ ] Submit to Apple App Store + Google Play

---

## File Structure

```
memorybox/
  app/
    _layout.tsx
    (auth)/ sign-in.tsx, sign-up.tsx, _layout.tsx
    (app)/
      _layout.tsx, index.tsx, explore.tsx, inbox.tsx, create.tsx
      onboarding.tsx, paywall.tsx, profile.tsx
      moment/ [id].tsx, [id]/edit.tsx, [id]/share.tsx
      explore/ category/[slug].tsx, person/[id].tsx
      profile/ family.tsx, children/(index|[id]).tsx, people/(index|[id]).tsx
  src/
    api/ families, children, people, moments, moment-detail, timeline, inbox, explore, flashbacks
    hooks/ useSupabase, useFamily, useChildren, usePeople, useMoments, useMomentDetail, useTimeline, useInbox, useInboxCount, useCategories, useSubscription, useFlashbacks, useNetworkStatus
    lib/ supabase, constants, media, upload, video, notifications, revenue-cat, share
    components/
      ui/ Button, Input, Avatar, CategoryBadge, ChildSelector, EmptyState, Toast, Skeleton, TabBar, ErrorBoundary
      MomentCard, AudioRecorder, OnThisDayCarousel
      share/ SharePreview, templates
    providers/ AuthProvider, QueryProvider
    theme/ index, colors, typography, spacing
  supabase/
    migrations/ 001_initial_schema, 002_rls_policies, 003_auth_trigger, 004_push_token
    functions/ daily-reminders, revenuecat-webhook, delete-account
    config.toml, seed.sql
  eas.json, app.config.ts
```
