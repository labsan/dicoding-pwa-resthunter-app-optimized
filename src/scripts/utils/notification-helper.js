const NOTIFICATION_HELPER = {
  sendNotification({title, options}) {
    // TODO: periksa ketersediaan notifikasi
    if (!this._checkAvailability()) {
      console.log('Notifikasi tidak mendukung pada browser ini');
      return;
    }

    // TODO: periksa izin notifikasi
    if (!this._checkPermission()) {
      console.log('Pengguna belum memberikan izin notifikasi');
      this._requestPermission();
      return;
    }

    // TODO: menampilkan notifikasi
    this._showNotification({title, options});
  },

  _checkAvailability() {
    return !!('Notification' in window);
  },

  _checkPermission() {
    return Notification.permission === 'granted';
  },

  async _requestPermission() {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.log('Notification Denied');
    }

    if (status === 'default') {
      console.log('Permission closed');
    }
  },

  async _showNotification({title, options}) {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    serviceWorkerRegistration.showNotification(title, options);
  },
};

export default NOTIFICATION_HELPER;
