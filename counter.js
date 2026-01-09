(() => {
  const el = document.getElementById('vc-n');
  if (!el) return;

  const STORE_KEY = 'dd-views';
  const SESSION_KEY = 'dd-views-session';
  const format = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}k` : `${n}`);

  const readNumber = (val, fallback) => {
    const n = Number(val);
    return Number.isFinite(n) ? n : fallback;
  };

  let count = readNumber(localStorage.getItem(STORE_KEY), 3400);

  // Only increment once per browsing session to avoid wild jumps.
  if (!sessionStorage.getItem(SESSION_KEY)) {
    const bump = 1 + Math.floor(Math.random() * 4);
    count += bump;
    localStorage.setItem(STORE_KEY, String(count));
    sessionStorage.setItem(SESSION_KEY, '1');
  }

  el.textContent = format(count);
  el.closest('#vc')?.setAttribute('aria-label', `Approximate view count ${count}`);
})();
