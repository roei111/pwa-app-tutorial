const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";
const assets = [
  "/",
  "/index.html",
  "/pages/fallback.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  // evt.respondWith(
  //   caches.match(evt.request).then((cacheRes) => {
  //     return (
  //       cacheRes ||
  //       fetch(evt.request)
  //         .then((fetchRes) => {
  //           return caches.open(dynamicCacheName).then((cache) => {
  //             cache.put(evt.request.url, fetchRes.clone());
  //             limitCacheSize(dynamicCacheName, 3);
  //             return fetchRes;
  //           });
  //         })
  //         .catch(() => {
  //           if (evt.request.url.indexOf(".html"))
  //             return caches.match("/pages/fallback.html");
  //         })
  //     );
  //   })
  // );
});
