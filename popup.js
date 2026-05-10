const matchesCanvasUrl = (url) => {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    return host.endsWith('.instructure.com') || host.startsWith('canvas.');
  } catch {
    return false;
  }
};

const setStatus = (active, hint) => {
  const dot = document.getElementById('status-dot');
  const text = document.getElementById('status-text');
  const hintEl = document.getElementById('status-hint');

  dot.classList.remove('active', 'inactive');
  dot.classList.add(active ? 'active' : 'inactive');
  text.textContent = active ? 'CanvasHack is active' : 'CanvasHack is not active';
  hintEl.textContent = hint;
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (!tab || !tab.url) {
    setStatus(false, 'No active tab was found.');
    return;
  }

  if (matchesCanvasUrl(tab.url)) {
    setStatus(true, 'Content script should run on this page.');
  } else {
    setStatus(false, 'Open a Canvas page to activate this extension.');
  }
});
