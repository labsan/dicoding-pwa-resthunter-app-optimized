import {Workbox} from 'workbox-window';

const SW_REGISTER = async () => {
  if ('serviceWorker' in navigator) {
    const WORKBOX = new Workbox('../sw.js');

    WORKBOX.addEventListener('waiting', () => {
      console.log(
          `Serviceworker baru terinstall, sehingga tidak dapat berjalan `+
          `dengan optimal untuk sementara waktu!`,
      );
    });

    WORKBOX.addEventListener('activated', (event) => {
      if (!event.isUpdate) {
        console.log('Serviceworker aktif untuk pertama kalinya');
      }
    });

    WORKBOX.register();
  }
};

export default SW_REGISTER;
