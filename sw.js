const cache_name = 'cache-v1';
const urlsToCache = [
  '/',
  'css/styles.css',
  'js/main.js',
  'js/dbhelper.js',
  'js/restaurant_info.js',
  'data/restaurants.json',
];

self.addEventListener('install', (event)=> { //cache all files
  event.waitUntil(  
    caches.open(cache_name)
      .then((cache)=> {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((err)=>{
          console.log('Cache error '+err);
      })
  );
});


self.addEventListener('fetch', (event)=> { //if the app is offline, then use cache.
    
    event.respondWith(
      caches.match(event.request)
        .then((response)=>{
          
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });