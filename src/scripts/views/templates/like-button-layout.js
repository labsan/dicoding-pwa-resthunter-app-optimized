const LIKE_BUTTON_TEMPLATE = () => `
  <button tabindex="0" aria-label="like this restaurant" id="likeButton" class="like">
    <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const UNLIKE_BUTTON_TEMPLATE = () => `
  <button tabindex="0" aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fas fa-heart" aria-hidden="true"></i>
  </button>
`;

export {LIKE_BUTTON_TEMPLATE, UNLIKE_BUTTON_TEMPLATE};
