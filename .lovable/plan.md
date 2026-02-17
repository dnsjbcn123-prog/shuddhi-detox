

## Problem

The `base: "/shuddhi-detox/"` setting in `vite.config.ts` applies to ALL environments -- including the Lovable preview. Since the preview serves from `/` (not `/shuddhi-detox/`), all JavaScript and CSS files fail to load, resulting in a blank page.

## Solution

Make the base path conditional: use `"/shuddhi-detox/"` only during production builds (for GitHub Pages), and `"/"` during development (for the Lovable preview).

## Changes

### 1. Update `vite.config.ts`

Change the `base` property from a hardcoded value to a conditional one:

```text
base: "/shuddhi-detox/"
```
becomes:
```text
base: mode === "production" ? "/shuddhi-detox/" : "/"
```

This single change ensures:
- **Lovable preview** works correctly (serves from `/`)
- **GitHub Pages** deployment works correctly (serves from `/shuddhi-detox/`)

### 2. Update `src/App.tsx` Router

Add `basename` to `BrowserRouter` so React Router matches routes correctly on GitHub Pages:

```text
<BrowserRouter basename={import.meta.env.BASE_URL}>
```

This ensures navigation works on both environments.

No other files need to change. The workflow, 404.html, and all other configs remain as they are.

