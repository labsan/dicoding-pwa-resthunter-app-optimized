const LIKE_BUTTON_TEMPLATE = () => `
  <button tabindex="0" aria-label="restoran di-favoritkan" id="likeButton" class="like">
    <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const UNLIKE_BUTTON_TEMPLATE = () => `
  <button tabindex="0" aria-label="restoran tidak di-favoritkan" id="likeButton" class="like">
    <i class="fas fa-heart" aria-hidden="true"></i>
  </button>
`;

export {LIKE_BUTTON_TEMPLATE, UNLIKE_BUTTON_TEMPLATE};
