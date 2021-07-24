import URL_PARSER from '../../routes/url-parser';
import SPINNER from '../templates/spinner';
import RestaurantSource from '../../data/restaurant-source';
import DETAIL_LAYOUT from '../templates/detail-layout';
import LIKE_BUTTON_INITIATOR from '../../utils/like-button-initiator';
import {INIT_SWAL_ERROR} from '../../utils/swal-initiator';


const DETAIL = {
  async render() {
    return `
      <div class="container">
        <div id="loading"></div>

        <div class="like" id="likeButtonContainer"></div>

        <div id="main-container">
          <h1 tabindex="0" class="main-content__title">Informasi Restoran</h1>

          <section tabindex="0" title="menampilkan informasi lengkap restoran" id="detail-resto">
          </section>
        </div>
      </div>
    `;
  },

  // Fungsi ini akan dipanggil setelah render()
  async afterRender() {
    const url = URL_PARSER.parseActiveUrlWithoutCombiner();

    const loading = document.querySelector('#loading');
    const mainContainer = document.querySelector('#main-container');
    const detailContainer = document.querySelector('#detail-resto');

    // change main display to spinner
    mainContainer.style.display = 'none';
    loading.innerHTML = SPINNER();

    try {
      const data = await RestaurantSource.getRestaurantDetail(url.id);

      // use the detail data
      console.info(data);
      // eslint-disable-next-line new-cap
      detailContainer.innerHTML += DETAIL_LAYOUT(data.restaurant);

      // init like button
      LIKE_BUTTON_INITIATOR.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        data,
      });

      // change spinner display to main
      mainContainer.style.display = 'block';
      loading.style.display = 'none';
    } catch (err) {
      console.error(err);

      mainContainer.style.display = 'block';
      loading.style.display = 'none';
      detailContainer.innerHTML = `Error: ${err.message}`;
      INIT_SWAL_ERROR(err.message);
    }
  },
};

export default DETAIL;
