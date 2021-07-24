import 'regenerator-runtime';

// Import workbox component
import {setCacheNameDetails} from 'workbox-core';
import {cleanupOutdatedCaches, precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {ExpirationPlugin} from 'workbox-expiration';
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from 'workbox-strategies';

setCacheNameDetails({
  prefix: 'pwa-resthunter-app',
  suffix: 'v.1.1.0',
  precache: 'precache',
  runtime: 'runtime',
});

precacheAndRoute(self.__WB_MANIFEST);

// Cache for resthunter pages
registerRoute(
    ({request}) => request.mode === 'navigate',
    new NetworkFirst({
      cacheName: 'resthunter-pages-cache',
    }),
);

// Cache for data restaurant API dicoding
registerRoute(
    /^https:\/\/restaurant-api\.dicoding\.dev\/(?:(list|detail))/,
    new NetworkFirst({
      cacheName: 'dicoding-restaurant-api-cache',
      plugins: [
      // Don't cache more than 100 items, and expire them after 30 days
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 30,
          maxEntries: 100,
        }),
      ],
    }),
);

// Cache for resthunter images
registerRoute(
    ({request}) => request.destination === 'image',
    new CacheFirst({
      cacheName: 'resthunter-images-cache',
      plugins: [
      // Don't cache more than 50 items, and expire them after 30 days
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 30,
          maxEntries: 50,
        }),
      ],
    }),
);

// Cache for CDN Font Awesome icon
registerRoute(
    new RegExp(
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.css',
    ),
    new CacheFirst({
      cacheName: 'resthunter-font-awesome-icon-cache',
    }),
);

// Cache URL Google Font request
registerRoute(
    ({url}) =>
      url.origin === 'https://fonts.googleapis.com' ||
      url.origin === 'https://fonts.gstatic.com', new StaleWhileRevalidate({
      cacheName: 'resthunter-google-fonts-cache',
      // Don't cache more than 50 items
      plugins: [new ExpirationPlugin({maxEntries: 50})],
    }),
);

// Cache for CSS, JS, and Web Worker file request
registerRoute(
    ({request}) =>
      request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'worker', new StaleWhileRevalidate({
      cacheName: 'resthunter-assets-cache',
    }),
);

cleanupOutdatedCaches();

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
