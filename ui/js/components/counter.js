// Example component: returns a DOM element with its own state.
export function createCounter() {
  let count = 0;

  const button = document.createElement('button');
  const render = () => { button.textContent = `Clicked ${count} times`; };

  button.addEventListener('click', () => {
    count++;
    render();
  });

  render();
  return button;
}
