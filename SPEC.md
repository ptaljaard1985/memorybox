# MemoryBox — Product Specification v2.0

**Cherish Every Moment. Keep It Safe Forever.**

Version 2.0 | March 2026 | Prepared for: Pierre Taljaard | Simple Wealth

> **Working title.** "MemoryBox" is a placeholder. Final product name TBD.

---

## 1. Executive Summary

MemoryBox is a mobile-first application that enables parents to capture, categorise, and preserve their children's most meaningful moments — from pregnancy scans to first steps, school reports to medical records, letters to artwork — in a single, secure, beautifully organised digital memory vault.

Unlike existing competitors that focus narrowly on either emotional memories (Tinybeans, Qeepsake) or document storage (Trustworthy, LockVault), MemoryBox uniquely combines both into a categorised, prompted, long-term preservation platform. The app's intelligent reminder system ensures parents never go too long without capturing a moment, and the beautiful memory sharing feature turns every moment into a shareable image.

### Vision Statement

> Every child deserves a complete record of their story — from the first ultrasound to their 21st birthday. MemoryBox makes it effortless for parents to build that record, one moment at a time, so that when they hand it over, it's the most meaningful gift they've ever given.

### Target Markets

- **Primary:** South Africa (1.2M births/year, low direct competition)
- **Secondary:** Europe — UK, Ireland, Netherlands, Nordics (English-proficient, privacy-conscious)
- **Tertiary:** United States (largest market, entered after product-market fit established)

### Financial Targets

| Metric | Target | Timeline |
|--------|--------|----------|
| Annual Recurring Revenue | R5M (~US$275K) | 24–36 months |
| Paying Subscribers | ~4,200 at R99/month | 24–36 months |
| Free Active Users | ~42,000 (10% conversion) | 24–36 months |
| Owner Monthly Draw | R300,000/month net | At R5M ARR |
| Exit Valuation Target | US$1,000,000 (3.5–4x ARR) | 36–48 months |

---

## 2. Product Definition

### 2.1 Core Concept

MemoryBox is a structured memory preservation app. Every entry (called a "moment") consists of one or more photos, a short video, or an audio recording, paired with a written note, a date, and a category tag. Moments are stored chronologically but can be filtered by category or by tagged people, creating both an emotional timeline and a practical reference system.

The app supports the full journey from pregnancy through to adulthood. A child's profile can be created in the "expecting" state (with due date and ultrasound photos) and transitions to "born" once the baby arrives. The timeline starts from before birth.

### 2.2 What Makes a "Moment"

| Element | Details |
|---------|---------|
| Photo(s) | 1–5 photos per moment, compressed to 1200px wide, JPEG quality 80% |
| Video (optional) | Max 1 minute, compressed to 720p H.264, ~15–30MB per clip |
| Audio (optional) | Voice recording up to 3 minutes (grandparent's message, baby's first words) |
| Title | Short title, e.g. "First day of Grade 1" (max 100 characters) |
| Note / Letter | Free-text description or letter to child, max 5000 characters |
| Date | The date of the moment (defaults to today, can be backdated) |
| Category | One primary category from the taxonomy (see 2.3) |
| Children | One or MORE children this moment belongs to (multi-child tagging) |
| People Tags | Optional: tag family members, friends, teachers who are in this moment |

### 2.3 Category Taxonomy

| Category | Description & Examples |
|----------|----------------------|
| Pregnancy / Expecting | Ultrasound scans, bump photos, pregnancy test, doctor scans, nursery preparation |
| Birth Story | The birth itself — hospital photos, weight, time, first moments, the story of arrival |
| Life Milestone | First steps, first words, first day of school, learning to ride a bike, losing first tooth |
| Special Memory | Family holidays, birthday parties, funny moments, day trips, playdates |
| Education | School reports, certificates, awards, parent-teacher notes, homework achievements |
| Medical | Vaccination records, doctor visit notes, diagnoses, medications, dental visits, growth measurements |
| Family | Photos with grandparents, family gatherings, video messages from relatives, heritage moments |
| Achievement | Sports events, competitions, performances, recitals, personal bests, trophies |
| Everyday Joy | Small daily moments worth remembering — a funny quote, a bedtime routine, a favourite meal |
| Letter to Child | Written letters or voice messages from parent to child, to be read/heard later |
| Artwork & Drawings | Photos of children's artwork, crafts, school projects, creative work |
| Favourites | Periodic capture: favourite toy, movie, song, friend, food at this age |
| Trips & Adventures | Holidays, road trips, first flight, camping, visits to new places |
| Document | Birth certificate, passport photos, ID documents, legal records, baptism certificate |

