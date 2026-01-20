const CACHE_NAME = 'biblia-sagrada-v13';

// Lista das 13 versões + arquivos do sistema
const urlsToCache = [
  './biblia.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './harpa.json',
  './cantor.json',
  // Certifique-se que esses arquivos existem no repositório
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
  './AS21.json',
  './KJF.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache atualizado (v13)');
        return Promise.all(
            urlsToCache.map(url => {
                return cache.add(url).catch(err => {
                    console.log('Arquivo não encontrado (opcional): ' + url);
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
