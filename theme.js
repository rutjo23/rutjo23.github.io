(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch (_) { /* Continue when browser storage is unavailable. */ }
  function apply(theme) {
    root.dataset.theme = theme;
    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.hidden = false;
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.querySelector('.theme-icon').textContent = theme === 'dark' ? '\u2600' : '\u263e';
      button.querySelector('.theme-label').textContent = theme === 'dark' ? 'Light' : 'Dark';
      button.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#18191b' : '#fcfbf9';
  }
  apply(preference || (system.matches ? 'dark' : 'light'));
  system.addEventListener('change', () => {
    if (!preference) apply(system.matches ? 'dark' : 'light');
  });
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(preference);
      try { localStorage.setItem('portfolio-theme', preference); } catch (_) {}
    });
  });
})();
