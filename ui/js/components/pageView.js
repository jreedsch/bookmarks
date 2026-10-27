import { isWebUrl, youtubeEmbedUrl } from '../urls.js';

// PAGEVIEW window: shows the selected document's source in an iframe when SHOW SOURCE
// is checked. YouTube pages use the embed URL; an "Open in new tab" link is always shown
// because many sites refuse to be framed (docs/SPEC.md).
export function createPageView() {
  const section = document.createElement('section');
  section.id = 'pageview';
  section.className = 'window';

  const bar = document.createElement('div');
  bar.className = 'pageview-bar';

  const link = document.createElement('a');
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Open in new tab ↗';

  const frame = document.createElement('iframe');
  frame.title = 'Source document';

  const placeholder = document.createElement('p');
  placeholder.className = 'status';

  section.append(bar, placeholder, frame);

  function show(doc, showSource) {
    const url = doc && isWebUrl(doc.url) ? doc.url : null;

    if (url) {
      link.href = url;
      bar.replaceChildren(link);
    } else {
      bar.replaceChildren();
    }

    if (url && showSource) {
      const src = (doc.page_type === 'youtube' && youtubeEmbedUrl(url)) || url;
      if (frame.getAttribute('src') !== src) frame.src = src;
      frame.hidden = false;
      placeholder.hidden = true;
    } else {
      frame.removeAttribute('src');
      frame.hidden = true;
      placeholder.hidden = false;
      placeholder.textContent =
        !doc ? 'No document selected.'
        : !url ? 'This document has no web source to show.'
        : 'Check "Show source" to view the source page here.';
    }
  }

  show(null, false);

  return { element: section, show };
}
