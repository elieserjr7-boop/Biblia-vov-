const CACHE_NAME = 'biblia-vovo-v1';
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
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Resposta a requisições (Intercepta o carregamento para funcionar offline se possível)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrar no cache, retorna o cache, senão busca na rede
        return response || fetch(event.request);
      })
  );
});

