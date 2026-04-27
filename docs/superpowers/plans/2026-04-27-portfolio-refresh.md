# Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the portfolio site in sync with the current resume — refresh copy to a metric-led full-stack voice, refactor experience timeline and project carousel to render from a `src/data/` source-of-truth, extend portfolio to 7 projects, and replace placeholder social-icon images with branded generated cards.

**Architecture:** Keep the existing Next.js 14 App Router structure, framer-motion page transitions, `<Brain>` SVG, and horizontal-scroll portfolio mechanic. Add a `src/data/` directory for profile/jobs/projects/skills as the single source of truth. Extract three reusable components (`<TimelineItem>`, `<ProjectCard>`, `<GeneratedCard>`) so JSX in the page files becomes a thin `.map()` over data.

**Tech Stack:** Next.js 14, React 18, framer-motion 11, Tailwind v3, JS (no TypeScript). No new dependencies.

## Verification strategy (no test framework in this repo)

The project has zero tests and no Jest/RTL setup. Adding a full test framework just to verify "data renders from arrays" is over-engineering for a static portfolio. Instead, each task uses these verification gates:

1. **`npm run build`** — catches React errors, broken imports, missing files. Required after every task.
2. **`npm run dev`** + browser check — visual verification at the route the task touched. Required for every task that changes rendered output.
3. **Production build smoke test** — `NODE_ENV=production npm run build` once at the end to verify GitHub Pages export still works (since `next.config.mjs` switches to `output: "export"` in production).

Where a task has no rendered output (data file additions, asset downloads), only gate 1 applies.

---

## File map

**New files:**
- `src/data/profile.js` — name, title, hero copy, contact info, socials
- `src/data/jobs.js` — 5 timeline entries (4 jobs + 1 education)
- `src/data/projects.js` — 7 project entries
- `src/data/skills.js` — 9 grouped skill categories
- `src/components/timelineItem.jsx` — one timeline entry, accepts `side` prop
- `src/components/skillGroup.jsx` — one skill group (label + chip row)
- `src/components/projectCard.jsx` — one portfolio carousel card
- `src/components/generatedCard.jsx` — fallback image (title + logo + chips on gradient)
- `public/companies/vingroup.svg` — logo
- `public/companies/naver.svg` — logo
- `public/companies/coccoc.svg` — logo (or .png if SVG unavailable)
- `public/companies/appota.svg` — logo (or .png if SVG unavailable)
**Modified files:**
- `src/app/page.jsx` — rewrite hero copy
- `src/app/about/page.jsx` — rewrite bio, render skills from `skills.js`, render timeline from `jobs.js`
- `src/app/portfolio/page.jsx` — render 7 `<ProjectCard>`s from `projects.js`, tune scroll length, update footer text
- `src/app/contact/page.jsx` — "Dear Quang," → "Dear Visitor,"
- `src/components/navbar.jsx` — drop Facebook + Instagram, add email icon
- `src/app/layout.js` — update `<title>` and `<meta description>`

---

## Task 1: SKIPPED — CV PDF deferred per user request

(No PDF in the app. Homepage Download CV button removed from Task 8. `profile.cv` field removed from Task 3.)

---

## Task 2: Download official company logos

**Files:**
- Create: `public/companies/vingroup.svg` (or `.png`)
- Create: `public/companies/naver.svg` (or `.png`)
- Create: `public/companies/coccoc.svg` (or `.png`)
- Create: `public/companies/appota.svg` (or `.png`)

- [ ] **Step 1: Create the directory**

```bash
mkdir -p public/companies
```

- [ ] **Step 2: Download Vingroup logo (parent of VinSmartFuture)**

Source: `https://www.vingroup.net/` — grab the header logo. Inspect the `<img>` element in DevTools, copy the asset URL, save to `public/companies/vingroup.svg`. If SVG unavailable, fall back to PNG.

```bash
# Manual: visit https://www.vingroup.net/, save logo to public/companies/vingroup.svg
ls -la public/companies/vingroup.*
```

Expected: file exists.

- [ ] **Step 3: Download NAVER logo**

