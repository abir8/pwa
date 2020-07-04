let staticDevCoffee = "dev-coffee-site-v1";
let assets = [
  "/",
  "/index.php",
  "/css/style.css",
  "/js/app.js",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg",
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(staticDevCoffee).then(function(cache) {
//       return cache.addAll(
//         [
//           "/",
//           "/index.php",
//           "/css/style.css",
//           "/js/app.js",
//           "/images/coffee1.jpg",
//           "/images/coffee2.jpg",
//           "/images/coffee3.jpg",
//           "/images/coffee4.jpg",
//           "/images/coffee5.jpg",
//           "/images/coffee6.jpg",
//           "/images/coffee7.jpg",
//           "/images/coffee8.jpg",
//           "/images/coffee9.jpg"
//         ]
//       );
//     })
//   );
// });


self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const dynamicCache = await caches.open('dev-coffee-site-v1');
  try {
    const networkResponse = await fetch(request);
    dynamicCache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cachedResponse = await dynamicCache.match(request);
    return cachedResponse || await caches.match('./fallback.json');
  }
}


// btnInstall.addEventListener('click', () => {
//   // Update the install UI to remove the install button
//   document.querySelector('#install-button').disabled = true;
//   // Show the modal add to home screen dialog
//   installPromptEvent.prompt();
//   // Wait for the user to respond to the prompt
//   installPromptEvent.userChoice.then((choice) => {
//     if (choice.outcome === 'accepted') {
//       console.log('User accepted the A2HS prompt');
//     } else {
//       console.log('User dismissed the A2HS prompt');
//     }
//     // Clear the saved prompt since it can't be used again
//     installPromptEvent = null;
//   });
// });



