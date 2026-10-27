import { isWebUrl } from '../urls.js';

const TYPE_LABELS = { youtube: 'YouTube video', pdf: 'PDF', html: 'Web page' };

// DOCUMENT DETAIL window: title, summary, url, page type and transcript of the
// selected document, plus the SHOW SOURCE checkbox. keywords and local_filename
// are deliberately not shown (docs/SPEC.md).
export function createDocumentDetail({ onShowSourceChange }) {
  const section = document.createElement('section');
  section.id = 'document-detail';
  section.className = 'window';

  const body = document.createElement('div');
  body.className = 'detail-body';

  const footer = document.createElement('label');
  footer.className = 'show-source';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'show-source';
  checkbox.disabled = true;
  checkbox.addEventListener('change', () => onShowSourceChange(checkbox.checked));
  footer.append(checkbox, ' Show source');

  section.append(body, footer);

  function field(label, content) {
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.append(content);
    return [dt, dd];
  }

  function render(doc) {
    if (!doc) {
      const placeholder = document.createElement('p');
      placeholder.className = 'status';
      placeholder.textContent = 'Select a document to see its details.';
      body.replaceChildren(placeholder);
      checkbox.disabled = true;
      return;
    }

    const heading = document.createElement('h2');
    heading.textContent = doc.title || '(untitled)';

    let urlContent = doc.url || '—';
    if (isWebUrl(doc.url)) {
      urlContent = document.createElement('a');
      urlContent.href = doc.url;
      urlContent.target = '_blank';
      urlContent.rel = 'noopener noreferrer';
      urlContent.textContent = doc.url;
    }

    const list = document.createElement('dl');
    list.append(
      ...field('Type', TYPE_LABELS[doc.page_type] ?? (doc.page_type || '—')),
      ...field('URL', urlContent),
      ...field('Summary', doc.summary || '—'),
    );

    if (doc.video_transcript) {
      const transcript = document.createElement('div');
      transcript.className = 'transcript';
      transcript.textContent = doc.video_transcript;
      list.append(...field('Transcript', transcript));
    }

    body.replaceChildren(heading, list);
    checkbox.disabled = !isWebUrl(doc.url);
  }

  render(null);

  return {
    element: section,
    showDocument: render,
    get showSource() {
      return checkbox.checked && !checkbox.disabled;
    },
  };
}
