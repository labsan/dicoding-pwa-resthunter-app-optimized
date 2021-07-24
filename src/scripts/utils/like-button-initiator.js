import FAVORITE_RESTAURANT_IDB from '../data/favorite-restaurant-idb';
import {LIKE_BUTTON_TEMPLATE, UNLIKE_BUTTON_TEMPLATE} from '../views/templates/like-button-layout';
import {INIT_SWAL_SUCCESS, INIT_SWAL_ERROR} from './swal-initiator';

const LIKE_BUTTON_INITIATOR = {
  async init({likeButtonContainer, data}) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = data.restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    try {
      const {id} = this._resto;

      // Get data restaurant in IDB
      const data = await FAVORITE_RESTAURANT_IDB.getRestaurant(id);

      if (data) {
        this._renderUnlikedButtonTemplate();
      } else {
        this._renderLikeButtonTemplate();
      }
    } catch (error) {
      console.error(error);
      INIT_SWAL_ERROR(error.message);

      throw new Error(error);
    }
  },

  _renderLikeButtonTemplate() {
    this._likeButtonContainer.innerHTML = LIKE_BUTTON_TEMPLATE();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FAVORITE_RESTAURANT_IDB.putRestaurant(this._resto);
      INIT_SWAL_SUCCESS('Restoran telah disimpan!');
      this._renderButton();
    });
  },

  _renderUnlikedButtonTemplate() {
    this._likeButtonContainer.innerHTML = UNLIKE_BUTTON_TEMPLATE();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FAVORITE_RESTAURANT_IDB.delRestaurant(this._resto.id);
      INIT_SWAL_SUCCESS('Restoran belum disimpan!');
      this._renderButton();
    });
  },

};

export default LIKE_BUTTON_INITIATOR;
