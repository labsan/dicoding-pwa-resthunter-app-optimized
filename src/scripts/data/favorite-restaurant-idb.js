import {openDB} from 'idb';
import CONFIG from '../globals/config';

const {DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME} = CONFIG;

const DB_PROMISE = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, {keyPath: 'id'});
  },
});

const FAVORITE_RESTAURANT_IDB = {
  // Get one gallery restaurant
  async getRestaurant(id) {
    if (!id) {
      return;
    }
    return (await DB_PROMISE).get(OBJECT_STORE_NAME, id);
  },

  // Get all gallery restaurant
  async getAllRestaurant() {
    return (await DB_PROMISE).getAll(OBJECT_STORE_NAME);
  },

  // Put gallery restaurant
  async putRestaurant(resto) {
    if (!resto.hasOwnProperty('id')) {
      return;
    }
    return (await DB_PROMISE).put(OBJECT_STORE_NAME, resto);
  },

  // Delete gallery restaurant
  async delRestaurant(id) {
    return (await DB_PROMISE).delete(OBJECT_STORE_NAME, id);
  },
};

export default FAVORITE_RESTAURANT_IDB;
