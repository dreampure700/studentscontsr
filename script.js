// ===================================================
// EVENT PORTAL JAVASCRIPT
// Filtering, Countdown Timers, WhatsApp & Calendar Sharing
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  initFilterTabs();
  initCountdowns();
  initShareAll();
});

// 1. FILTER TABS (All / Boys / Girls)
function initFilterTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.event-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// 2. LIVE COUNTDOWN TIMERS
function initCountdowns() {
  const countdownElements = [
    {
      container: document.getElementById('countdown-boys'),
      targetDate: new Date('2026-10-18T09:00:00+05:30').getTime()
    },
    {
      container: document.getElementById('countdown-girls'),
      targetDate: new Date('2026-11-15T09:00:00+05:30').getTime()
    }
  ];

  function updateAll() {
    const now = new Date().getTime();

    countdownElements.forEach(item => {
      if (!item.container) return;

      const diff = item.targetDate - now;

      const daysEl = item.container.querySelector('.days');
      const hoursEl = item.container.querySelector('.hours');
      const minsEl = item.container.querySelector('.minutes');
      const secsEl = item.container.querySelector('.seconds');

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    });
  }

  updateAll();
  setInterval(updateAll, 1000);
}

// 3. WHATSAPP SHARE
function shareOnWhatsApp(type) {
  let message = '';
  const currentUrl = window.location.href;

  if (type === 'boys') {
    message = `🌟 *ടീൻ സ്പേസ് '26 (TEEN SPACE)* 🌟\n\n` +
      `📢 *വിഭാഗം:* ബോയ്സിന് മാത്രം (10th, +1, +2 Boys Only)\n` +
      `🗓️ *തീയതി:* 2026 ഒക്ടോബർ 18, ഞായറാഴ്ച\n` +
      `📍 *വേദി:* ഡ്രീം പാലസ്, പരവൂർ, ഗുരുവായൂർ\n\n` +
      `കൂടുതൽ വിവരങ്ങൾക്ക് സന്ദർശിക്കൂ:\n${currentUrl}`;
  } else if (type === 'girls') {
    message = `🌸 *തൃശൂർ ജില്ലാ വിദ്യാർത്ഥിനി സമ്മേളനം* 🌸\n\n` +
      `📢 *വിഭാഗം:* 7-ാം ക്ലാസ് മുതൽ പി.ജി. വരെയുള്ള വിദ്യാർത്ഥിനികൾക്ക് (Class 7 to PG Girls Students)\n` +
      `🗓️ *തീയതി:* 2026 നവംബർ 15, ഞായറാഴ്ച\n` +
      `📍 *വേദി:* തൃശൂർ നഗരം\n\n` +
      `കൂടുതൽ വിവരങ്ങൾക്ക് സന്ദർശിക്കൂ:\n${currentUrl}`;
  }

  const encoded = encodeURIComponent(message);
  window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
}

// 4. ADD TO GOOGLE CALENDAR
function addToCalendar(type) {
  let url = '';
  if (type === 'boys') {
    const title = encodeURIComponent("ടീൻ സ്പേസ് '26 (TEEN SPACE) - Boys Only (10th, +1, +2)");
    const details = encodeURIComponent("10th, +1, +2 ബോയ്സ് സംഗമം @ ഡ്രീം പാലസ്, പരവൂർ, ഗുരുവായൂർ");
    const location = encodeURIComponent("Dream Palace, Paravoor, Guruvayoor");
    // 2026-10-18 09:00 to 17:00 IST (UTC: 03:30 to 11:30)
    const dates = "20261018T033000Z/20261018T113000Z";
    url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  } else if (type === 'girls') {
    const title = encodeURIComponent("തൃശൂർ ജില്ലാ വിദ്യാർത്ഥിനി സമ്മേളനം (Class 7 to PG Girls)");
    const details = encodeURIComponent("7-ാം ക്ലാസ് മുതൽ പി.ജി. വരെയുള്ള പെൺകുട്ടികൾക്കായുള്ള ജില്ലാ സമ്മേളനം @ തൃശൂർ");
    const location = encodeURIComponent("Thrissur, Kerala");
    // 2026-11-15 09:00 to 17:00 IST (UTC: 03:30 to 11:30)
    const dates = "20261115T033000Z/20261115T113000Z";
    url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  }

  if (url) {
    window.open(url, '_blank');
  }
}

// 5. SHARE ALL / COPY LINK
function initShareAll() {
  const shareBtn = document.getElementById('btnShareAll');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: 'വരാനിരിക്കുന്ന പ്രധാന പരിപാടികൾ 2026',
      text: 'ടീൻ സ്പേസ് (ഒക്ടോബർ 18, ഗുരുവായൂർ) & തൃശൂർ ജില്ലാ വിദ്യാർത്ഥിനി സമ്മേളനം (നവംബർ 15)!',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard if user dismissed or error
      }
    }

    // Fallback: Copy to clipboard
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
      }
      showToast('ലിങ്ക് കോപ്പി ചെയ്തു!');
    } catch (e) {
      showToast('ലിങ്ക് കോപ്പി ചെയ്യാൻ സാധിച്ചില്ല.');
    }
  });
}

// 6. TOAST NOTIFICATION
function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
