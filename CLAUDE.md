# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page bilingual (RU/EN) portfolio site. React 19 + TypeScript + Vite + CSS Modules, no UI or i18n libraries.
Tests: Vitest + Testing Library (jsdom). README and code comments/JSDoc are in Russian — keep new comments in Russian.

## Commands

```bash
npm run dev          # dev server, http://localhost:5173
npm run build        # tsc -b && vite build → dist/
npm test             # vitest run (all tests)
npx vitest run src/shared/lib/duration.test.ts   # single file
npx vitest run -t 'не показывает личные контакты' # single test by name
npm run lint         # eslint .
npm run typecheck    # tsc -b
npm run format       # prettier --write .
```

## Architecture

Feature-Sliced-style layout: `src/app` (root, layout, global CSS vars) → `src/widgets` (page sections) →
`src/features` (`contact`, `language-switcher`) → `src/shared` (`config`, `data`, `i18n`, `lib`, `ui`).
Higher layers import from lower ones only.

**Two sources of text:**
- Resume content lives in `src/shared/data/profile.ts` (`PROFILE`); every string is `LocalizedText` (`{ ru, en }`).
- UI labels live in `src/shared/i18n/ru.ts` / `en.ts`. `Dictionary = typeof ru`, so `ru.ts` is the source of truth
  and `en.ts` must mirror its shape. Access via `useI18n()` → `{ locale, t, setLocale }`.

**Locale routing** (`I18nProvider` in `src/shared/i18n/I18nContext.tsx` + `src/shared/lib/locale-path.ts`): the locale is taken from the
URL path (`/ru/`, `/en/`, also under a subfolder). The root path resolves saved choice (localStorage
`portfolio.locale`) → browser language → `DEFAULT_LOCALE` and `replaceState`s to the locale URL. Switching language
`pushState`s (keeping hash), and `popstate` switches back. The provider also updates `<html lang>`, title and meta tags.

**Build plugin** `vite-plugins/locale-pages-plugin.ts`: `index.html` contains `%PAGE_*%` placeholders; at build time
the plugin emits `ru/index.html` and `en/index.html` with per-locale meta from `src/shared/i18n/page-meta.ts`
(rewriting `./` → `../`). Because the Vite config imports `src/shared/config/i18n.const.ts`, `src/shared/lib/enums.ts`
and `page-meta.ts`, those files (and anything they import) must use explicit `.ts` extensions in imports.
`base: './'` — keep asset paths relative.

**Derived numbers**: years of experience, team-lead count and technology count are computed from `PROFILE.jobs` /
`skillGroups` in `src/shared/data/stats.ts` (`getProfileStats(profile, now)`), using inclusive month math from
`src/shared/lib/duration.ts`. `{total}` / `{recent}` placeholders in `PROFILE.lead` are replaced with these. Never
hardcode experience durations. `end: null` on a job means "present".

**Contact form** (`src/features/contact`): POSTs JSON as `text/plain` in `no-cors` mode to a Google Apps Script URL
in `src/shared/config/contact.const.ts` — the response is unreadable, so "sent" means no network error. Has a
honeypot field and length limits from the same const file.

## Conventions

Enforced by ESLint/Prettier (4 spaces, 120 cols, single quotes):
- `type` instead of `interface` (`consistent-type-definitions`).
- Separate `import type` statements; never mix value and type imports.
- Braces on every `if` (`curly: all`); explicit `public` on class members.
- Enums instead of string unions — put them in `src/shared/lib/enums.ts`; constants/defaults go in
  `src/shared/config/*.const.ts`.
- JSDoc `/** */` on functions, components, types (and each type field), enums and constants.

## Privacy

`src/app/App.test.tsx` asserts that phone, email, Telegram handle and salary expectations are not rendered. Don't add
personal contact data to `profile.ts` or dictionaries. `person.pdf` (source resume) is git-ignored.
