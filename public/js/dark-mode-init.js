try {
  if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#09090b')
  }
} catch (_) {}

try {
  if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
    document.documentElement.classList.add('os-macos')
  }
} catch (_) {}
