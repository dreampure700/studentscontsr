document.addEventListener('DOMContentLoaded', () => {
  const timers = document.querySelectorAll('.timer');

  function tick() {
    const now = Date.now();
    timers.forEach(el => {
      const target = new Date(el.dataset.target).getTime();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      el.querySelector('[data-d]').textContent = String(d).padStart(2, '0');
      el.querySelector('[data-h]').textContent = String(h).padStart(2, '0');
      el.querySelector('[data-m]').textContent = String(m).padStart(2, '0');
      el.querySelector('[data-s]').textContent = String(s).padStart(2, '0');
    });
  }

  tick();
  setInterval(tick, 1000);
});
