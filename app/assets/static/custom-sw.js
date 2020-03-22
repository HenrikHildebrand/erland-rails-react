self.addEventListener('push', event => {
    const data = event.data.json()
    // console.log('New notification HoJ', data)
    const options = {
      body: data.body,
      icon: 'https://i.imgur.com/jkgnSra.jpg',
      data: {
        url: data.url
      },
      actions: [
        {
          action: 'clicked-action',
          title: 'Visa mina drycker',
          icon: 'https://i.imgur.com/jkgnSra.jpg'
        }
      ]
    }
    event.waitUntil(
      self.registration.showNotification(data.head, options)
    );
  })


  self.addEventListener('notificationclick', function(event) {
    let url = event.notification.data.url
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});