### 2.4 Key Features — MVP (Version 1.0)

#### 2.4.1 Child Profiles
- Create a profile for each child with name, date of birth, and photo
- "Expecting" mode: create a profile before birth with due date, for pregnancy moments
- Transition from "expecting" to "born": update with actual name, DOB, birth details
- All moments linked to one or more children (multi-child tagging)
- Easy switching between children in the app
- No limit on number of children per account

#### 2.4.2 Family / People
- Create a family profile (e.g. "Taljaard") that groups all children
- Add "People": grandparents, friends, teachers, aunts, uncles
- Tag people in moments (e.g. "First day at school — with Mrs. Koekemoer")
- Filter timeline by person: "Show me all moments with Grandma"

#### 2.4.3 Moment Creation
- Tap-to-capture: single button opens camera or photo library
- Quick-dump to Inbox: add photos/videos now, categorise later (reduces friction)
- Add title, note/letter, select category from visual picker
- Date picker defaults to today, allows backdating for older memories
- Multi-photo support (up to 5 per moment) with swipeable gallery
- Video capture or selection, limited to 60 seconds, auto-compressed on device
- Audio recording for voice messages (up to 3 minutes)
- Multi-child tagging: a moment can belong to multiple children
- Optional people tagging from your People list

#### 2.4.4 Timeline View
- Chronological feed of all moments, most recent first, grouped by month/year
- Each moment card shows thumbnail, title, date, category badge, and media count
- Tap to expand: full photos, video, audio player, and note
- Child selector at top: horizontal avatar scroll to switch between children
- Family view: all children's moments interleaved chronologically

#### 2.4.5 Category & People Filtering
- Filter timeline by any single category (e.g. "All Medical moments for Annabel")
- Filter by tagged person (e.g. "All moments with Grandpa")
- Visual category grid on the Explore tab with moment counts per category

#### 2.4.6 Smart Reminders & Prompts
- Push notification if no moment has been added in X days (default: 30, configurable)
- Smart prompts based on child's age and time of year:
  - "Your child's birthday is coming up — record a video message for them?"
  - "First day of school is around the corner — snap a photo!"
  - "Add 5 photos from February 2022 now..."
  - "Measurements every 3 months?"
- Configurable interval (7, 14, 30, 60 days) in settings
- Warm, personal tone: "It's been a while! What's been happening in Annabel's world?"

#### 2.4.7 On This Day / Flashbacks
- Surface moments from 1, 2, 3+ years ago on the home screen
- Optional push notification: "2 years ago today: Annabel's first bike ride"
- Emotional re-engagement tool that reinforces the long-term value

#### 2.4.8 Beautiful Memory Sharing
- Tap "Share" on any moment to generate a beautiful, branded image
- Photo displayed in a styled frame with child's name, moment title, date, and age
- 3–4 template styles to choose from (light/airy, dark/moody, colourful, minimal)
- Subtle MemoryBox watermark/logo in corner (organic marketing)
- Exports as a high-res image for WhatsApp, Instagram Stories, or camera roll
- Built using `react-native-view-shot`: compose a React Native view, capture as image
- This is the primary organic growth mechanic — every share is a free ad to other parents

#### 2.4.9 Inbox / Quick Capture
- Dedicated "Inbox" area for uncategorised media
- Parents can quickly dump photos/videos without stopping to add titles and categories
- Sort and categorise later at their own pace
- Badge count on inbox tab shows unsorted items
- Notification nudge: "You have 8 moments in your inbox — ready to organise them?"

### 2.5 Features — Post-MVP (Version 2.0+)

