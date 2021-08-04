import FAVORITE_RESTAURANT_IDB from '../src/scripts/data/favorite-restaurant-idb';
import * as TEST_FACTORIES from './helpers/test-factories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Liking Restaurants', () => {
  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER({id: 1});

    expect(
        document.querySelector('[aria-label="like this restaurant"]'),
    ).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER({id: 1});

    expect(
        document.querySelector('[aria-label="unlike this restaurant"]'),
    ).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER({id: 1});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const resto = await FAVORITE_RESTAURANT_IDB.getRestaurant(1);

    expect(resto).toEqual({id: 1});
    await FAVORITE_RESTAURANT_IDB.delRestaurant(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER({id: 1});

    await FAVORITE_RESTAURANT_IDB.putRestaurant({id: 1});
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const allRestaurant = await FAVORITE_RESTAURANT_IDB.getAllRestaurant();
    expect(allRestaurant).toEqual([{id: 1}]);

    await FAVORITE_RESTAURANT_IDB.delRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TEST_FACTORIES.CREATE_LIKE_BUTTON_PRESENTER({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const allRestaurant = await FAVORITE_RESTAURANT_IDB.getAllRestaurant();
    expect(allRestaurant).toEqual([]);
  });
});
