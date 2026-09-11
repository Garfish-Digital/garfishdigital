/**
 * Service worker — exists so Chrome on Android treats the site as installable.
 *
 * Chrome's install criteria are: HTTPS, a manifest with 192px and 512px PNG icons,
 * and a service worker with a fetch handler. The manifest already satisfied its half;
 * this file is the remaining piece.
 *
 * The strategy is deliberately network-first for anything that can change. A portfolio
 * that serves a stale build during a client demo is far worse than one that loads a
 * few milliseconds slower, so the cache is only ever a fallback — never the default
 * answer — except for Next's content-hashed build output, where a cache hit cannot be
 * stale because the filename changes whenever the contents do.
 *
 * Bump CACHE to evict everything on the next deploy.
 */
const CACHE = "garfish-v1";
const OFFLINE_URL = "/";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      // `cache: "reload"` bypasses the HTTP cache so the seeded copy is genuinely current.
      .then((cache) => cache.add(new Request(OFFLINE_URL, { cache: "reload" })))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function cachePut(request, response) {
  if (!response || !response.ok) return response;
  const copy = response.clone();
  caches.open(CACHE).then((cache) => cache.put(request, copy));
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Page loads: always ask the network first, so a deploy is never masked by the cache.
  // The last good response is kept only to have something to show when offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          cachePut(new Request(OFFLINE_URL), response);
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Build output is content-hashed, so a hit here can never be the wrong version.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches
        .match(request)
        .then((cached) => cached || fetch(request).then((response) => cachePut(request, response)))
    );
    return;
  }

  // Fonts, icons, images, the manifest: network first, cache as the offline fallback.
  event.respondWith(
    fetch(request)
      .then((response) => cachePut(request, response))
      .catch(() => caches.match(request))
  );
});
