const CACHE_NAME = 'biblia-vovo-v2';
const urlsToCache = [
  './biblia.html',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/3004/3004458.png'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache atualizado (v2)');
        return cache.addAll(urlsToCache);
      })
  );
});

// Limpeza de cache antigo (Apaga a v1 com o coração)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Resposta a requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
