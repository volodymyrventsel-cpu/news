/* =============================================================
   GOLDEN RETIRE MEMO — shared client logic
============================================================= */

/* ===== Ticker ===== */
const tickers = [
  { sym: 'S&P 500',  px: '6,041.18',  ch: '+0.62%',  dir: '▲' },
  { sym: 'NASDAQ',   px: '19,584.7',  ch: '+1.04%',  dir: '▲' },
  { sym: 'DOW',      px: '42,318.6',  ch: '−0.18%',  dir: '▼' },
  { sym: 'FTSE',     px: '8,402.91',  ch: '+0.31%',  dir: '▲' },
  { sym: 'DAX',      px: '19,114.2',  ch: '+0.42%',  dir: '▲' },
  { sym: 'NIKKEI',   px: '38,914.0',  ch: '−0.27%',  dir: '▼' },
  { sym: 'US10Y',    px: '4.142%',    ch: '−0.04',   dir: '▼' },
  { sym: 'BTC',      px: '80,412',    ch: '+3.12%',  dir: '▲' },
  { sym: 'ETH',      px: '3,184',     ch: '+1.86%',  dir: '▲' },
  { sym: 'GOLD',     px: '2,628.40',  ch: '+0.47%',  dir: '▲' },
  { sym: 'WTI',      px: '74.18',     ch: '−1.20%',  dir: '▼' },
  { sym: 'EUR/USD',  px: '1.0842',    ch: '−0.22%',  dir: '▼' },
  { sym: 'USD/JPY',  px: '154.21',    ch: '+0.31%',  dir: '▲' },
];
const tickerHTML = t => `
  <span class="ticker-item">
    <span class="ticker-symbol">${t.sym}</span>
    <span class="ticker-price">${t.px}</span>
    <span class="ticker-change"><span class="ticker-arrow">${t.dir}</span>${t.ch}</span>
  </span>`;
const tickerTrack = document.getElementById('tickerTrack');
if (tickerTrack) {
  tickerTrack.innerHTML = tickers.map(tickerHTML).join('') + tickers.map(tickerHTML).join('');
}

/* ===== Search overlay ===== */
const overlay  = document.getElementById('searchOverlay');
const scrim    = document.getElementById('pageScrim');
const openBtn  = document.getElementById('searchOpen');
const closeBtn = document.getElementById('searchClose');
const input    = document.getElementById('searchInput');

if (overlay && openBtn && closeBtn && scrim && input) {
  const open = () => {
    overlay.classList.add('is-open');
    scrim.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 200);
  };
  const close = () => {
    overlay.classList.remove('is-open');
    scrim.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    input.blur();
  };
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  scrim.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      overlay.classList.contains('is-open') ? close() : open();
    }
  });
}

/* ===== Compliance: submit disabled until consent checkbox is ticked ===== */
/* Pairs each .checkbox-row / .footer-form-checkbox with the nearest preceding
   .input-row → its submit button. Submit stays disabled until consent is given. */
document.querySelectorAll('.checkbox-row, .footer-form-checkbox').forEach(label => {
  const cb = label.querySelector('input[type="checkbox"]');
  const block = label.closest('.subscribe, .footer-form-block, section, footer, body');
  const submit = block && block.querySelector('.input-row .btn-primary');
  if (!cb || !submit) return;
  const sync = () => {
    submit.disabled = !cb.checked;
    submit.setAttribute('aria-disabled', String(!cb.checked));
  };
  cb.addEventListener('change', sync);
  sync();
});
