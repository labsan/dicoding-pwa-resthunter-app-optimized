import CONFIG from '../../globals/config';

const CARD_LAYOUT = (resto) => `
    <div class="card">
      <a title="galeri restoran" href="#/detail/${resto.id}" class="card-a-tag">
        <div class="img-container">
          <img tabindex="0" class="card-image" crossorigin="anonymous" 
            alt="${resto.name}" 
            src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}"
          />
          <span tabindex="0" class="card-rating">
            <i title="ratings" class="fa fa-star"></i>
            <span>${resto.rating}</span>
          </span>
        </div>

        <div tabindex="0" title="menampilkan informasi singkat restoran" class="card-content">
          <h2 tabindex="0" class="card-content-title">${resto.name}</h2>
          <h3 tabindex="0" class="card-content-city">${resto.city}</h3>
          <p tabindex="0" class="truncate">${resto.description}</p>
        </div>
      </a>
    </div>
  `;

export default CARD_LAYOUT;