| Priority | Feature | Description |
|----------|---------|-------------|
| P1 | Contributor Access | Invite spouse, grandparent, nanny to add moments. Submitted content goes to approval queue. |
| P2 | Printed Memory Books | Annual or milestone-based photobook generation via Peecho/Lulu API. High-margin upsell. |
| P3 | Year In Review | AI-generated annual summary: highlights, stats, growth, favourite moments. |
| P4 | QR Code Event Capture | Generate QR code for a birthday party or event. Guests scan and submit photos, parent approves. |
| P5 | Photo Submissions / Requests | Request photos from family members ("Send me your photos from the holiday"). Goes to approval. |
| P6 | Legacy / Handover Planning | Schedule handover to child at 18/21. Includes instructions for what happens if parent passes away. |
| P7 | Yearly Completeness Score | Score out of 100 based on what's been captured this year. Gamification to encourage consistency. |
| P8 | Measurements Tracker | Dedicated height/weight tracking with growth chart visualisation. |
| P9 | Import from Platforms | Import from Google Photos, iCloud for backdating existing photos into the timeline. |
| P10 | Web Companion | Read-only timeline on desktop, supports book ordering flow. |
| P11 | Content Moderation | Automated nudity detection on uploads. All entries screened for safety. |
| P12 | Back-fill Course | Guided onboarding for parents of older children: prompts and templates to add past memories. |
| P13 | Useful Resources | In-app guides: how to organise a family photo shoot, what documents to save, how to scan records. |

---

## 3. Business Model

### 3.1 Pricing Tiers

| Feature | Free Tier | Premium (R99/mo) |
|---------|-----------|-------------------|
| Total moments (lifetime) | 50 moments total | Unlimited |
| Children per account | 1 | Unlimited |
| Photos per moment | 1 | Up to 5 |
| Video uploads | No | Yes (60s max) |
| Audio recordings | No | Yes (3 min max) |
| Inbox / Quick Capture | No | Yes |
| Category filtering | Yes | Yes |
| People tagging | No | Yes |
| Smart reminders | Basic (30-day) | Fully configurable + smart prompts |
| On This Day / Flashbacks | No | Yes |
| Beautiful memory sharing | With watermark | Clean (small logo only) |
| Data export | No | Yes (full ZIP download) |
| Contributor access | No | Yes (V2) |
| Printed memory books | No | Discounted ordering (V2) |

The free tier uses a lifetime cap of 50 moments (not monthly), giving parents enough to get deeply invested before hitting the limit. At roughly one moment per week, that's a year of use before conversion pressure. When the parent realises they have 50 precious memories locked in MemoryBox and can't add more, conversion is emotional and natural.

European pricing: €4.99/month. US pricing (future): $4.99/month. South African pricing: R99/month.

### 3.2 Revenue Projections

| Milestone | Free Users | Paid Subs | Monthly Rev | Annual Rev |
|-----------|-----------|-----------|-------------|------------|
| Month 6 | 2,000 | 200 | R19,800 | R237,600 |
| Month 12 | 8,000 | 800 | R79,200 | R950,400 |
| Month 18 | 20,000 | 2,000 | R198,000 | R2,376,000 |
| Month 24 | 35,000 | 3,500 | R346,500 | R4,158,000 |
| Month 30 | 42,000 | 4,200 | R415,800 | R4,989,600 |
| Month 36 | 55,000 | 5,500 | R544,500 | R6,534,000 |

### 3.3 Cost Structure (at R5M ARR)

| Cost Item | Monthly Est. | Annual Est. |
|-----------|-------------|-------------|
| Supabase Pro + storage | R5,000–R15,000 | R60,000–R180,000 |
| RevenueCat (1% above $2.5K/mo) | R2,000–R5,000 | R24,000–R60,000 |
| Apple/Google commission (15%) | R62,000 | R744,000 |
| Push notifications | R500–R2,000 | R6,000–R24,000 |
| Domain, email, misc | R500 | R6,000 |
| Marketing/content | R10,000–R30,000 | R120,000–R360,000 |
| **TOTAL COSTS** | **R80,000–R115,000** | **R960,000–R1,374,000** |
| **NET MARGIN** | **~75–80%** | **R3.6M–R4.0M** |

---

## 4. Technical Architecture

