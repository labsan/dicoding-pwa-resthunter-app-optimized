import { itActsAsFavoriteRestoModel } from './contract/favoriteRestoContract';

let favoriteResto = [];

const FAVORITE_RESTO_ARRAY = {

  getRestaurant(id) {
    if (!id) {
      return;
    }

    return favoriteResto.find((resto) => resto.id === id);
  },

  getAllRestaurant() {
    return favoriteResto;
  },

  putRestaurant(resto) {
    if (!resto.hasOwnProperty('id')) {
      return;
    }

    if (this.getRestaurant(resto.id)) {
      return;
    }

    favoriteResto.push(resto);
  },

  delRestaurant(id) {
    favoriteResto = favoriteResto.filter((resto) => resto.id !== id);
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => favoriteResto = []);

  itActsAsFavoriteRestoModel(FAVORITE_RESTO_ARRAY);
});