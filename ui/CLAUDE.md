# Bookmarks Search UI

Plain JavaScript UI for querying a document database: no framework, no build step.

## Requirements
The project spec is @docs/SPEC.md and is the source of truth for behavior.
Ask before deviating from it or filling gaps it leaves open (e.g. the API contract).
The "SPEC EXAMPLE FORMATS" section at the bottom of the spec is a formatting
template, not requirements for this project.

## Conventions
- Vanilla ES modules only; no npm dependencies unless agreed first.
- Entry point is `index.html`, which loads `js/main.js` and `css/styles.css`.
- Components live in `js/components/`, one per file, each a `createX()` function returning
  a DOM element, or `{ element, ...methods }` when the app needs to update it.
- `js/main.js` owns app state (selected document) and wires components together.
- The API URL lives only in `js/config.js`; all API calls go through `js/api.js`.
- Build DOM with `textContent`, never `innerHTML` with API data; only put http(s) URLs
  into links and iframes (`isWebUrl` in `js/urls.js`).
- Use the spec's screen element names (QUERY INPUT, RESPONSE LIST, DOCUMENT DETAIL,
  SHOW SOURCE, PAGEVIEW) in code and ids, e.g. `query-input`, `response-list`.

## Running
ES modules don't load from `file://`; serve the folder:
`python3 -m http.server 8000`, then open http://localhost:8000.