### 4.1 Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Mobile App | Expo (React Native) + TypeScript | Single codebase iOS & Android; leverages existing React/TS skills; Expo handles builds and store submissions via EAS |
| Navigation | Expo Router (file-based) | Next.js-like routing; deep linking support out of the box |
| State Management | React Query (TanStack Query) + React Context | React Query for all server state; Context for simple UI state. No additional libraries needed for MVP. |
| Backend / Database | Supabase (PostgreSQL) | Auth, database, storage, edge functions in one platform; familiar from existing projects |
| File Storage | Supabase Storage (S3-backed) | CDN delivery, presigned URLs, storage policies; cost-effective at scale |
| Authentication | Supabase Auth | Email/password, Google Sign-In, Apple Sign-In; row-level security |
| Payments | RevenueCat | Apple/Google subscription management, receipt validation, analytics; free until $2,500/mo |
| Push Notifications | Expo Notifications + Edge Functions | Expo handles tokens/delivery; Edge Functions run daily cron for reminder logic |
| Image Processing | expo-image-manipulator | Client-side compression before upload; resize to 1200px, JPEG quality 80% |
| Video Processing | expo-video + server-side re-encode (V1.1) | Client-side 720p limit; server FFmpeg re-encode for optimisation in later version |
| Memory Sharing | react-native-view-shot + expo-sharing | Compose styled view, capture as image, share via OS share sheet |
| OTA Updates | EAS Update | Push bug fixes without App Store review; critical for solo developer |
| Analytics | PostHog (self-hostable) | Track activation, retention, conversion; self-host option for POPIA/GDPR |

### 4.2 Database Schema

All tables use UUID primary keys, `created_at`/`updated_at` timestamps, and row-level security. The schema reflects the Family → Children → Moments hierarchy with multi-child tagging via a join table.

#### Table: `users`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | References auth.users(id) |
| email | TEXT | From auth provider |
| display_name | TEXT | Parent's name |
| avatar_url | TEXT (nullable) | Profile photo URL |
| subscription_tier | ENUM('free', 'premium') | Current plan, synced via RevenueCat webhook |
| subscription_expires_at | TIMESTAMPTZ (nullable) | When premium expires |
| reminder_interval_days | INTEGER DEFAULT 30 | Notification interval preference |
| timezone | TEXT | For scheduling notifications correctly |
| created_at | TIMESTAMPTZ | Account creation |
| updated_at | TIMESTAMPTZ | Last profile update |

#### Table: `families`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Auto-generated |
| user_id | UUID (FK → users) | Owner of this family |
| name | TEXT | Family surname, e.g. "Taljaard" |
| created_at | TIMESTAMPTZ | |

#### Table: `children`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Auto-generated |
| user_id | UUID (FK → users) | Owner |
| family_id | UUID (FK → families) | Which family this child belongs to |
| name | TEXT | Child's name or nickname |
| status | ENUM('expecting', 'born') | Allows pre-birth profiles |
| date_of_birth | DATE (nullable) | Null while status='expecting' |
| expected_due_date | DATE (nullable) | Set when status='expecting' |
| avatar_url | TEXT (nullable) | Profile photo in Supabase Storage |
| display_order | INTEGER | For ordering in UI |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

#### Table: `people`

People who can be tagged in moments (grandparents, friends, teachers, etc.)

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Auto-generated |
| user_id | UUID (FK → users) | Owner |
| name | TEXT | e.g. "Grandma Rose", "Mrs. Koekemoer" |
| relationship | TEXT (nullable) | e.g. "Grandmother", "Teacher", "Best Friend" |
| avatar_url | TEXT (nullable) | Optional photo |
| created_at | TIMESTAMPTZ | |

#### Table: `categories`

Lookup table for moment categories. Allows adding new categories without schema migration.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Auto-generated |
| slug | TEXT UNIQUE | e.g. 'life_milestone', 'medical', 'letter_to_child' |
| label | TEXT | Display name, e.g. 'Life Milestone' |
| emoji | TEXT | Icon emoji for display |
| display_order | INTEGER | Order in the category picker |
| is_active | BOOLEAN DEFAULT true | Soft-delete capability |

#### Table: `moments`

