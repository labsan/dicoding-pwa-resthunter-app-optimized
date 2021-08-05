import LIKE_BUTTON_PRESENTER from '../../src/scripts/utils/like-button-presenter';
import FAVORITE_RESTAURANT_IDB from '../../src/scripts/data/favorite-restaurant-idb';

const CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES = async (restaurant) => {
  await LIKE_BUTTON_PRESENTER.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteResto: FAVORITE_RESTAURANT_IDB,
    data: {
      restaurant,
    },
  });
};

export { CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES };
