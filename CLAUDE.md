# Project rules (committed)

- TypeScript strict on client and server. No `any` without a comment explaining why.
- All site content lives in `client/src/data/`. No hard-coded content in components.
- Server imports use `.js` extensions (NodeNext). Client imports are extensionless (Vite bundler resolution).
- Routes are thin; controllers own logic; `configs/` owns connections; `configs/env.ts` is the only reader of `process.env`.
- One Axios instance (`client/src/lib/axiosClient.ts`); services are domain-split; components never touch HTTP.
- Global CSS owns appearance (tokens, `.btn`, `.card`); Tailwind owns layout. Design-system classes live in `@layer components` so utilities can override them; never reach for `!important`.
- Overlays (menu, palette, any future dialog) use `components/ui/Modal` or `Drawer`: portaled to `<body>`, one `z-[9999]` layer, behaviour from `hooks/useOverlay`. Page chrome (sticky header, back-to-top) is `z-30`.
- Browser-only APIs (`localStorage`, `matchMedia`, `window`) run inside effects so pre-rendered HTML stays hydration-safe.
- Before declaring work done: `npm run lint && npm run typecheck && npm test && npm run build`.
- Icons: `lucide-react` for every generic UI icon (no text arrows like `→`). Brand logos only as Simple Icons SVGs in `client/src/assets/icons/tech/`, rendered with `BrandIcon`. No other icon libraries.
- Colours come from tokens (`--bg`, `--ink`, `--acc`, `--panel-*` …). No hard-coded hex in components.
- Comments explain _why_ something exists, not what the code already says.
- Monorepo: npm workspaces (`client`, `server`, `packages/shared`). Install and run from the root. Shared code goes in `packages/shared` (pure Zod/types, no Node or DOM, no `process.env`), imported as `@portfolio/shared`. `typescript` and `vitest` are root devDependencies only.
- A conditional pair of buttons in the same spot (Continue / Send) needs distinct `key`s, or React reuses one element and a click can submit the form early.
- Closing a dialog returns focus to its opener _after_ the key event (`setTimeout`), or Enter re-presses the opener and reopens it.
- Section anchors rely on `--section-gap` (top padding) and `scroll-padding-top: 0`. Do not add `scroll-margin`/`scroll-padding` offsets.
- The brand mark is `client/public/favicon.svg`; the header uses that same file. Change it in one place.
- Legal text lives in `client/src/data/legal.ts` and must describe what the code actually stores.
