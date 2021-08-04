import FAVORITE_RESTAURANT_IDB from '../src/scripts/data/favorite-restaurant-idb';
import * as TEST_FACTORIES from './helpers/test-factories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unliking Restaurants', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FAVORITE_RESTAURANT_IDB.putRestaurant({id: 1});
  });

  afterEach(async () => {
    await FAVORITE_RESTAURANT_IDB.delRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER({id: 1});

    expect(
        document.querySelector('[aria-label="unlike this restaurant"]'),
    ).toBeTruthy();
  });

  it('should not display unlike widget when the restaurant has been liked', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER({id: 1});

    expect(
        document.querySelector('[aria-label="like this restaurant"]'),
    ).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER({id: 1});

    document
        .querySelector('[aria-label="unlike this restaurant"]')
        .dispatchEvent(new Event('click'));
    const allRestaurant = await FAVORITE_RESTAURANT_IDB.getAllRestaurant();

    expect(allRestaurant).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER({id: 1});

    await FAVORITE_RESTAURANT_IDB.delRestaurant(1);
    document
        .querySelector('[aria-label="unlike this restaurant"]')
        .dispatchEvent(new Event('click'));
    const allRestaurant = await FAVORITE_RESTAURANT_IDB.getAllRestaurant();

    expect(allRestaurant).toEqual([]);
  });
});
