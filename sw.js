const CACHE_NAME = 'tibet-trip-v1';
const ASSETS = [
  '/tibet-11day-itinerary.html',
  '/assets/charts.js',
  '/pwa/icon-512.jpg',
  '/pwa/icon-192.png'
];

// 安装：缓存核心资源
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS).catch(function(err) {
        console.log('Cache addAll failed:', err);
      });
    })
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CACHE_NAME;
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// 请求：缓存优先，网络回退
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      return cached || fetch(event.request).then(function(response) {
        // 只缓存同源资源
        if (response.ok && response.url.indexOf(self.location.origin) === 0) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function() {
        // 离线回退
        if (event.request.destination === 'document') {
          return caches.match('/tibet-11day-itinerary.html');
        }
      });
    })
  );
});
