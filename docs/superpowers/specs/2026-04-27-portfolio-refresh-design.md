# Portfolio Refresh — Design

**Date:** 2026-04-27
**Owner:** Tran Tien Quang
**Repo:** `kalen_1o-portfolio` (Next.js 14, deployed via GitHub Pages)

## Goal

Bring the portfolio site in sync with the current resume (`Tran_Tien_quang_CV_2.pdf`), which has drifted significantly:

- Title is "Front-end Developer"; resume is "Full-Stack Software Engineer (Java/Spring Boot · React/Next.js)"
- Most recent job missing entirely (VinSmartFuture, Nov 2025 – Present)
- 4 NAVER products collapsed into one vague blurb; resume lists them distinctly with metrics
- Skills list missing Java, Spring Boot, Kafka, Redis, Go, AI/MCP and others
- Project tiles use random social-media icons (`instagram.png`, `dribbble.png`) as placeholder images

Audience: broad — recruiters from full-stack, frontend, and freelance contexts may all land here.

## Approach

Content + targeted visual upgrades. Keep the existing structure (hero / about-with-brain-svg / horizontal-scroll portfolio / contact), the framer-motion transitions, and the `<Brain>` SVG. Refactor the parts that can't cleanly hold the new content (timeline, skills, projects). No new pages. No styling system change.

## Section 1 — Data layer & file structure

Single source of truth so timeline + portfolio + skills do not drift apart.

```
src/
  data/
    profile.js      # name, title, hero copy, contact info, socials
    jobs.js         # 5 entries (4 jobs + 1 education)
    projects.js     # 7 entries
    skills.js       # grouped: Languages, Backend, Frontend, Data, DevOps, AI, Quality
public/
  companies/        # NEW — official logos (naver.svg, coccoc.svg, appota.svg, vingroup.svg)
  projects/         # NEW — user-supplied screenshots (optional fallback)
```

### Data shapes

`projects.js` entry:
```js
{
  id, slug, title, company, period, role,
  summary,        // one line
  highlights[],   // 2-4 metric-led bullets
  stack[],        // tech chip labels
  links: { live?, repo?, caseStudy? },
  image?,         // optional path; falls back to GeneratedCard
  gradient,       // existing "from-X to-Y" Tailwind classes
}
```

`jobs.js` entry:
```js
{
  id, company, companyLogo, role, period, location,
  blurb,          // one line under the company name
  highlights[],   // 2-4 bullets
  side,           // "left" | "right" — for zigzag layout
}
```

`skills.js`: an array of `{ group, items: [{ label, href }] }`.

## Section 2 — Homepage

**Layout:** keep current (hero image left, text right). No structural change.

**Copy (replaces current):**

```
# Tran Tien Quang
## Full-Stack Engineer — Java / Spring Boot · React / Next.js

5+ years shipping production systems across travel-tech, internal
developer platforms, and consumer browsers. Currently building
Vietnam's Booking.com / Agoda equivalent on Spring Boot
microservices and React.

Born in Ukraine, of Vietnamese origin. Quadrilingual (EN · RU · UK · VI).

[View My Work] [Contact Me]
```

**Changes:**
- Title: "Front-end Developer" → "Full-Stack Engineer — Java/Spring Boot · React/Next.js"
- Drops "perseverance, craftsmanship, pixel-perfect detail" (soft language)
- Keeps Ukraine/Vietnam + quadrilingual line (real differentiator)
- Keeps `hero.png` unchanged

## Section 3 — About page

Same outer layout (left scroll column + sticky `<Brain>` SVG on the right). Brain SVG, scroll-progress hook, animated chevrons preserved.

### 3a. Biography

```
Full-stack engineer with 5+ years across travel-tech, developer platforms,
and consumer browsers. I work across the stack — Java / Spring Boot
microservices on the backend, React / Next.js on the front — and I'm
comfortable owning a feature end-to-end on a single ticket.

Most recently: building Vietnam's Booking.com / Agoda equivalent on a
30+ engineer team. Before that: sole front-end owner of NAVER Corp's
enterprise-wide license & vulnerability platform, deployed across every
NAVER project globally.

Born in Ukraine, of Vietnamese origin. Quadrilingual.
```

