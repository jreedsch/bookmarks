// QUERY INPUT window: text box and Search button. Calls onSearch(query) on submit.
export function createQueryInput({ onSearch }) {
  const form = document.createElement('form');
  form.id = 'query-input';
  form.className = 'window';

  const label = document.createElement('label');
  label.htmlFor = 'query-text';
  label.className = 'window-title';
  label.textContent = 'Query';

  const input = document.createElement('input');
  input.id = 'query-text';
  input.type = 'search';
  input.placeholder = 'Search documents…';
  input.autocomplete = 'off';

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Search';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (query) onSearch(query);
  });

  form.append(label, input, button);
  return form;
}
