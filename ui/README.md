# Bookmarks Search UI

A plain JavaScript UI for querying a document database — no framework, no build step.

Requirements are in [docs/SPEC.md](docs/SPEC.md).

## Run

ES modules don't load from `file://`, so serve the folder locally:

run from same directory as index.html
```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Structure

```
CLAUDE.md             conventions and context for Claude Code
docs/SPEC.md          project specification
index.html            entry page
css/styles.css        global styles
js/main.js            entry script, app state, wires components together
js/config.js          search API URL
js/api.js             search API call (fetch)
js/urls.js            URL helpers (http(s) check, YouTube embed URL)
js/components/        the four windows: queryInput, responseList, documentDetail, pageView
```

## API

The UI POSTs `{ "query": "..." }` to the URL in `js/config.js` and expects a JSON array
of documents (see `docs/SPEC.md`, API CONTRACT). Because the page and API run on
different ports, the API must send CORS headers, e.g. `Access-Control-Allow-Origin: *`,
and answer `OPTIONS` preflight requests.
