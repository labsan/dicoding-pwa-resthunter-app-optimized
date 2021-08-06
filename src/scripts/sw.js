import 'regenerator-runtime';

// Import workbox component
import {setCacheNameDetails} from 'workbox-core';
import {cleanupOutdatedCaches, precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {ExpirationPlugin} from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from 'workbox-strategies';

setCacheNameDetails({
  prefix: 'pwa-resthunter-app',
  suffix: 'v.3.1.2',
  precache: 'precache',
  runtime: 'runtime',
});

precacheAndRoute(self.__WB_MANIFEST);

// Cache for resthunter pages
registerRoute(
    ({request}) => request.mode === 'navigate',
    new NetworkFirst({
      cacheName: 'resthunter-pages-cache',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
          headers: {
            'X-Is-Cacheable': 'true',
          },
        }),
      ],
    }),
);

// Cache the CDN Font Awesome icons
registerRoute(
  new RegExp(
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.css',
  ),
  new CacheFirst({
    cacheName: 'CDN-font-awesome-icons',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
      }),
      new CacheableResponsePlugin({
        statuses: [200, 404],
        headers: {
          'X-Is-Cacheable': 'true',
        },
      }),
    ],
  }),
);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy
registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com', 
    new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
      }),
      new CacheableResponsePlugin({
        statuses: [200, 404],
        headers: {
          'X-Is-Cacheable': 'true',
        },
      }),
    ],
  }),
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
      new CacheableResponsePlugin({
        statuses: [200, 404],
        headers: {
          'X-Is-Cacheable': 'true',
        },
      }),
    ],
  })
);

// Caching Images
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'resthunter-images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

// Cache CSS and JS Files
registerRoute(
({request}) =>
  request.destination === 'style' ||
  request.destination === 'script' ||
  request.destination === 'worker', new StaleWhileRevalidate({
  cacheName: 'resthunter-static-resources',
}),
)

// Cache the API data restaurant by dicoding
registerRoute(
    /^https:\/\/restaurant-api\.dicoding\.dev\/(?:(list|detail))/,
    new NetworkFirst({
      cacheName: 'API-data-restaurant-dicoding',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
        new CacheableResponsePlugin({
          statuses: [200, 404],
          headers: {
            'X-Is-Cacheable': 'true',
          },
        }),
      ],
    }),
);

cleanupOutdatedCaches();

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
