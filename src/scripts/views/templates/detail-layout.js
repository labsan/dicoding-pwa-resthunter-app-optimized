import CONFIG from '../../globals/config';

const DETAIL_LAYOUT = (resto) => `
  <div class="detail">
    <div class="img-container">
        <img tabindex="0" class="detail-img" alt="${resto.name}" src="${
  CONFIG.BASE_IMAGE_URL + resto.pictureId}"/>
    </div>

    <ul class="detail-info">
      <li>
        <i tabindex="0" title="icon nama restoran" class="fas fa-store-alt icon-primary"></i>
        <p tabindex="0" class="detail-name-address-rating">${resto.name}</p>
      </li>

      <li>
        <i tabindex="0" title="icon alamat restoran" class="fas fa-map-marker-alt icon-primary"></i>
        <p tabindex="0" class="detail-name-address-rating">
          ${resto.address}, ${resto.city}
        </p>
      </li>

      <li>
        <i tabindex="0" title="icon rating restoran" class="fas fa-star icon-primary"></i>
        <p tabindex="0" class="detail-name-address-rating">${resto.rating}</p>
      </li>

      <li><p tabindex="0" class="detail-desc">${resto.description}</p></li>

      <li>${resto.categories
      .map(
          (category) => `
            <span tabindex="0" title="kategori restoran" class="category">${category.name}</span>
          `,
      )
      .join('')}
      </li>
    </ul>

    <div class="detail-menu">
      <div class="detail-food">
        <h4 tabindex="0">Katalog Makanan</h4>
        <ul>
          ${resto.menus.foods
      .map(
          (food, i) => `
                <li tabindex="0"><p>${i + 1}) ${food.name}</p></li>
              `,
      )
      .join('')}
        <ul>
      </div>

      <div class="detail-drink">
        <h4 tabindex="0">Katalog Minuman</h4>
        <ul>
          ${resto.menus.drinks
      .map(
          (drink, i) => `
                <li tabindex="0"><p>${i + 1}) ${drink.name}</p></li>
              `,
      )
      .join('')}
        <ul>
      </div>
    </div>

    <h3 tabindex="0" class="title-review">Reviews</h3>

    <div class="detail-review">
    ${resto.customerReviews
      .map(
          (review) => `
          <div class="detail-review-item">
            <div tabindex="0" class="review-header">
              <p class="review-name">${review.name}</p>
              <p class="review-date">${review.date}</p>
            </div>

            <div tabindex="0" class="review-body">
              ${review.review}
            </div>
          </div>
        `,
      )
      .join('')}
    </div>
  </div>
`;

export default DETAIL_LAYOUT;
