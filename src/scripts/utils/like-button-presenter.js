// import FAVORITE_RESTAURANT_IDB from '../data/favorite-restaurant-idb';
import {LIKE_BUTTON_TEMPLATE, UNLIKE_BUTTON_TEMPLATE} from '../views/templates/like-button-layout';
import {INIT_SWAL_SUCCESS, INIT_SWAL_ERROR} from './swal-initiator';

const LIKE_BUTTON_PRESENTER = {
  async init({likeButtonContainer, data, favRestoIdb}) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = data.restaurant;
    this._favRestoIdb = favRestoIdb;

    await this._renderButton();
  },

  async _renderButton() {
    try {
      const {id} = this._restaurant;

      // Get data restaurant in IDB
      const data = await this._favRestoIdb.getRestaurant(id);

      if (data) {
        this._renderUnlikeButtonTemplate();
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
      await this._favRestoIdb.putRestaurant(this._restaurant);
      INIT_SWAL_SUCCESS('Restoran telah disimpan!');
      this._renderButton();
    });
  },

  _renderUnlikeButtonTemplate() {
    this._likeButtonContainer.innerHTML = UNLIKE_BUTTON_TEMPLATE();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favRestoIdb.delRestaurant(this._restaurant.id);
      INIT_SWAL_SUCCESS('Restoran belum disimpan!');
      this._renderButton();
    });
  },

};

export default LIKE_BUTTON_PRESENTER;
