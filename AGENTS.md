# AGENTS.md

Context for AI agents working on **abhyuday.dev**, the personal portfolio of Abhyuday Pratap Singh (software engineer, Berlin).

## Stack

- Vite 5 + React 18 + TypeScript (SPA, `BrowserRouter`)
- Tailwind CSS 3 + `@tailwindcss/typography` (`prose` classes on the About page)
- framer-motion (page/card animations), zustand (sidebar store), lucide-react (icons)
- three / @react-three/fiber / drei (Journey globe, currently hidden)

Scripts: `npm run dev`, `npm run build` (vite build), `npm run lint`, `npm run preview`. There are no tests. `dist/` is build output.

## Routes (`src/components/AnimatedRoutes.tsx`)

| Path | Component | Status |
|------|-----------|--------|
| `/` | `pages/HomePage.tsx` | Live: emerald hero, Hindi/English tagline, photo |
| `/about` | `pages/AboutPage.tsx` | Live: Work, Hobbies, Contact. Email is built in JS and shown obfuscated to avoid crawlers |
| `/journey`, `/journey/:year` | `pages/JourneyPage/index.tsx`, `pages/YearOverview.tsx` | Hidden. Shows `WorkInProgress` in production via `config/features.ts` (`showJourneyPage`). **Intentionally kept: the author plans to build it out, so do not delete it.** Its data in `src/data/events/*` is placeholder |

`App.tsx` renders `Navbar` (top bar) + `AnimatedRoutes`. Nav links live in `src/constants/navigation.ts`: `navItems` (Home, About, Writing; Journey is commented out) and `socialLinks` (Twitter, LinkedIn, GitHub, Goodreads), which `Footer.tsx` uses.

## Blog (`/writing`)

- `/writing` → `pages/WritingPage.tsx` (list with section/tag filters via query params), `/writing/:slug` → `pages/PostPage.tsx` (react-markdown + remark-gfm + react-syntax-highlighter).
- Posts are markdown files in `src/data/posts/*.md`, loaded by `src/lib/posts.ts` with `import.meta.glob` (`?raw`). Slug = filename with `_` → `-`.
- Frontmatter: `title`, `date` (YYYY-MM-DD), `section` (`thoughts` | `tech`), `tags: [a, b]`, `excerpt`, `draft: true` (hidden in production).
- The old blog (AI-generated posts, Tech page, old loaders) was removed on purpose. Do not add AI-generated posts; posts are the author's own writing.

## Personal (`/personal`, unlisted)

- Same components as Writing (`WritingPage`/`PostPage` with `collection="personal"`), configured in `COLLECTIONS` in `src/lib/posts.ts`. No section filter, tags only.
- Posts live in `src/data/personal/*.md` (same frontmatter; `section` is ignored).
- Intentionally not in `navItems`; reachable by direct link only.

## Layout and styling notes

- Shared page shell: `PageTransition` (`components/transitions/PageTransition.tsx`), the page body, then `Footer`.
- Assets are in `src/assets/images/` (profile photo, header ski photo, football logos). `public/earth-texture.jpg` is used by the globe.
- Home and About images deliberately block the context menu and dragging.

## Dead and legacy code (do not extend; safe to clean up when asked)

- Duplicates: `components/JourneyPage.tsx`, `components/Journey/YearSection.tsx`, `components/YearSection.tsx`, `components/Globe.tsx`, `components/PageTransition.tsx`. The active versions are under `pages/JourneyPage/` and `components/transitions/`.
- `components/Layout.tsx`, `Navigation/Sidebar.tsx`, `MenuButton.tsx`, `SocialLinks.tsx`, `Timeline.tsx` and `stores/navigationStore.ts` belong to the old layout.
- `HomePage.tsx` has unused `ArrowRight` and `Link` imports.

## Conventions

- Keep changes surgical, and follow the existing Tailwind-utility style. There is no CSS-in-JS.
- Nav entries live in `navItems` in `src/constants/navigation.ts`.
- Production feature flags are in `src/config/features.ts`. `import.meta.env.PROD` selects the production flags.
- Verify with `npm run build` (and `npm run lint`) after code changes. Lint may report pre-existing errors in the legacy files.
