# RootWurx — Test Site

Single-page site for RootWurx. Static HTML + CSS + JSX (Babel-in-browser, no build step).

## Local preview

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. In Vercel → **New Project → Import** this repo.
3. Framework preset: **Other**. No build command. Output directory: `./`.
4. Deploy.

`vercel.json` enables clean URLs. `index.html` serves at the root.

## Structure

- `index.html` — entry point, loads all components
- `components/` — React components (JSX, transpiled in-browser)
- `styles.css` — global styles

## Notes

- Babel Standalone transpiles JSX at runtime. Fine for a small marketing site; adds ~200ms to first paint. Can be pre-compiled later if needed.
- The animated Knowledge Agent demo in the Work section loops through 3 scripted Q&As; hover pauses.