Drop the random Pexels stock image. Reserve `/public/avatar.jpg` for a real photo later (out of scope for this refresh — biography renders without an image until then).

### 3b. Skills — grouped, not flat

Replace the flat 15-tag list with grouped sections rendered from `skills.js`:

| Group | Items |
|---|---|
| Languages | Java · Go · TypeScript · JavaScript |
| Backend | Spring Boot · Node.js · GraphQL · REST |
| Data & Messaging | PostgreSQL · MySQL · Redis (AWS MemoryDB) · Kafka |
| Frontend | React · Next.js · React Query · React Hook Form · React Flow · Zustand · Redux Toolkit |
| Styling | Tailwind v3/v4 · SASS · shadcn/ui · DaisyUI |
| Tooling | Vite · Webpack · Lerna · Nextra · Axios |
| DevOps | Docker · NGINX · Jenkins · GitHub Actions · AWS |
| Quality | JaCoCo · Jest · React Testing Library · SonarQube |
| AI | LLM streaming integration · MCP |

Each group: bold label + chip row. Tags remain clickable (link to docs). Slide-in framer-motion animation on the section preserved.

### 3c. Experience timeline — data-driven, 5 entries

Refactor the hard-coded zigzag into `<TimelineItem side="left|right" job={job} />`, mapped from `jobs.js`.

| # | Company | Period | Side |
|---|---|---|---|
| 1 | VinSmartFuture | Nov 2025 – Present | left |
| 2 | NAVER | Oct 2022 – Nov 2025 | right |
| 3 | Cốc Cốc | Jun 2021 – Sep 2022 | left |
| 4 | Appota | Oct 2019 – Jun 2021 | right |
| 5 | V.N. Karazin Kharkiv National Univ. (Education) | 2015 – 2018 | left |

Each card adds a small company-logo chip next to the company name (sourced from `/public/companies/`). Visual style — white card, red dot, gray vertical line — unchanged.

Fixes the current bug where NAVER reads "Sep 2022 – Present" despite the user having moved on.

## Section 4 — Portfolio page

Keep the horizontal-scroll mechanic. Three changes: extend to 7 cards, redesign the card, fix placeholder images.

### 4a. Card layout

Per card (full viewport):

```
┌─────────────────────────────────────────────┐
│  [Company logo]   COMPANY · Period          │
│                                              │
│  Project Title                               │
│  ─────────────                               │
│                                              │
│  ┌──────────────────┐   One-line summary.   │
│  │   Screenshot OR  │   • Highlight 1       │
│  │   Generated card │   • Highlight 2       │
│  │                  │   • Highlight 3       │
│  └──────────────────┘                        │
│                                              │
│  Stack: [Java] [Spring Boot] [Kafka] ...    │
│                                              │
│                              [See Details →] │
└─────────────────────────────────────────────┘
```

### 4b. The 7 projects (chronological newest → oldest)

Order matches the about-page timeline so cross-page navigation feels consistent.

1. **VinSmartFuture — V-App Booking Platform** (Java/Spring + React)
   - 4 service domains · 30+ eng team · PostgreSQL/Redis/Kafka
2. **NAVER OMS — License Risk & Vulnerability Manager**
   - Deployed across every NAVER project globally · 85%+ test coverage · streaming AI chatbot
3. **NAVER QRCode — Public QR Customization Platform**
   - Lighthouse 100/100 across all categories · 75%+ coverage · zero-hotfix
4. **NAVER Bug Bounty — Researcher Portal + Admin Console**
   - Custom rich-text editor (replaced 3rd-party) · CI from scratch · reward state machine
5. **NAVER Internal Apps (Go + MySQL + React)**
   - Zero-downtime schema migration · Zoom/HackerRank/Calendar integrations
6. **Cốc Cốc — Search, New Tab, Map**
   - WCAG-compliant autocomplete · ~25M users · per-user personalization on New Tab
7. **Appota — WiFi Cafe Suite**
   - 4 products in the WiFi Cafe ecosystem · React Native + Next.js + Recharts

