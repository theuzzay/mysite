const CACHE_NAME = 'can-bogac-site-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/html/resume.html',
  '/html/blog.html',
  '/js/style.css',
  '/js/script.js',
  '/js/particles-config.js',
  '/js/lazy-loading.js',
  '/json/certificates.json',
  '/json/modules.json',
  '/json/ctf.json',
  'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,700&display=swap',
  'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline actions when connection is restored
  console.log('Background sync triggered');
} 