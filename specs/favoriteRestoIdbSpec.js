import { itActsAsFavoriteRestoModel } from './contract/favoriteRestoContract';
import FAVORITE_RESTAURANT_IDB from '../src/scripts/data/favorite-restaurant-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FAVORITE_RESTAURANT_IDB.getAllRestaurant()).forEach(async (resto) => {
      await FAVORITE_RESTAURANT_IDB.delRestaurant(resto.id);
    });
  });

  itActsAsFavoriteRestoModel(FAVORITE_RESTAURANT_IDB);
});