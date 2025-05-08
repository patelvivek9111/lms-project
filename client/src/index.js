const { createRoot } = ReactDOM;
const { createElement: h } = React;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof window.App === 'undefined') {
    console.error('App component is not defined. Check App.js loading.');
  } else {
    const root = createRoot(document.getElementById('root'));
    root.render(h(window.App));
  }
});