The core content table. Each row is one moment in a child's timeline.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Auto-generated |
| user_id | UUID (FK → users) | Owner (for RLS) |
| category_id | UUID (FK → categories) | Primary category |
| title | TEXT (max 100) | Short descriptive title |
| note | TEXT (max 5000, nullable) | Description, story, or letter to child |
| moment_date | DATE | The date of the event |
| is_in_inbox | BOOLEAN DEFAULT false | True if uncategorised / quick-captured |
| has_video | BOOLEAN DEFAULT false | Quick filter flag |
| has_audio | BOOLEAN DEFAULT false | Quick filter flag |
| media_count | INTEGER DEFAULT 0 | Number of attached media items |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

#### Table: `moment_children` (Join Table)

Many-to-many: a moment can belong to multiple children.

| Column | Type | Notes |
|--------|------|-------|
| moment_id | UUID (FK → moments) | Composite PK |
| child_id | UUID (FK → children) | Composite PK |

#### Table: `moment_people` (Join Table)

Tags people in moments for filtering.

| Column | Type | Notes |
|--------|------|-------|
| moment_id | UUID (FK → moments) | Composite PK |
| person_id | UUID (FK → people) | Composite PK |

#### Table: `moment_media`

Media attachments for each moment.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Auto-generated |
| moment_id | UUID (FK → moments) | Parent moment |
| user_id | UUID (FK → users) | For RLS and storage path |
| media_type | ENUM('photo', 'video', 'audio') | Type of media |
| storage_path | TEXT | Path in Supabase Storage bucket |
| thumbnail_path | TEXT (nullable) | Compressed thumbnail for list views |
| file_size_bytes | BIGINT | For tracking storage usage per user |
| width | INTEGER (nullable) | Image/video dimensions |
| height | INTEGER (nullable) | Image/video dimensions |
| duration_seconds | INTEGER (nullable) | Video/audio duration |
| display_order | INTEGER DEFAULT 0 | Order within the moment gallery |
| created_at | TIMESTAMPTZ | |

#### Table: `notification_log`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID (PK) | Auto-generated |
| user_id | UUID (FK → users) | Recipient |
| notification_type | ENUM('reminder', 'flashback', 'prompt', 'system') | Type |
| title | TEXT | Notification title |
| body | TEXT | Notification body text |
| sent_at | TIMESTAMPTZ | When sent |
| opened_at | TIMESTAMPTZ (nullable) | When tapped |

#### Key Indexes

- `moments`: (user_id, moment_date DESC) — primary timeline query
- `moments`: (user_id, category_id, moment_date DESC) — filtered timeline
- `moments`: (user_id, is_in_inbox) WHERE is_in_inbox = true — inbox view
- `moment_children`: (child_id, moment_id) — child timeline lookup
- `moment_people`: (person_id, moment_id) — person filter lookup
- `moment_media`: (moment_id, display_order) — gallery ordering

#### Row-Level Security (RLS)

Every table has RLS enabled. Users can only access rows where `user_id = auth.uid()`. Join tables inherit security through their parent moment's user_id. This is non-negotiable for a product storing children's photos and medical records.

#### Storage Bucket Structure

Supabase Storage bucket named "memorybox-media":

- `{user_id}/{child_id}/photos/{moment_id}_{order}.jpg`
- `{user_id}/{child_id}/videos/{moment_id}.mp4`
- `{user_id}/{child_id}/audio/{moment_id}.m4a`
- `{user_id}/{child_id}/thumbnails/{moment_id}_{order}_thumb.jpg`
- `{user_id}/inbox/{timestamp}_{original_filename}`

Storage policies mirror RLS: users can only read/write within their own `{user_id}/` prefix.

---

## 5. App Screen Map

### 5.1 Navigation Structure (5 tabs)

| Tab | Screen | Purpose |
|-----|--------|---------|
| Home | Timeline + On This Day | Primary view: chronological feed with flashback carousel at top |
| Explore | Category & People Browser | Grid of categories with counts; people list; tap to filter |
| + (Add) | Create Moment / Quick Capture | Central FAB button: full moment creation or quick-dump to inbox |
| Inbox | Unsorted Media | Quick-captured items waiting to be categorised (badge count) |
| Profile | Settings & Account | Family, children, people, subscription, notifications, export |

### 5.2 Key Screen Details