### 4c. Image strategy (hybrid)

Per-card image resolves at render time:
1. `/projects/<slug>.png` if present (user drops in own screenshot later)
2. Otherwise → `<GeneratedCard>` component renders project title + company logo + tech-stack chips on the project's gradient background

Result: ships today with branded generated cards; upgrades silently as screenshots are added.

### 4d. Scroll length

`h-[600vh]` (4 cards) → `h-[900vh]` (7 cards). Tune `useTransform` end value `-80%` → `-87%` so the last card lands cleanly. Remove the empty leading gradient pane to buy back one viewport.

### 4e. Footer CTA

The "Do you have a project? · Hire Me" rotating-circle CTA stays. Update rotating text:
- "Front-end Developer and UI Designer" → "Full-Stack Engineer · Java · Spring Boot · React"

## Section 5 — Small fixes

- **Contact page** (`src/app/contact/page.jsx`): opening line "Dear Quang," → "Dear Visitor," (the visitor is writing, not Quang).
- **Navbar socials** (`src/components/navbar.jsx`): drop Facebook + Instagram. Keep GitHub + LinkedIn. Add an email icon → `mailto:trantienquang101198@gmail.com`.
- **Layout metadata** (`src/app/layout.js`): update `<title>` and `<meta description>` to reflect new positioning.

## Image acquisition plan

Company logos to download from official brand/press pages, saved as SVG when available:

| File | Source |
|---|---|
| `/public/companies/vingroup.svg` | Vingroup brand page (VinSmartFuture is a Vingroup subsidiary) |
| `/public/companies/naver.svg` | NAVER press kit |
| `/public/companies/coccoc.svg` | Cốc Cốc brand page or coccoc.com favicon/logo |
| `/public/companies/appota.svg` | Appota corporate site |

If a company does not publish a brand kit, fall back to a clean PNG from the company's own website (their about/footer logo).

## Out of scope (intentional)

- `<Brain>` SVG, scroll-progress hook, framer-motion page transitions, cursor effects — preserved as-is.
- Horizontal-scroll mechanic on portfolio page — preserved.
- Contact form mailto flow — preserved.
- No new pages (no per-project case-study pages).
- No styling system change (Tailwind v3 stays; no v4 upgrade).
- No real avatar photo (placeholder removed; spot reserved for later).
- No real project screenshots (generated cards used; user can drop in later).

## File-by-file change summary

| File | Change |
|---|---|
| `src/data/profile.js` | NEW |
| `src/data/jobs.js` | NEW |
| `src/data/projects.js` | NEW |
| `src/data/skills.js` | NEW |
| `src/components/timelineItem.jsx` | NEW (extracted from `about/page.jsx`) |
| `src/components/skillGroup.jsx` | NEW |
| `src/components/projectCard.jsx` | NEW (extracted from `portfolio/page.jsx`) |
| `src/components/generatedCard.jsx` | NEW (fallback image) |
| `src/app/page.jsx` | Rewrite copy |
| `src/app/about/page.jsx` | Rewrite bio; render skills from groups; render timeline from `jobs.js` |
| `src/app/portfolio/page.jsx` | Render 7 `<ProjectCard>`s from `projects.js`; tune scroll length; update footer text |
| `src/app/contact/page.jsx` | "Dear Quang," → "Dear Visitor," |
| `src/components/navbar.jsx` | Drop Facebook + Instagram; add email icon |
| `src/app/layout.js` | Update `<title>` + meta description |
| `public/companies/*.svg` | NEW — 4 company logos |

## Success criteria

- Recruiter landing on the homepage in 3 seconds knows: full-stack, Java + React, currently at VinSmartFuture, downloadable CV.
- About page lists all 5 positions with correct dates and grouped skills matching the resume.
- Portfolio page surfaces 7 distinct products with metric-led highlights, each on a branded card.
- Adding a real screenshot to `/public/projects/<slug>.png` swaps the generated card automatically with no code change.
- Next job change: edit one entry in `src/data/jobs.js` and one in `src/data/projects.js`. No JSX changes.
