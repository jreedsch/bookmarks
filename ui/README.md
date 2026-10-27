# Bookmarks Search UI

A plain JavaScript UI for querying a document database — no framework, no build step.

Requirements are in [docs/SPEC.md](docs/SPEC.md).

## Run

ES modules don't load from `file://`, so serve the folder locally:

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
js/main.js            entry script, mounts components into #app
js/components/        UI components (functions that return DOM elements)
```