#### Home Screen
- Top: "On This Day" horizontal carousel (moments from 1, 2, 3+ years ago)
- Child selector: horizontal avatar scroll (tap to filter by child, or "All" for family view)
- Timeline: vertical scroll, grouped by month/year, moment cards with thumbnail + title + date + category badge
- Empty state for new users: warm welcome + "Add your first moment" prompt

#### Create Moment Screen
- Step 1: Capture/select media (camera, library, audio recorder)
- Step 2: Title (required) + note/letter (optional, supports longer text for letters)
- Step 3: Category picker (visual grid with emojis)
- Step 4: Date picker (defaults today, calendar for backdating)
- Step 5: Tag children (multi-select) and optionally tag people
- Quick capture shortcut: skip steps 2–5, send straight to Inbox
- Free tier: show remaining moments ("12 of 50 moments used")

#### Moment Detail Screen
- Full-screen photo gallery (swipeable)
- Video player (if applicable)
- Audio player (if applicable)
- Title, note, date, category badge
- Edit button to modify title, note, category, or date
- Delete button (with confirmation)
- Share button → Beautiful Memory Sharing flow

#### Memory Sharing Screen
- Triggered from moment detail view via "Share" button
- Preview: photo in styled template with title, child's name + age, date
- Template selector: swipe between 3–4 beautiful styles
- Export: saves to camera roll or opens OS share sheet
- Free tier: includes MemoryBox watermark. Premium: clean with small logo.

#### Explore Screen (Category Browser)
- Grid of category cards (2 columns), each showing icon, label, and moment count
- Tap a category to see filtered timeline
- People section below categories

#### Profile / Settings Screen
- User profile: name, email, avatar
- Family name
- Children: list with edit/add/remove
- People: manage tagged people
- Subscription: current plan, upgrade button (RevenueCat paywall)
- Notifications: toggle reminders, set interval
- Data & Privacy: export (premium), delete account, privacy policy
- About: app version, support email

---

## 6. Media Handling & Storage

### 6.1 Image Compression Pipeline

| Stage | Action | Output |
|-------|--------|--------|
| 1. Capture/Select | User takes photo or selects from library | Original resolution |
| 2. Resize | expo-image-manipulator: max 1200px longest edge | ~200–500KB JPEG |
| 3. Thumbnail | Generate 300px thumbnail for list views | ~15–30KB JPEG |
| 4. Upload | Both files to Supabase Storage via presigned URL | Two files per photo |

### 6.2 Video Compression
- Max duration: 60 seconds (enforced in UI)
- Target: 720p (1280×720), H.264, ~2Mbps → ~15–20MB per clip
- Generate poster frame thumbnail from first second

### 6.3 Storage Cost Modelling

Assumptions: average premium user adds 8 moments/month, 70% photo-only (avg 2 photos), 30% include video. ~45MB/user/month.

| Scale | Paid Users | Monthly New | Cumulative (Year) | Cost/month |
|-------|-----------|-------------|-------------------|------------|
| Year 1 | 800 | 36 GB | ~216 GB | ~R100 |
| Year 2 | 3,500 | 158 GB | ~1.4 TB | ~R600 |
| Year 3 | 5,500 | 248 GB | ~4.2 TB | ~R1,800 |

---

## 7. Notification & Reminder System

### Daily Cron Job Logic

Runs as Supabase Edge Function on daily schedule:

1. For each active user, find most recent `moment.created_at`
2. If `(today - last_moment_date) >= user.reminder_interval_days`
3. AND no reminder sent in last `(interval ÷ 2)` days
4. Send push notification via Expo Push API
5. Log to `notification_log` table

### Notification Types

| Type | Trigger | Example |
|------|---------|---------|
| Inactivity Reminder | No moment in X days | "It's been a while! What's been happening in Emma's world?" |
| Flashback | Moment from 1+ years ago today | "2 years ago today: Emma's first day of school 🌟" |
| Monthly Milestone | Child's month-iversary | "Emma turns 3 years and 6 months today!" |
| Upgrade Nudge | Free user hits limit 2 months in a row | "You're capturing beautiful moments! Upgrade for unlimited." |

---

## 8. Security & Privacy

