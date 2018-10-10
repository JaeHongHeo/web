/**
서비스 워커
https://gracefullight.github.io/2017/12/22/PWA-ServiceWorker-Web-Caching/

Firebase push
https://firebase.google.com/docs/cloud-messaging/

https://firebase.google.com/docs/cloud-messaging/js/receive?hl=ko

https://css-tricks.com/implementing-push-notifications-setting-firebase/
 */

const messaging = firebase.messaging();

if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('firebase-messaging-sw.js').then(function(reg) {

        console.log(':^)', reg);
        messaging.useServiceWorker(reg);
        // TODO 토큰 받는 것 까지 됨
        // TODO firebase-messaging-sw.js, index.html 에 중복된거 지워도 되는건지
        // TODO manifest.json 에는 왜 103953800507 값을 써야하나?
        // test
        messaging.getToken().then(function(refreshedToken) {
          console.log('getToken. ' + refreshedToken);
        }).catch(function(err) {
          console.log('getToken fail', err);
          //showToken('Unable to retrieve refreshed token ', err);
        });

    }).catch(function(err) {
        console.log(':^(', err);
    });
}

console.log("ver:16");

//messaging.usePublicVapidKey('BKkhjdbpZ1KWj6PtPB9dJ-uqC8NATwf40fi0ORcCbAYIJSW7nid7ndCXbUt1H3u7bCF32eqSFCixSApXvSMAS20');



  // IDs of divs that display Instance ID token UI or request permission UI.
  const tokenDivId = 'token_div';
  const permissionDivId = 'permission_div';
  // [START refresh_token]
  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(refreshedToken) {
      console.log('Token refreshed.');
    }).catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
      //showToken('Unable to retrieve refreshed token ', err);
    });
  });
  // [END refresh_token]
  // [START receive_message]
  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.setBackgroundMessageHandler` handler.
  messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
  });


messaging.requestPermission().then(function() {
    // 알림 권한 요청 수락시 호출됨.
    // 이미 수락된 상태면 다이얼로그 없이 호출되는 것 같음
  console.log('Notification permission granted.');
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
}).catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});
