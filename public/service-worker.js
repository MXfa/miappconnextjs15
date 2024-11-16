// public/service-worker.js

const CACHE_NAME = 'static-cache-v1';
const STATIC_ASSETS = [
    '/index.html',
    '/styles.css',
    '/script.js',
    '/images/logo.png',
    // Agrega aquí otros recursos estáticos que necesites
];

// Durante la instalación, almacena los recursos estáticos en caché
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

// Durante la activación, limpia cachés antiguas si es necesario
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepta las solicitudes de red
self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    
    // Intenta servir desde la caché primero
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});