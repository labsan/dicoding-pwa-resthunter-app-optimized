import FAVORITE_RESTAURANT_IDB from '../src/scripts/data/favorite-restaurant-idb';
import * as TEST_FACTORIES from './helpers/test-factories';

describe('Unliking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FAVORITE_RESTAURANT_IDB.putRestaurant({id:1});
  });

  afterEach(async () => {
    await FAVORITE_RESTAURANT_IDB.delRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES({ id: 1 });

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

    expect(await FAVORITE_RESTAURANT_IDB.getAllRestaurant()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES({ id: 1 });

    // hapus dulu film dari daftar restoran yang disukai
    await FAVORITE_RESTAURANT_IDB.delRestaurant(1);

    // kemudian, simulasikan pengguna menekan widget batal menyukai restoran
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

    expect(await FAVORITE_RESTAURANT_IDB.getAllRestaurant()).toEqual([]);
  });

});