Source: `https://www.navercorp.com/en/naver/brand` (NAVER's official brand page). Save to `public/companies/naver.svg`.

```bash
ls -la public/companies/naver.*
```

Expected: file exists.

- [ ] **Step 4: Download Cốc Cốc logo**

Source: `https://coccoc.com/` — grab the header logo. Save to `public/companies/coccoc.svg` (or `.png`).

```bash
ls -la public/companies/coccoc.*
```

Expected: file exists.

- [ ] **Step 5: Download Appota logo**

Source: `https://www.appota.com/` — grab the header logo. Save to `public/companies/appota.svg` (or `.png`).

```bash
ls -la public/companies/appota.*
```

Expected: file exists.

- [ ] **Step 6: Verify build still succeeds (sanity check)**

```bash
npm run build
```

Expected: "Compiled successfully" with no missing-asset errors.

- [ ] **Step 7: Commit**

```bash
git add public/companies/
git commit -m "Add company logos for timeline and project cards"
```

---

## Task 3: Create profile data file

**Files:**
- Create: `src/data/profile.js`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p src/data
```

- [ ] **Step 2: Write `src/data/profile.js`**

```js
export const profile = {
  name: "Tran Tien Quang",
  title: "Full-Stack Engineer — Java / Spring Boot · React / Next.js",
  hero: {
    summary:
      "5+ years shipping production systems across travel-tech, internal developer platforms, and consumer browsers. Currently building Vietnam's Booking.com / Agoda equivalent on Spring Boot microservices and React.",
    origin: "Born in Ukraine, of Vietnamese origin. Quadrilingual (EN · RU · UK · VI).",
  },
  bio: [
    "Full-stack engineer with 5+ years across travel-tech, developer platforms, and consumer browsers. I work across the stack — Java / Spring Boot microservices on the backend, React / Next.js on the front — and I'm comfortable owning a feature end-to-end on a single ticket.",
    "Most recently: building Vietnam's Booking.com / Agoda equivalent on a 30+ engineer team. Before that: sole front-end owner of NAVER Corp's enterprise-wide license & vulnerability platform, deployed across every NAVER project globally.",
  ],
  bioQuote: "Born in Ukraine, of Vietnamese origin. Quadrilingual.",
  contact: {
    email: "trantienquang101198@gmail.com",
    phone: "+84 372 319 123",
    location: "Ho Chi Minh City, Vietnam",
  },
  socials: {
    github: "https://github.com/kalen1o",
    linkedin: "https://www.linkedin.com/in/kalen1o/",
    email: "mailto:trantienquang101198@gmail.com",
  },
};
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully".

- [ ] **Step 4: Commit**

```bash
git add src/data/profile.js
git commit -m "Add profile data module with hero/bio/contact/socials"
```

---

## Task 4: Create skills data file

**Files:**
- Create: `src/data/skills.js`

- [ ] **Step 1: Write `src/data/skills.js`**

```js
export const skillGroups = [
  {
    group: "Languages",
    items: [
      { label: "Java", href: "https://docs.oracle.com/en/java/" },
      { label: "Go", href: "https://go.dev/doc/" },
      { label: "TypeScript", href: "https://www.typescriptlang.org/docs/" },
      { label: "JavaScript", href: "https://developer.mozilla.org/docs/Web/JavaScript" },
    ],
  },
  {
    group: "Backend",
    items: [
      { label: "Spring Boot", href: "https://spring.io/projects/spring-boot" },
      { label: "Node.js", href: "https://nodejs.org/en/docs" },
      { label: "GraphQL", href: "https://graphql.org/learn/" },
      { label: "REST", href: "https://developer.mozilla.org/docs/Glossary/REST" },
    ],
  },
  {
    group: "Data & Messaging",
    items: [
      { label: "PostgreSQL", href: "https://www.postgresql.org/docs/" },
      { label: "MySQL", href: "https://dev.mysql.com/doc/" },
      { label: "Redis (AWS MemoryDB)", href: "https://aws.amazon.com/memorydb/" },
      { label: "Kafka", href: "https://kafka.apache.org/documentation/" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { label: "React", href: "https://react.dev/learn" },
      { label: "Next.js", href: "https://nextjs.org/docs" },
      { label: "React Query", href: "https://tanstack.com/query/latest/docs/framework/react/overview" },
      { label: "React Hook Form", href: "https://react-hook-form.com/get-started" },
      { label: "React Flow", href: "https://reactflow.dev/learn" },
      { label: "Zustand", href: "https://zustand-demo.pmnd.rs/" },
      { label: "Redux Toolkit", href: "https://redux-toolkit.js.org/" },
    ],
  },
  {
    group: "Styling",
    items: [
      { label: "Tailwind v3 / v4", href: "https://tailwindcss.com/docs" },
      { label: "SASS", href: "https://sass-lang.com/documentation/" },
      { label: "shadcn/ui", href: "https://ui.shadcn.com/docs" },
      { label: "DaisyUI", href: "https://daisyui.com/docs/install/" },
    ],
  },
  {
    group: "Tooling",
    items: [
      { label: "Vite", href: "https://vitejs.dev/guide/" },
      { label: "Webpack", href: "https://webpack.js.org/concepts/" },
      { label: "Lerna", href: "https://lerna.js.org/docs/introduction" },
      { label: "Nextra", href: "https://nextra.site/docs" },
      { label: "Axios", href: "https://axios-http.com/docs/intro" },
    ],
  },
  {
    group: "DevOps",
    items: [
      { label: "Docker", href: "https://docs.docker.com/" },
      { label: "NGINX", href: "https://nginx.org/en/docs/" },
      { label: "Jenkins", href: "https://www.jenkins.io/doc/" },
      { label: "GitHub Actions", href: "https://docs.github.com/actions" },
      { label: "AWS", href: "https://docs.aws.amazon.com/" },
    ],
  },
  {
    group: "Quality",
    items: [
      { label: "JaCoCo", href: "https://www.jacoco.org/jacoco/trunk/doc/" },
      { label: "Jest", href: "https://jestjs.io/docs/getting-started" },
      { label: "React Testing Library", href: "https://testing-library.com/docs/react-testing-library/intro/" },
      { label: "SonarQube", href: "https://docs.sonarqube.org/" },
    ],
  },
  {
    group: "AI",
    items: [
      { label: "LLM streaming integration", href: "https://platform.openai.com/docs/guides/streaming-responses" },
      { label: "MCP", href: "https://modelcontextprotocol.io/" },
    ],
  },
];
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully".

- [ ] **Step 3: Commit**

```bash
git add src/data/skills.js
git commit -m "Add grouped skills data matching resume categories"
```

---

## Task 5: Create jobs data file

**Files:**
- Create: `src/data/jobs.js`

- [ ] **Step 1: Write `src/data/jobs.js`**

```js
export const jobs = [
  {
    id: "vinsmartfuture",
    company: "VinSmartFuture",
    companyLogo: "/companies/vingroup.svg",
    role: "Full-Stack Engineer",
    period: "Nov 2025 – Present",
    location: "Ho Chi Minh City, Vietnam",
    blurb:
      "Building Vietnam's Booking.com / Agoda equivalent inside the V-App super-app. 30+ engineer team.",
    highlights: [
      "Spring Boot microservices across 4 service domains: search & availability, booking flow, partner inventory sync, admin/partner-management API.",
      "Three React surfaces: V-App mini-app, standalone desktop web, partner/admin dashboard.",
      "Stack: PostgreSQL, Redis (AWS MemoryDB), Kafka, JaCoCo, Jenkins → AWS.",
    ],
    side: "left",
  },
  {
    id: "naver",
    company: "NAVER",
    companyLogo: "/companies/naver.svg",
    role: "Full-Stack Software Engineer",
    period: "Oct 2022 – Nov 2025",
    location: "Seongnam, South Korea",
    blurb: "One of South Korea's largest tech companies. Owned 4 products end-to-end.",
    highlights: [
      "OMS — sole front-end owner of NAVER Corp's enterprise-wide license & vulnerability platform; 85%+ unit-test coverage; integrated streaming AI chatbot.",
      "QRCode — multi-step customization wizard; Lighthouse 100/100 across all categories.",
      "Bug Bounty — public researcher portal + admin console; replaced 3rd-party rich-text editor with custom build.",
      "Internal Apps (Go + MySQL + React) — HR/ops workflows, zero-downtime data migration.",
    ],
    side: "right",
  },
  {
    id: "coccoc",
    company: "Cốc Cốc",
    companyLogo: "/companies/coccoc.svg",
    role: "Front-End Engineer",
    period: "Jun 2021 – Sep 2022",
    location: "Hanoi, Vietnam",
    blurb: "Vietnam's #2 browser at the time, with ~25M users.",
    highlights: [
      "Search — vertical search verticals (cinema, football) and a WCAG-compliant autocomplete bar.",
      "New Tab — mixed news-card layouts, daily-rotating banner/video, per-user personalization.",
      "Cốc Cốc Map — Leaflet integration with custom global state manager and tooltip layer.",
    ],
    side: "left",
  },
  {
    id: "appota",
    company: "Appota Corporation",
    companyLogo: "/companies/appota.svg",
    role: "Front-End Engineer",
    period: "Oct 2019 – Jun 2021",
    location: "Hanoi, Vietnam",
    blurb: "Vietnamese WiFi-marketing and advertising platform.",
    highlights: [
      "Shipped 4 products in the WiFi Cafe ecosystem: customer app, CMS, marketplace (Mua Ban), Info & Pricing site.",
      "Built React and React Native interfaces, recharts dashboards, and Next.js marketing pages.",
    ],
    side: "right",
  },
  {
    id: "education",
    company: "V.N. Karazin Kharkiv National University",
    companyLogo: null,
    role: "B.A. Economic Cybernetics & Finance",
    period: "2015 – 2018",
    location: "Kharkiv, Ukraine",
    blurb: "Education.",
    highlights: [],
    side: "left",
  },
];
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully".

- [ ] **Step 3: Commit**

```bash
git add src/data/jobs.js
git commit -m "Add jobs data with 4 positions plus education entry"
```

---

## Task 6: Create projects data file

**Files:**
- Create: `src/data/projects.js`

- [ ] **Step 1: Write `src/data/projects.js`**

```js
export const projects = [
  {
    id: 1,
    slug: "vinsmartfuture-booking",
    title: "V-App Booking Platform",
    company: "VinSmartFuture",
    companyLogo: "/companies/vingroup.svg",
    period: "Nov 2025 – Present",
    role: "Full-Stack Engineer",
    summary:
      "Vietnam's Booking.com / Agoda equivalent — Spring Boot microservices + React across 3 surfaces.",
    highlights: [
      "4 service domains · 30+ engineer team",
      "PostgreSQL · Redis (AWS MemoryDB) · Kafka",
      "Bridges back-end and front-end on single tickets",
    ],
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "Redis", "Kafka", "AWS"],
    links: {},
    gradient: "from-red-300 to-blue-300",
  },
  {
    id: 2,
    slug: "naver-oms",
    title: "OMS — License Risk & Vulnerability Manager",
    company: "NAVER",
    companyLogo: "/companies/naver.svg",
    period: "Oct 2022 – Nov 2025",
    role: "Sole Front-End Owner",
    summary:
      "Enterprise-wide license & vulnerability platform deployed across every NAVER project globally.",
    highlights: [
      "85%+ unit-test coverage — highest of any owned product",
      "Streaming AI chatbot (server-sent events) for conversational queries",
      "URL-state manager — every filter and view shareable as a single link",
    ],
    stack: ["React", "Next.js", "TypeScript", "MDX", "Nextra", "SonarQube"],
    links: {},
    gradient: "from-blue-300 to-violet-300",
  },
  {
    id: 3,
    slug: "naver-qrcode",
    title: "QRCode — Public QR Customization Platform",
    company: "NAVER",
    companyLogo: "/companies/naver.svg",
    period: "Oct 2022 – Nov 2025",
    role: "Front-End Engineer",
    summary:
      "Multi-step customization wizard used across NAVER for educational, news, and event campaigns.",
    highlights: [
      "Lighthouse 100/100 across Performance, Accessibility, Best Practices, SEO",
      "75%+ unit-test coverage; near-zero production hotfixes",
      "SonarQube quality gates enforced",
    ],
    stack: ["React", "Next.js", "TypeScript", "Jest", "SonarQube"],
    links: {},
    gradient: "from-violet-300 to-purple-300",
  },
  {
    id: 4,
    slug: "naver-bug-bounty",
    title: "Bug Bounty — Researcher Portal + Admin Console",
    company: "NAVER",
    companyLogo: "/companies/naver.svg",
    period: "Oct 2022 – Nov 2025",
    role: "Front-End Engineer",
    summary:
      "Public portal external researchers worldwide use to submit vulnerability reports to NAVER, plus admin triage console.",
    highlights: [
      "Custom rich-text editor with file/image upload + @-mentions (replaced 3rd-party dep)",
      "Bug-and-reward state machine — removed manual reconciliation",
      "Stood up GitHub Actions CI (lint/test/build/SonarQube)",
    ],
    stack: ["React", "TypeScript", "GitHub Actions", "SonarQube"],
    links: {},
    gradient: "from-purple-300 to-red-300",
  },
  {
    id: 5,
    slug: "naver-internal-apps",
    title: "Internal Applications — HR & Operations",
    company: "NAVER",
    companyLogo: "/companies/naver.svg",
    period: "Oct 2022 – Nov 2025",
    role: "Full-Stack Engineer",
    summary:
      "Go services backing internal HR and operations workflows; integrated Zoom, HackerRank, NAVER Calendar, and Book Reservation API.",
    highlights: [
      "Zero-downtime data migration to a new schema",
      "Mentored junior and intern engineers on FE, CI/CD, code review",
    ],
    stack: ["Go", "MySQL", "React"],
    links: {},
    gradient: "from-red-300 to-orange-300",
  },
  {
    id: 6,
    slug: "coccoc",
    title: "Cốc Cốc — Search · New Tab · Map",
    company: "Cốc Cốc",
    companyLogo: "/companies/coccoc.svg",
    period: "Jun 2021 – Sep 2022",
    role: "Front-End Engineer",
    summary:
      "Vietnam's #2 browser (~25M users). Vertical search, news-card layouts, and Leaflet-based map experience.",
    highlights: [
      "WCAG-compliant autocomplete bar serving homepage queries",
      "Per-user personalized New Tab seen by millions daily",
      "Leaflet map with custom global state manager and tooltip layer",
    ],
    stack: ["JavaScript", "React", "SASS", "Stylus", "Webpack", "Leaflet"],
    links: { live: "https://coccoc.com/" },
    gradient: "from-orange-300 to-yellow-300",
  },
  {
    id: 7,
    slug: "appota-wifi-cafe",
    title: "WiFi Cafe Suite",
    company: "Appota Corporation",
    companyLogo: "/companies/appota.svg",
    period: "Oct 2019 – Jun 2021",
    role: "Front-End Engineer",
    summary:
      "4 products in the WiFi Cafe ecosystem: customer app, CMS, marketplace (Mua Ban), Info & Pricing site.",
    highlights: [
      "React + React Native interfaces",
      "Recharts dashboards and Next.js marketing pages",
      "Redux / Recoil state management",
    ],
    stack: ["React", "React Native", "Next.js", "TypeScript", "Redux", "Recoil"],
    links: { live: "https://appota.com/" },
    gradient: "from-yellow-300 to-red-300",
  },
];
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully".

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.js
git commit -m "Add projects data — 7 entries with metric-led highlights"
```

---

## Task 7: Update layout metadata

**Files:**
- Modify: `src/app/layout.js`

- [ ] **Step 1: Replace the metadata object**

In `src/app/layout.js`, change:

```js
export const metadata = {
  title: "kalen_1o Portfolio",
  description: "The best animated portfolio page",
};
```

to:

```js
export const metadata = {
  title: "Tran Tien Quang — Full-Stack Engineer",
  description:
    "Full-stack engineer (5+ yrs). Java / Spring Boot · React / Next.js. Currently building Vietnam's Booking.com / Agoda equivalent. Previously NAVER, Cốc Cốc, Appota.",
};
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully".

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Inspect the document `<head>` in DevTools. Confirm `<title>` reads "Tran Tien Quang — Full-Stack Engineer" and meta description is updated. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.js
git commit -m "Update page metadata to full-stack positioning"
```

---

## Task 8: Rewrite homepage hero

**Files:**
- Modify: `src/app/page.jsx` (full rewrite)

- [ ] **Step 1: Replace the file contents**

Replace `src/app/page.jsx` with:

```jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getImagePath } from "@/utils/imagePath";
import { useRouter } from "next/navigation";
import { profile } from "@/data/profile";

const Homepage = () => {
    const router = useRouter();

    return (
        <motion.div
            className="h-full"
            initial={{ y: "-200vh" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1 }}
        >
            <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
                {/* IMAGE CONTAINER */}
                <div className="h-1/2 lg:h-full lg:w-1/2 relative">
                    <Image src={getImagePath("/hero.png")} alt="" fill className="object-contain" />
                </div>
                {/* TEXT CONTAINER */}
                <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-6 items-start justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold">{profile.name}</h1>
                    <h2 className="text-lg md:text-2xl text-gray-700">{profile.title}</h2>
                    <p className="md:text-lg">{profile.hero.summary}</p>
                    <p className="md:text-base italic text-gray-600">{profile.hero.origin}</p>
                    <div className="w-full flex flex-wrap gap-3">
                        <button
                            onClick={() => router.push("/portfolio")}
                            className="p-4 rounded-lg ring-1 ring-black bg-black text-white"
                        >
                            View My Work
                        </button>
                        <button
                            onClick={() => router.push("/contact")}
                            className="p-4 rounded-lg ring-1 ring-black"
                        >
                            Contact Me
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Homepage;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully".

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Title "Tran Tien Quang" displays
- Subtitle "Full-Stack Engineer — Java / Spring Boot · React / Next.js" displays
- Two buttons render in order: View My Work, Contact Me
- Click "View My Work" → navigates to `/portfolio`
- Click "Contact Me" → navigates to `/contact`

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.jsx
git commit -m "Rewrite homepage hero with full-stack copy"
```

---

## Task 9: Create SkillGroup component

**Files:**
- Create: `src/components/skillGroup.jsx`

- [ ] **Step 1: Write the component**

```jsx
"use client";

const SkillGroup = ({ group, items }) => {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-base text-gray-800">{group}</h3>
            <div className="flex gap-2 flex-wrap">
                {items.map((skill) => (
                    <a
                        key={skill.label}
                        href={skill.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black border border-black transition-colors"
                    >
                        {skill.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SkillGroup;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully" (component is unused so far — that's fine, Next.js doesn't error on unused components).

- [ ] **Step 3: Commit**

```bash
git add src/components/skillGroup.jsx
git commit -m "Add SkillGroup component for grouped skill chips"
```

---

## Task 10: Create TimelineItem component

**Files:**
- Create: `src/components/timelineItem.jsx`

- [ ] **Step 1: Write the component**

```jsx
"use client";

import Image from "next/image";
import { getImagePath } from "@/utils/imagePath";

const TimelineItem = ({ job, isFirst }) => {
    const isLeft = job.side === "left";

    const card = (
        <div className="w-full flex flex-col gap-2">
            <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg flex items-center gap-2">
                {job.companyLogo && (
                    <Image
                        src={getImagePath(job.companyLogo)}
                        alt={`${job.company} logo`}
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                )}
                <span>{job.role} · {job.company}</span>
            </div>
            <div className="p-3 text-sm italic">{job.blurb}</div>
            {job.highlights.length > 0 && (
                <ul className="px-3 list-disc list-inside text-sm text-gray-700 space-y-1">
                    {job.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                    ))}
                </ul>
            )}
            <div className="px-3 text-red-400 text-sm font-semibold">{job.period}</div>
            <div className="px-3 text-xs text-gray-500">{job.location}</div>
        </div>
    );

    return (
        <div className="flex justify-between min-h-[12rem]">
            <div className="w-1/3">{isLeft ? card : null}</div>
            <div className="w-1/6 flex justify-center">
                <div className="w-1 h-full bg-gray-600 rounded relative">
                    <div
                        className={`absolute w-5 h-5 rounded-full ring-4 ring-red-400 -left-2 ${
                            isFirst ? "bg-red-400" : "bg-white"
                        }`}
                    ></div>
                </div>
            </div>
            <div className="w-1/3">{!isLeft ? card : null}</div>
        </div>
    );
};

