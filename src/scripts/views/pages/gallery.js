import SPINNER from '../templates/spinner';
import RestaurantSource from '../../data/restaurant-source';
import CARD_LAYOUT from '../templates/card-layout';
import {INIT_SWAL_ERROR} from '../../utils/swal-initiator';

const GALLERY = {
  async render() {
    return `
      <div class="container">
        <div id="loading"></div>

        <div id="main-container">
          <h1 tabindex="0" class="main-content__title">Jelajahi Restoran Indonesia</h1>

          <section tabindex="0" title="menampilkan galeri restoran" id="explore-restaurant">
          </section>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const loading = document.querySelector('#loading');
    const mainContainer = document.querySelector('#main-container');
    const listContainer = document.querySelector('#explore-restaurant');

    mainContainer.style.display = 'none';
    loading.innerHTML = SPINNER();

    try {
      const data = await RestaurantSource.getRestaurantList();

      data.restaurants.forEach((restaurant) => {
        listContainer.innerHTML += CARD_LAYOUT(restaurant);
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

export default GALLERY;
