// sw.js — offline-first service worker.
// Strategy: stale-while-revalidate for app shell (instant load, silent refresh).
// API calls (/api/*) always go to the network and are never cached.

const CACHE = 'jp-do-v29';

const ASSETS = [
  '/',
  '/index.html',
  '/roadmap.html',
  '/admin.html',
  '/test.html',
  '/grammar-reference.html',
  '/core.js',
  '/memory-engine.js',
  '/Coach.js',
  '/n5-content.js',
  '/n3-content.js',
  '/seed-data.js',
  '/feed-threads.js',
  '/jlpt-question-bank.js',
  '/manga-data.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-512.png',
  '/apple-touch-icon.png',
  '/favicon.png'
];

// Google Fonts CSS + font files to cache for offline use
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Inter:wght@400;500;600;700;800;900&display=swap'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(async (c) => {
      await c.addAll(ASSETS).catch(() => {});
      // Cache fonts separately (may fail, that's OK)
      try {
        const fontCache = await caches.open(CACHE + '-fonts');
        for (const url of FONT_URLS) {
          try {
            const res = await fetch(url);
            if (res && res.status === 200) fontCache.put(url, res.clone());
            // Also cache the actual font files referenced in the CSS
            const css = await res.text();
            const fontFileUrls = css.match(/https:\/\/[^)]+\.woff2/g) || [];
            for (const ffu of fontFileUrls.slice(0, 6)) {
              try {
                const ffRes = await fetch(ffu);
                if (ffRes && ffRes.status === 200) fontCache.put(ffu, ffRes.clone());
              } catch (e) {}
            }
          } catch (e) {}
        }
      } catch (e) {}
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE && k !== CACHE + '-fonts').map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Never cache API calls — go straight to network.
  if (url.pathname.startsWith('/api/')) return;
  if (e.request.method !== 'GET') return;

  // Cache Google Fonts cross-origin (stale-while-revalidate)
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    e.respondWith(
      caches.open(CACHE + '-fonts').then(async (cache) => {
        const cached = await cache.match(e.request);
        const network = fetch(e.request).then((res) => {
          if (res && res.status === 200) cache.put(e.request, res.clone());
          return res;
        }).catch(() => null);
        if (cached) { network; return cached; }
        return (await network) || Response.error();
      })
    );
    return;
  }

  // Other cross-origin (TTS voices, etc.) — go straight to network.
  if (url.origin !== location.origin) return;

  // Stale-while-revalidate: serve cache instantly, update in the background.
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const network = fetch(e.request)
        .then((res) => {
          if (res && res.status === 200) cache.put(e.request, res.clone());
          return res;
        })
        .catch(() => null);
      // Cache hit → serve it now, let the network update run in the background.
      if (cached) { network; return cached; }
      const fresh = await network;
      if (fresh) return fresh;
      // Offline page navigation with nothing cached → fall back to the app shell.
      if (e.request.mode === 'navigate') {
        return (await cache.match('/index.html')) || (await cache.match('/'));
      }
      return Response.error();
    })
  );
});

// Notify clients when a new version is activated
self.addEventListener('controllerchange', () => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => client.postMessage({ type: 'SW_UPDATED' }));
  });
});

// Handle notification clicks — open the app
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      // Focus existing window if open
      for (const client of clients) {
        if ('focus' in client) return client.focus();
      }
      // Otherwise open new window
      if (self.clients.openWindow) return self.clients.openWindow('/');
    })
  );
});
