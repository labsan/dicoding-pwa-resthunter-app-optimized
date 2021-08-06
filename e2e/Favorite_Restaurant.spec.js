const assert = require('assert');

Feature('Favorite Restaurants');

Before(({I}) => {
  // START_URL: localhost:9191/#/favorite
  I.amOnPage('/#/favorite');
});

// Value variabel ini menyesuaikan kalimat pada halaman Favorite saat tidak memiliki data restoran dihalamannya
const emptyFavoriteRestoText = 'Restoran yang di-favoritkan tidak ada. Klik button favorit pada halaman informasi restoran.';

// SKENARIO UJI 1
Scenario('menampilkan halaman favorit restoran yang kosong', ({I}) => {
  // Saya mencari elemen #fav-resto
  I.seeElement('#fav-resto');

  // Saya melihat teks pada elemen #fav-resto
  I.see(emptyFavoriteRestoText, '#fav-resto');
});

// SKENARIO UJI 2
Scenario('menampilkan satu galeri restoran yang di-favoritkan', async ({I}) => {
  // Pengguna melihat teks pada elemen #fav-resto
  I.see(emptyFavoriteRestoText, '#fav-resto');

    // URL: /
    I.amOnPage('/');
    I.seeElement('.card');
    const FIRST_RESTO_CARD = locate('.card-content-title').first();
    // const FIRST_RESTO_CARD_TITLE = await I.grabTextFrom(FIRST_RESTO_CARD);
    I.click(FIRST_RESTO_CARD);

    // URL: /#/:detail
    I.seeElement('#likeButton');
    I.click('#likeButton');
    pause();


    // URL: /#/favorite
    // I.amOnPage('/#/favorite');
    // I.seeElement('.card');
    // const likedRestoTitle = await I.grabTextFrom('.card-content-title');
    // assert.strictEqual(FIRST_RESTO_CARD_TITLE, likedRestoTitle);
});

// SKENARIO UJI 3
// Scenario('menampilkan satu galeri restoran yang tidak di-favoritkan', async ({I}) => {
//   I.seeElement('.card a');
//   const likedRestoTitle = await I.grabTextFrom('.card-content-title');
//   I.click(likedRestoTitle);

  // URL: /resto/:id
  // I.seeElement('#likeButton');
  // I.click('#likeButton');

  // URL: /#/favorite
  // I.amOnPage('/#/favorite');
  // I.seeElement('#fav-resto');
  // I.dontSeeElement('.card');
  // I.dontSeeElement('.card-content-title');
// });
