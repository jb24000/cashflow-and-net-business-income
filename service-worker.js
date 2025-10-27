const CACHE_NAME = 'cashflow-app-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

// install: cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// activate: cleanup old caches if you version-bump later
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// fetch: serve from cache first, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
