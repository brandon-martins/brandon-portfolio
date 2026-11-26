# Brandon Martins — Portfolio

Personal portfolio for [brandonmartins.co.za](https://brandonmartins.co.za), built for two audiences — prospective employers and prospective clients — via the **Lens** concept: the visitor picks _Hire Brandon_, _Start a project_ or _Just look around_, and the page re-orders its sections and CTAs. Nothing is ever hidden.

| Layer     | Tech                                                                                                                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| Client    | React 19, Vite, TypeScript (strict), Tailwind CSS v4 (`@theme` tokens), React Router 6, `motion`, `lucide-react`, Axios |
| Rendering | Pre-rendered (SSG) with `vite-react-ssg`: every route ships real HTML                                                   |
| Server    | Node.js, Express 5, TypeScript (ESM / NodeNext), Mongoose, Nodemailer, Helmet                                           |
| Shared    | `@portfolio/shared`: the Zod contact schema and its types, used by both sides                                           |
| Quality   | Vitest, Supertest, ESLint (flat config), GitHub Actions, Lighthouse CI (≥ 90 in every category)                         |

## Repository layout

An **npm workspaces** monorepo. Each package owns its code and its `package.json`; npm installs everything from the root into one lockfile.

```
portfolio/
├── package.json          # workspaces + root tooling only (eslint, typescript, vitest, concurrently, lhci)
├── package-lock.json     # the single lockfile
├── tsconfig.base.json    # strict flags shared by every package
├── eslint.config.js
├── client/               # Vite + React app            (moduleResolution: bundler, extensionless imports)
├── server/               # Express API                 (module: NodeNext, `.js` import extensions)
└── packages/
    └── shared/           # @portfolio/shared           (compiled ESM + .d.ts in dist/)
```

**Why this structure.**

- _Workspaces, not separate repos or folders:_ one lockfile and one install keep versions from drifting, CI is a single `npm ci`, and it is the only layout that lets two packages share code without copying or publishing it.
- _A root `node_modules` is expected._ Workspaces hoist shared dependencies there (that is what the "extra" `node_modules` is). Do not run `npm install` inside `client/` or `server/`; run it at the root.
- _`packages/shared` exists because the schemas had already drifted_ (the client rejected a filled honeypot while the server deliberately returns a silent success). One schema now defines the form's contract on both sides.
- _Shared is compiled to `dist/`, not consumed as raw `.ts`,_ because the server compiles with NodeNext and runs `node dist/server.js`, while the client uses a bundler. Compiled ESM with an `exports` map works for both.
- _Pure only:_ `shared` may contain Zod schemas and types. No Node or DOM imports, no `process.env`.
- _pnpm and Turborepo are the upgrade path,_ not needed yet. `client` and `server` run a `pre*` script that builds `shared` first, which is what Turborepo's `dependsOn: ["^build"]` would do.

To add shared code: put it in `packages/shared/src`, export it from `index.ts` (with the `.js` extension), and import it as `@portfolio/shared`.

## Getting started

Requires Node 22.19 or newer (see `.nvmrc`).

```bash
npm install                          # from the repo root
cp client/.env.example client/.env
cp server/.env.example server/.env   # set MONGODB_URI and CONTACT_TO_EMAIL at minimum
npm run dev                          # builds shared, then client :5173, server :4000 and shared in watch mode
```

| Script                                | What it does                                                                                   |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `npm run dev`                         | Shared (watch), client and server together                                                     |
| `npm run build`                       | Builds shared, pre-renders the client (plus `404.html`, `sitemap.xml`) and compiles the server |
| `npm run typecheck` / `lint` / `test` | The same checks CI runs (each builds `shared` first when needed)                               |
| `npm run lighthouse`                  | Lighthouse CI against `client/dist` (build first)                                              |

## How it fits together

- **One typed data layer** (`client/src/data/`). Experience, projects, qualifications, skills, testimonials, lenses, site config and the legal text live there and nowhere else. The CV page, project filters, skill→project counts and timeline→project links all derive from it, so they cannot drift.
- **The Lens** (`hooks/useLens.tsx`) resolves `?lens=` → saved choice → default, after hydration, so the pre-rendered HTML is always the default lens (**Hiring**; change `defaultLens` in `data/lenses.ts`). `?lens=` accepts `hire`/`hiring`, `client`/`project` and `look`/`explore`. Each lens defines a section order in `data/lenses.ts`; every section appears in every lens.
- **Contact flow:** stepped form → `@portfolio/shared` schema on the client → `POST /api/contact` → the same schema on the server → honeypot → Turnstile → per-IP rate limit → MongoDB (`ipHash`, never the raw IP) → email to Brandon + acknowledgement to the sender. Email failures never lose a stored message.
- **Contact copy:** the heading and intro beside the form follow the _selected_ enquiry type (`data/contact.ts`); the lens only pre-selects it. The reply time ("one business day") is the single constant `RESPONSE_TIME` in `packages/shared/src/site.ts`, read by the site config (page and form copy) and by the server's acknowledgement email, with tests so the wording cannot drift.
- **Design:** the light theme follows mockup "A — Light, fresh". Dark has no mockup, so its tokens are derived from the same system. All colours are tokens in `client/src/styles/index.css`; the contact panel has its own `--panel-*` tokens. Text contrast is ≥ 5.1:1 in both themes. Design-system classes (`.btn`, `.card`, `.tag` …) live in Tailwind's `components` layer, so a plain utility on an element can override them without `!important`.
- **Theme:** **light is the default for everyone**; dark is opt-in (header or footer toggle) and remembered. The pre-rendered HTML is light, so the default case never flashes. This deliberately differs from "follow the OS setting" in spec F7.
- **Brand mark:** `client/public/favicon.svg` is the single source. The tab icon and the header logo are the same file (Bricolage Grotesque "BM" converted to outlines, because SVG favicons can't load web fonts). `favicon.ico` and `apple-touch-icon.png` are rendered from it.
- **Fonts:** self-hosted via `@fontsource-variable/*`: Bricolage Grotesque (headings), Geist (body), Geist Mono (eyebrows, dates, counts).
- **Icons:** generic UI icons are `lucide-react`. Brand logos lucide does not provide (GitHub, LinkedIn) are Simple Icons SVGs in `client/src/assets/icons/tech/`, drawn by `components/ui/BrandIcon.tsx` with a CSS mask so they follow the text colour in both themes. LinkedIn is from Simple Icons v13 because later releases dropped it.
- **Mobile:** the header is sticky; below 1024px it becomes a menu button that opens a right-hand drawer (sections, lens switch, Get in touch, Download CV). Primary actions are full-width pills below 640px; filter chips keep their natural width. Content padding is 20px on phones, 32px from `sm`.
- **Overlays:** the mobile menu and the command palette use the generic `components/ui/Drawer.tsx` and `Modal.tsx` (portaled to `<body>`, one `z-[9999]` layer, fixed header/footer with a scrolling body). `hooks/useOverlay.ts` gives both Escape, a Tab focus trap, page scroll lock and focus return.
- **Shared links with a lens and a section** (`/?lens=client#projects`): the lens re-orders the sections after hydration, so `ScrollManager` waits for `useLens().ready` before scrolling, the first jump is instant (`client/index.html` switches off smooth scrolling for a `#hash` load, and `ScrollManager` restores it), and the re-order animation is off until `ready`, so it only plays when a visitor changes the lens.
- **Experience** roles are native `<details>`: the newest is open, the rest collapsed, with an "Expand all" button. A closed `<details>` keeps its text in the pre-rendered HTML for crawlers but removes its links from the Tab order, so no `inert` or `visibility` workaround is needed (React 19).
- **Certifications and courses** are a native scroll-snap strip (`components/CertificationsCarousel.tsx`): swipe, trackpad and arrow keys work without custom code, previous/next buttons and a "1–3 of 15" readout sit above it, and "View all" turns it into a grid. Every card stays in the DOM. The visible-range maths is the tested `utils/carousel.ts`. Each entry's `kind` (Certification or Course) shows on its card; add `credentialUrl` for a "Verify credential" link.
- **Jumping to a section** puts that section's top edge at the top of the screen, so the previous section never shows above it. The space above its heading is `--section-gap` in `index.css` (5rem phones / 8rem from `md`); the sticky header sits inside that space. The Contact section has a minimum height so it can also reach the top.
- **Command palette:** Ctrl/Cmd + K, or the "Quick search" button in the footer.
- **Back to top:** a floating button appears after one screen of scrolling.
- **Legal:** `/privacy` (Privacy Notice, POPIA) and `/terms`, linked from the footer; the consent checkbox in the contact form links to the notice in a new tab so the visitor keeps what they typed. The text is in `client/src/data/legal.ts` and describes what the code actually stores, so update it if that changes.

## Before launch: placeholders and decisions

- Bracketed copy (`[Impact bullet…]`, `[Year]`, `[##]`, testimonials, process steps, case-study text) in `client/src/data/`
- `siteConfig.email`, LinkedIn URL, `VITE_BOOKING_URL`
- `client/public/cv.pdf` and `og-default.png` (1200×630); portrait photo and project screenshots
- Turnstile keys (`VITE_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`) and SMTP credentials
- **Legal review:** have `data/legal.ts` reviewed by a South African lawyer. Confirm the service providers named (email, database, hosting, Cloudflare), whether any process data outside South Africa, and decide a fixed retention period (the notice currently says "a reasonable time"; nothing deletes messages automatically). Consider storing the notice version with each message as evidence of consent.

## Deployment

It is a monorepo, so install and build from the **repository root**.

- **Client** → Vercel or Netlify. Root directory `client` with "include files outside the root directory" enabled (it needs `packages/shared`), install `npm ci` at the repo root, build `npm run build -w client`, output `client/dist`.
- **Server** → Render, Railway or Fly. Build `npm ci && npm run build -w server` from the root, start `npm start -w server`. Set `CLIENT_ORIGIN` to the client's origin and `VITE_BACKEND_URL` to the API's.

## Section numbering

The `01 —`, `02 —` eyebrows are computed from the active lens order, so they stay correct when the lens re-orders the page.

## Dependency note

- `react-router-dom` is pinned to v6 because `vite-react-ssg` declares it as a peer dependency.
- The root `package.json` has an `overrides` entry for `react-helmet-async`. `vite-react-ssg` depends on `react-helmet-async@1.x`, whose peer range stops at React 18, so npm installed a second copy of React 18 next to the app's React 19 and pre-rendering failed with "Objects are not valid as a React child". The override makes that package use the single React 19 install. **Remove it once `vite-react-ssg` ships a release that supports React 19 natively.** Check with `npm ls react react-dom`: every line should show one version.
- Everything else uses caret ranges at the latest stable release when the project was set up. `typescript` and `vitest` are declared once, at the root, so every package uses the same version.

## License

The source code is released under the [MIT License](LICENSE).

The personal content is **not** covered by that license and remains all rights reserved:
everything in `client/src/data/` (biography, experience, case studies, testimonials),
the portrait and project screenshots, the CV, and the brand mark
(`client/public/favicon.svg`). Please don't reuse it without permission.
