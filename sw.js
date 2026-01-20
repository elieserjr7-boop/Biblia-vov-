const CACHE_NAME = 'biblia-vovo-v12';

// Lista das 13 versões + arquivos do sistema
const urlsToCache = [
  './biblia.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './harpa.json',
  './cantor.json',
  // Versões da Bíblia (nomes devem ser EXATOS aos arquivos na pasta)
  './NVI.json',
  './NVT.json',
  './ACF.json',
  './ARA.json',
  './ARC.json',
  './AA.json',
  './TB.json',
  './KJA.json',
  './NAA.json',
  './NBV.json',
  './NTLH.json',
  './A21.json',
  './KJF.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache atualizado (v12) - Todas as versões');
        // O map e 'no-cors' ajuda a não falhar tudo se um arquivo faltar
        return Promise.all(
            urlsToCache.map(url => {
                return cache.add(url).catch(err => {
                    console.log('Arquivo não encontrado para cache (pode ser opcional): ' + url);
                });
            })
        );
      })
  );
});

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

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
