importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js"
)

workbox.routing.registerRoute(
  /(?:avatars3\.githubusercontent\.com|\.(?:png|gif|jpg|jpeg|webp|svg)$)/,
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
)

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "static-resources",
  })
)

workbox.routing.setDefaultHandler(new workbox.strategies.StaleWhileRevalidate())
