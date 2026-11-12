(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'portfolio-theme';
  let preference = null;

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch {
    // Continue with page-local switching when storage is unavailable.
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.dataset.theme = theme;
    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.hidden = false;
      button.setAttribute('aria-pressed', String(isDark));
      button.title = isDark ? 'Switch to day mode' : 'Switch to night mode';
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = isDark ? '#24211e' : '#ffffff';
  }

  applyTheme(preference || (systemTheme.matches ? 'dark' : 'light'));

  function initializeToggle() {
    applyTheme(root.dataset.theme);
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(preference);
      try {
        localStorage.setItem(storageKey, preference);
      } catch {
        // Keep the selected theme for this page when storage is blocked.
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeToggle, { once: true });
  } else {
    initializeToggle();
  }

  systemTheme.addEventListener('change', () => {
    if (!preference) applyTheme(systemTheme.matches ? 'dark' : 'light');
  });

  window.addEventListener('storage', (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = event.newValue === 'light' || event.newValue === 'dark'
      ? event.newValue : null;
    applyTheme(preference || (systemTheme.matches ? 'dark' : 'light'));
  });
})();