export default TimelineItem;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully".

- [ ] **Step 3: Commit**

```bash
git add src/components/timelineItem.jsx
git commit -m "Add TimelineItem component with zigzag layout and company logo"
```

---

## Task 11: Refactor about page to use data + new components

**Files:**
- Modify: `src/app/about/page.jsx` (full rewrite)

- [ ] **Step 1: Replace the file contents**

Replace `src/app/about/page.jsx` with:

```jsx
"use client";
import Brain from "@/components/brain";
import SkillGroup from "@/components/skillGroup";
import TimelineItem from "@/components/timelineItem";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { jobs } from "@/data/jobs";

const AboutPage = () => {
    const containerRef = useRef();
    const { scrollYProgress } = useScroll({ container: containerRef });

    const skillRef = useRef();
    const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

    const experienceRef = useRef();
    const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

    const ChevronDown = () => (
        <motion.svg
            initial={{ opacity: 0.2, y: 0 }}
            animate={{ opacity: 1, y: "10px" }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={50}
            height={50}
        >
            <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
            ></path>
            <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
            <path d="M15 11L12 14L9 11" stroke="#000000" strokeWidth="1"></path>
        </motion.svg>
    );

    return (
        <motion.div
            className="h-full"
            initial={{ y: "-200vh" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1 }}
        >
            <div className="h-full overflow-scroll lg:flex" ref={containerRef}>
                {/* TEXT CONTAINER */}
                <div className="p-4 sm:p-8 md:p-12 lg:p-20 flex flex-col gap-24 md:gap-32 lg:gap-48 lg:w-2/3 lg:pr-0">
                    {/* BIOGRAPHY CONTAINER */}
                    <div className="flex flex-col gap-12 justify-center">
                        <h1 className="font-bold text-2xl">BIOGRAPHY</h1>
                        {profile.bio.map((paragraph, i) => (
                            <p key={i} className="text-lg">{paragraph}</p>
                        ))}
                        <span className="italic">{profile.bioQuote}</span>
                        <ChevronDown />
                    </div>

                    {/* SKILLS CONTAINER */}
                    <div className="flex flex-col gap-12 justify-center" ref={skillRef}>
                        <motion.h1
                            initial={{ x: "-300px" }}
                            animate={isSkillRefInView ? { x: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="font-bold text-2xl"
                        >
                            SKILLS
                        </motion.h1>
                        <motion.div
                            initial={{ x: "-300px" }}
                            animate={isSkillRefInView ? { x: 0 } : {}}
                            className="flex flex-col gap-8"
                        >
                            {skillGroups.map((g) => (
                                <SkillGroup key={g.group} group={g.group} items={g.items} />
                            ))}
                        </motion.div>
                        <ChevronDown />
                    </div>

                    {/* EXPERIENCE CONTAINER */}
                    <div className="flex flex-col gap-12 justify-center pb-48" ref={experienceRef}>
                        <motion.h1
                            initial={{ x: "-300px" }}
                            animate={isExperienceRefInView ? { x: "0" } : {}}
                            transition={{ delay: 0.2 }}
                            className="font-bold text-2xl"
                        >
                            EXPERIENCE
                        </motion.h1>
                        <motion.div
                            initial={{ x: "-300px" }}
                            animate={isExperienceRefInView ? { x: "0" } : {}}
                        >
                            {jobs.map((job, i) => (
                                <TimelineItem key={job.id} job={job} isFirst={i === 0} />
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* SVG CONTAINER */}
                <div className="hidden lg:block w-1/3 sticky top-0 z-30 xl:w-1/2">
                    <Brain scrollYProgress={scrollYProgress} />
                </div>
            </div>
        </motion.div>
    );
};

export default AboutPage;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully" with no warnings about missing `next/image` configuration (we removed the Pexels remote-pattern dependency from this page).

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000/about`. Confirm:
- Biography section: stock Pexels photo is gone; new bio paragraphs render
- Skills section: 9 grouped categories render with bold group headings; chips clickable
- Experience timeline: 5 entries (VinSmartFuture, NAVER, Cốc Cốc, Appota, Karazin) in zigzag (left/right/left/right/left); company logos render in the cards; first entry's dot is filled red, others are white-on-red-ring; periods correct (NAVER reads "Oct 2022 – Nov 2025", not "Sep 2022 – Present")
- Brain SVG still visible on right at `lg` breakpoint
- Scroll-triggered slide-in animations still fire on Skills and Experience headings

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/app/about/page.jsx
git commit -m "Refactor about page to render bio/skills/timeline from data modules"
```

---

## Task 12: Create GeneratedCard component

**Files:**
- Create: `src/components/generatedCard.jsx`

- [ ] **Step 1: Write the component**

```jsx
"use client";

