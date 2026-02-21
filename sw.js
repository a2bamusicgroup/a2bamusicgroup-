const CACHE_NAME = 'a2ba-pwa-v1';
const urlsToCache = [
  './',
  './login.html',
  './verifikasi.html',
  './action.html',
  './rmh.html',
  './3128.png'
];

// Install Service Worker dan simpan file ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Hapus cache lama jika ada update versi
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Ambil dari cache jika offline, atau ambil dari internet jika online
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan versi cache
        }
        return fetch(event.request); // Ambil dari internet
      })
  );
});