Feature('Favorite Restaurants');

Before(({I}) => {
  I.amOnPage('/#/favorite');
  // pause();
});

Scenario('menampilkan halaman favorit restoran yang kosong', ({I}) => {
  // Uji element id fav-resto
  I.seeElement('#fav-resto');
  I.see('Tidak ada restoran untuk ditampilkan', '#fav-resto');
});

Scenario('favorit satu galeri restoran', ({I}) => {
  I.see('Tidak ada restoran untuk ditampilkan', '#fav-resto');

  I.amOnPage('/');
});

// const assert = require('assert');

// Feature('Favorite Restaurant');

// Before(({I}) => {
//   // Root URL -> http://localhost:9191
//   I.amOnPage('/#/favorite');
// });

// const emptyFavoriteRestoText = 'tidak ada restoran yang di-favoritkan';

// Scenario('menampilkan halaman favorit restoran yang kosong', ({I}) => {
//   I.seeElement('#fav-resto');
//   I.see(emptyFavoriteRestoText, '#fav-resto');
// });

// Scenario('menampilkan satu galeri restoran yang di-favoritkan', async ({I}) => {
//   I.see(emptyFavoriteRestoText, '#fav-resto');

//   // URL: /
//   I.amOnPage('/');
//   I.seeElement('.card a');
//   const firstRestoCard = locate('.card-content-title').first();
//   const firstRestoCardTitle = await I.grabTextFrom(firstRestoCard);
//   I.click(firstRestoCard);

//   // URL: /resto/:id
//   I.seeElement('#likeButton');
//   I.click('#likeButton');

//   // URL: /#/favorite
//   I.amOnPage('/#/favorite');
//   I.seeElement('.card');
//   const likedCardTitle = await I.grabTextFrom('.card-content-title');
//   assert.strictEqual(firstRestoCardTitle, likedCardTitle);
// });

// Scenario('menampilkan satu galeri restoran yang tidak di-favoritkan', async ({I}) => {
//   I.seeElement('.card');
//   const likedCardTitle = await I.grabTextFrom('.card-content-title');
//   I.click(likedCardTitle);

//   // URL: /resto/:id
//   I.seeElement('#likeButton');
//   I.click('#likeButton');

//   // URL: /#/favorite
//   I.amOnPage('/#/favorite');
//   I.seeElement('#fav-resto');
//   I.dontSeeElement('.card');
//   I.dontSeeElement('.card-content-title');
// });
