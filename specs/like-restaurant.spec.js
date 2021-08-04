import FAVORITE_RESTAURANT_IDB from '../src/scripts/data/favorite-restaurant-idb';
import * as TEST_FACTORIES from './helpers/test-factories';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]'))
      .toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const RESTO = await FAVORITE_RESTAURANT_IDB.getRestaurant(1);
    expect(RESTO).toEqual({ id: 1 });
    FAVORITE_RESTAURANT_IDB.delRestaurant(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES({ id: 1 });

    // Tambahkan restoran dengan ID 1 ke daftar restoran yang disukai
    await FAVORITE_RESTAURANT_IDB.putRestaurant({ id: 1 });

    // Simulasikan pengguna menekan tombol suka restoran
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // tidak ada restoran yang ganda
    expect(await FAVORITE_RESTAURANT_IDB.getAllRestaurant()).toEqual([{ id: 1 }]);

    FAVORITE_RESTAURANT_IDB.delRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FAVORITE_RESTAURANT_IDB.getAllRestaurant()).toEqual([]);
  });
});