- All data encrypted in transit (TLS 1.3) and at rest (AES-256 via Supabase/AWS)
- Row-Level Security on every table; Supabase Storage policies restrict access
- No data shared with third parties. No analytics on photo content.
- **POPIA** compliant (SA): lawful processing, consent, right to deletion
- **GDPR** compliant (EU): right to portability (data export), right to erasure
- Full account deletion in-app (required by Apple/Google). Irreversible, confirmed by email.
- Content moderation: automated screening for inappropriate content (V2)

---

## 9. MVP Development Roadmap

Target: 12–14 week build for solo developer using Claude Code.

| Phase | Weeks | Deliverables |
|-------|-------|-------------|
| 1: Foundation | 1–3 | Expo project + Supabase schema + RLS + auth (email/Google/Apple) + family/child CRUD + navigation shell |
| 2: Core Experience | 4–8 | Moment creation (camera, gallery, audio, compression, upload) + timeline view + moment detail + category filtering + people tagging + inbox/quick capture |
| 3: Retention & Revenue | 9–11 | Push notifications + reminder cron + On This Day + RevenueCat integration + paywall UI + free tier enforcement + beautiful memory sharing |
| 4: Polish & Launch | 12–14 | UI polish + animations + App Store assets + privacy policy + TestFlight beta (10–20 testers) + store submission |

### Post-Launch Priorities (V1.1 → V2.0)

| Priority | Feature | Revenue Impact |
|----------|---------|---------------|
| P1 | Contributor access | Retention + word-of-mouth |
| P2 | Printed memory books | Direct revenue, high margin |
| P3 | Year In Review | Premium feature, drives upgrades |
| P4 | Web companion | Convenience, supports book ordering |
| P5 | AI moment suggestions | Retention, premium feature |

---

## 10. Go-to-Market Strategy

### Phase 1: South Africa (Months 1–12)
- Content marketing: parenting content on Instagram, Facebook, TikTok
- Mommy blogger partnerships: free premium to 20–50 SA parenting influencers
- Parenting Facebook groups: genuine participation
- App Store Optimisation: keywords, screenshots, localised description
- PR: "South African dad builds app to preserve children's memories"
- In-app resources: guides on family photo shoots, what documents to save

### Phase 2: Europe (Months 12–24)
- UK launch at £3.99/month, EU at €4.99/month
- GDPR compliance as marketing differentiator vs US apps
- European parenting communities and forums

### Phase 3: US Expansion (Month 24+)
- Enter after product-market fit proven. $4.99/month.
- Product Hunt launch for initial visibility

---

## 11. Exit Strategy

At R6.5M ARR with <3% monthly churn, 50%+ YoY growth, and multi-market presence, a 3–4x revenue multiple yields R19.5M–R26M (US$1.1M–$1.4M), exceeding the US$1M target.

Paths:
- Strategic acquisition: Tinybeans, BabyCenter, or media company
- Photo/memory company: Shutterfly, Chatbooks, Artifact Uprising
- Micro-PE: Tiny Capital, XO Capital, SureSwift Capital
- Lifestyle hold: continue as profitable business drawing R300K+/month

---

## Appendix A: Full Category Slugs

| Slug | Label | Emoji |
|------|-------|-------|
| pregnancy | Pregnancy / Expecting | 🤰 |
| birth_story | Birth Story | 👶 |
| life_milestone | Life Milestone | 🌟 |
| special_memory | Special Memory | 📸 |
| education | Education | 🎓 |
| medical | Medical | ⚕️ |
| family | Family | 👨‍👩‍👧 |
| achievement | Achievement | 🏆 |
| everyday_joy | Everyday Joy | ☀️ |
| letter_to_child | Letter to Child | ✉️ |
| artwork | Artwork & Drawings | 🎨 |
| favourites | Favourites | ❤️ |
| trips | Trips & Adventures | ✈️ |
| document | Document | 📄 |

## Appendix B: Origin

This product was originally conceived by Pierre Taljaard in 2022, prototyped in Notion with real family data (children Annabel and Pierre, family Taljaard). The Notion prototype included Family, Children, Memory, and Memory Type databases with sample entries including: Annabel's birth story (March 15, 2016, Vincent Palotti Hospital, 3.42kg), first bike ride, first tooth out, lung & tonsil infection, Term 1 school report, and the family's first board game (Labyrinth). This real-world testing informed the data model and category taxonomy in this specification.
