// تحديث وإلغاء الكاش لضمان وصول التحديثات والإعلانات فوراً
const CACHE_NAME = 'paint-riyadh-v2.0.0';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    })
  );
  self.clients.claim();
});

// الاعتماد على جلب البيانات الحية من السيرفر مباشرة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
