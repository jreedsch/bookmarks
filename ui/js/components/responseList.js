// RESPONSE LIST window: single-selection list of document titles.
// Calls onSelect(document) when the selection changes.
export function createResponseList({ onSelect }) {
  const section = document.createElement('section');
  section.id = 'response-list';
  section.className = 'window';

  const title = document.createElement('h2');
  title.className = 'window-title';
  title.textContent = 'Results';

  const status = document.createElement('p');
  status.className = 'status';
  status.setAttribute('role', 'status');
  status.textContent = 'Enter a query to search.';

  const list = document.createElement('select');
  list.size = 2; // size > 1 renders a list box instead of a dropdown
  list.setAttribute('aria-label', 'Matching documents');
  list.hidden = true;

  let documents = [];

  list.addEventListener('change', () => {
    onSelect(documents[list.selectedIndex] ?? null);
  });

  section.append(title, status, list);

  return {
    element: section,

    showLoading() {
      status.textContent = 'Searching…';
      status.classList.remove('error');
      list.hidden = true;
    },

    showError(message) {
      status.textContent = message;
      status.classList.add('error');
      list.hidden = true;
    },

    showResults(results) {
      documents = results;
      list.replaceChildren(
        ...results.map((doc) => {
          const option = document.createElement('option');
          option.textContent = doc.title || '(untitled)';
          return option;
        }),
      );
      status.classList.remove('error');
      status.textContent =
        results.length === 0 ? 'No documents found.'
        : results.length === 1 ? '1 document found.'
        : `${results.length} documents found.`;
      list.hidden = results.length === 0;
    },
  };
}