import Image from "next/image";
import { getImagePath } from "@/utils/imagePath";

const GeneratedCard = ({ project }) => {
    return (
        <div
            className={`w-full h-full bg-gradient-to-br ${project.gradient} rounded-lg flex flex-col items-center justify-center p-8 gap-6`}
        >
            {project.companyLogo && (
                <div className="bg-white/80 rounded-full p-3">
                    <Image
                        src={getImagePath(project.companyLogo)}
                        alt={`${project.company} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                </div>
            )}
            <div className="text-center text-white drop-shadow">
                <div className="text-sm uppercase tracking-wider opacity-90">
                    {project.company}
                </div>
                <div className="text-2xl font-bold mt-1">{project.title}</div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {project.stack.slice(0, 6).map((tech) => (
                    <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-white/30 text-white rounded backdrop-blur-sm"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default GeneratedCard;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully".

- [ ] **Step 3: Commit**

```bash
git add src/components/generatedCard.jsx
git commit -m "Add GeneratedCard fallback for projects without screenshots"
```

---

## Task 13: Create ProjectCard component

**Files:**
- Create: `src/components/projectCard.jsx`

- [ ] **Step 1: Write the component**

```jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/utils/imagePath";
import GeneratedCard from "./generatedCard";

const ProjectCard = ({ project }) => {
    const hasScreenshot = Boolean(project.image);

    return (
        <div
            className={`h-screen w-screen flex items-center justify-center bg-gradient-to-r ${project.gradient}`}
        >
            <div className="flex flex-col gap-6 text-white max-w-5xl px-8 lg:px-16">
                {/* HEADER: company + period */}
                <div className="flex items-center gap-3 text-sm uppercase tracking-wider opacity-90">
                    {project.companyLogo && (
                        <Image
                            src={getImagePath(project.companyLogo)}
                            alt=""
                            width={24}
                            height={24}
                            className="object-contain bg-white/80 rounded p-0.5"
                        />
                    )}
                    <span>{project.company}</span>
                    <span>·</span>
                    <span>{project.period}</span>
                </div>

                <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                    {project.title}
                </h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* IMAGE / GENERATED CARD */}
                    <div className="relative w-full lg:w-1/2 h-56 md:h-64 lg:h-80">
                        {hasScreenshot ? (
                            <Image
                                src={getImagePath(project.image)}
                                alt={project.title}
                                fill
                                className="object-cover rounded-lg"
                            />
                        ) : (
                            <GeneratedCard project={project} />
                        )}
                    </div>

                    {/* TEXT */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        <p className="text-base lg:text-lg">{project.summary}</p>
                        <ul className="list-disc list-inside text-sm lg:text-base space-y-1">
                            {project.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* STACK */}
                <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-white/30 text-white rounded backdrop-blur-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* LINK */}
                {project.links?.live && (
                    <div className="flex justify-end">
                        <Link href={project.links.live} target="_blank" rel="noreferrer">
                            <button className="p-3 lg:p-4 bg-white text-gray-700 font-semibold rounded">
                                See Live →
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully".

- [ ] **Step 3: Commit**

```bash
git add src/components/projectCard.jsx
git commit -m "Add ProjectCard component with screenshot/GeneratedCard fallback"
```

---

## Task 14: Refactor portfolio page to use 7 ProjectCards

**Files:**
- Modify: `src/app/portfolio/page.jsx` (full rewrite)

- [ ] **Step 1: Replace the file contents**

Replace `src/app/portfolio/page.jsx` with:

```jsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import ProjectCard from "@/components/projectCard";
import { projects } from "@/data/projects";

const PortfolioPage = () => {
    const ref = useRef();
    const { scrollYProgress } = useScroll({ target: ref });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-87%"]);

    return (
        <motion.div
            className="h-full"
            initial={{ y: "-200vh" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1 }}
        >
            <div className="h-[900vh] relative" ref={ref}>
                <div className="w-screen h-[calc(100vh-6rem)] flex items-center justify-center text-8xl text-center">
                    My Works
                </div>
                <div className="sticky top-0 flex h-screen gap-4 items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </motion.div>
                </div>
            </div>
            <div className="w-screen h-screen flex flex-col gap-16 items-center justify-center text-center">
                <h1 className="text-8xl">Do you have a project?</h1>
                <div className="relative">
                    <motion.svg
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                        viewBox="0 0 300 300"
                        className="w-64 h-64 md:w-[500px] md:h-[500px]"
                    >
                        <defs>
                            <path
                                id="circlePath"
                                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
                            />
                        </defs>
                        <text fill="#000">
                            <textPath xlinkHref="#circlePath" className="text-xl">
                                Full-Stack Engineer · Java · Spring Boot · React
                            </textPath>
                        </text>
                    </motion.svg>
                    <Link
                        href="/contact"
                        className="w-16 h-16 md:w-28 md:h-28 absolute top-0 left-0 right-0 bottom-0 m-auto bg-black text-white rounded-full flex items-center justify-center"
                    >
                        Hire Me
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PortfolioPage;
```

Notes on the changes vs the original:
- Removed the empty leading gradient pane (`<div className="h-screen w-screen ... from-purple-300 to-red-300" />`) — buys back one viewport.
- Container height `h-[600vh]` → `h-[900vh]` to accommodate 7 cards.
- `useTransform` end value `-80%` → `-87%` so the 7th card lands flush.
- Footer rotating text updated.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully".

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000/portfolio`. Confirm:
- Initial "My Works" hero displays
- Scroll down — horizontal carousel triggers
- All 7 projects scroll past in order: VinSmartFuture, NAVER OMS, NAVER QRCode, NAVER Bug Bounty, NAVER Internal Apps, Cốc Cốc, Appota
- Each card shows: company logo + name, period, project title, summary, highlights bullets, stack chips
- Generated card fallback renders for projects with no `image` field (all 7 currently)
- Cốc Cốc and Appota cards show "See Live →" button (others have no live link, so no button)
- Last card lands cleanly (not cut off, no excess scroll past it)
- "Do you have a project?" footer with rotating "Full-Stack Engineer · Java · Spring Boot · React" text + Hire Me button

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/app/portfolio/page.jsx
git commit -m "Refactor portfolio to render 7 ProjectCards from data; tune scroll length"
```

---

## Task 15: Fix contact page copy

**Files:**
- Modify: `src/app/contact/page.jsx:57`

- [ ] **Step 1: Update the salutation**

In `src/app/contact/page.jsx`, change line 57:

```jsx
<span>Dear Quang,</span>
```

to:

```jsx
<span>Dear Visitor,</span>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully".

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000/contact`. Confirm form salutation reads "Dear Visitor,". Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.jsx
git commit -m "Fix contact form salutation: visitor writes to Quang, not Quang to himself"
```

---

## Task 16: Update navbar socials

**Files:**
- Modify: `src/components/navbar.jsx:82-95`

- [ ] **Step 1: Replace the SOCIAL block**

In `src/components/navbar.jsx`, replace the entire `{/* SOCIAL */}` block (currently lines 82–95):

```jsx
            <div className="hidden md:flex gap-4">
                <Link href="https://github.com/kalen1o">
                    <Image src={getImagePath("/github.png")} alt="" width={24} height={24} />
                </Link>
                <Link href="https://www.linkedin.com/in/kalen1o/">
                    <Image src={getImagePath("/linkedin.png")} alt="" width={24} height={24} />
                </Link>
                <Link href="https://www.facebook.com/kalen1o">
                    <Image src={getImagePath("/facebook.png")} alt="" width={24} height={24} />
                </Link>
                <Link href="https://www.instagram.com/kalen_1o/">
                    <Image src={getImagePath("/instagram.png")} alt="" width={24} height={24} />
                </Link>
            </div>
```

with:

```jsx
            <div className="hidden md:flex gap-4 items-center">
                <Link href="https://github.com/kalen1o" target="_blank" rel="noreferrer" aria-label="GitHub">
                    <Image src={getImagePath("/github.png")} alt="GitHub" width={24} height={24} />
                </Link>
                <Link href="https://www.linkedin.com/in/kalen1o/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <Image src={getImagePath("/linkedin.png")} alt="LinkedIn" width={24} height={24} />
                </Link>
                <a
                    href="mailto:trantienquang101198@gmail.com"
                    aria-label="Email"
                    className="w-6 h-6 flex items-center justify-center"
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-10 5L2 7" />
                    </svg>
                </a>
            </div>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: "Compiled successfully".

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm at desktop breakpoint:
- GitHub icon → opens `https://github.com/kalen1o` in new tab
- LinkedIn icon → opens LinkedIn profile in new tab
- Email icon (envelope SVG) → triggers mailto compose
- Facebook and Instagram icons are gone

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/components/navbar.jsx
git commit -m "Trim navbar socials to GitHub/LinkedIn/email"
```

---

## Task 17: Production build smoke test

**Files:** none modified

- [ ] **Step 1: Run a production build matching GitHub Pages config**

```bash
NODE_ENV=production npm run build
```

Expected: "Compiled successfully" with the `out/` directory generated. No errors about missing assets, broken `getImagePath` calls, or `<Image>` config issues.

- [ ] **Step 2: Spot-check the export**

```bash
ls out/ out/about out/portfolio out/contact
ls out/companies/
```

Expected: each route has its own `index.html`; company logos are in `out/companies/`.

- [ ] **Step 3: If smoke test passed, no commit needed**

If anything failed, fix and re-run the failing tasks above.

---

## Self-review notes

**Spec coverage:** every spec section maps to at least one task —
- Section 1 (data layer) → Tasks 3, 4, 5, 6
- Section 2 (homepage) → Task 8 (depends on Task 3)
- Section 3a (bio) → Task 11
- Section 3b (skills) → Tasks 9, 11
- Section 3c (timeline) → Tasks 2, 5, 10, 11
- Section 4 (portfolio) → Tasks 6, 12, 13, 14
- Section 5 (small fixes: contact, navbar, layout) → Tasks 7, 15, 16
- Image acquisition plan → Task 2 (CV PDF deferred per user request)
- Production export verification → Task 17

**Type/name consistency check passed:**
- `companyLogo` field used consistently in `jobs.js`, `projects.js`, `<TimelineItem>`, `<ProjectCard>`, `<GeneratedCard>`
- `gradient` field used consistently in `projects.js`, `<ProjectCard>`, `<GeneratedCard>`
- `getImagePath` wrapper used everywhere a `/public/` asset is referenced (handles GitHub Pages basePath)

**No unused fields:** `links.repo` and `links.caseStudy` are mentioned in the spec's data shape but no project in `projects.js` populates them, and `<ProjectCard>` only reads `links.live`. Intentional — they're in the schema for future use without code changes.
