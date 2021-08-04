import LIKE_BUTTON_PRESENTER from '../../src/scripts/utils/like-button-presenter';

const CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES = async (movie) => {
  await LIKE_BUTTON_PRESENTER.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    movie,
  });
};

export { CREATE_LIKE_BUTTON_PRESENTER_RESTO_FACTORIES };
