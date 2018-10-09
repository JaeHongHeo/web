/**
서비스 워커
https://gracefullight.github.io/2017/12/22/PWA-ServiceWorker-Web-Caching/
 */

if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('/web/sw.js').then(function(reg) {
    console.log(':^)', reg);
    // TODO

    }).catch(function(err) {
        console.log(':^(', err);
    });
}

