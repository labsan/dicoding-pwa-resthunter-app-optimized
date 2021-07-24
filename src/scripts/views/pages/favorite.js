import SPINNER from '../templates/spinner';
import FAVORITE_RESTAURANT_IDB from '../../data/favorite-restaurant-idb';
import CARD_LAYOUT from '../templates/card-layout';
import {INIT_SWAL_ERROR} from '../../utils/swal-initiator';

const FAVORITE = {
  async render() {
    return `
    <div class="container">
        <div id="loading"></div>

        <div id="main-container">
          <h1 tabindex="0" class="main-content__title">Restoran Favorit</h1>

          <section tabindex="0" id="fav-resto"></section>
        </div>
      </div>
 `;
  },

  async afterRender() {
    const loading = document.querySelector('#loading');
    const mainContainer = document.querySelector('#main-container');
    const favRestoContainer = document.querySelector('#fav-resto');

    mainContainer.style.display = 'none';
    loading.innerHTML = SPINNER();

    try {
      const data = await FAVORITE_RESTAURANT_IDB.getAllRestaurant();

      // Jika data resto tidak ada (kosong)
      if (data.length === 0) {
        favRestoContainer.innerHTML = `
          Restoran yang di-favoritkan tidak ada. 
          Klik button favorit pada halaman informasi restoran.
        `;
      }

      // Menampilkan seluruh resto di-favoritkan
      data.forEach((resto) => {
        favRestoContainer.innerHTML += CARD_LAYOUT(resto);
      });

      loading.style.display = 'none';
      mainContainer.style.display = 'block';
    } catch (error) {
      console.error(error);

      mainContainer.style.display = 'block';
      loading.style.display = 'none';
      listContainer.innerHTML = `Error: ${error.message}`;
      INIT_SWAL_ERROR(error.message);
    }
  },
};

export default FAVORITE;
