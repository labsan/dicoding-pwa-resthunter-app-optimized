const assert = require('assert');

/*
  Value variabel ini menyesuaikan kalimat yang ditampilkan pada halaman Favorite
  ketika tidak memiliki data restoran dihalamannya
*/
const EMPTY_FAV_RESTO_TEXT = 'Tidak ada galeri restoran yang ditampilkan.';

// Variabel element HTML
const ELM_CARD = '.card';
const ELM_CARD_TITLE = '.card-content-title';
const ELM_FAV_RESTO = '#fav-resto';
const ELM_LIKE_BUTTON = '#likeButton';

// Variabel halaman HTML
const URL_ROOT_PAGE = '/';
const URL_FAVORITE_PAGE = '/#/favorite';

Feature('Favorite Restaurants');

Before(({I}) => {
  I.amOnPage(URL_FAVORITE_PAGE);
});

// SKENARIO UJI 1
Scenario('menampilkan halaman favorit restoran yang kosong', ({I}) => {
  I.seeElement('#fav-resto');
  I.see(EMPTY_FAV_RESTO_TEXT, '#fav-resto');
});

// SKENARIO UJI 2
Scenario('menampilkan satu galeri restoran yang di-favoritkan', async ({I}) => {
  I.see(EMPTY_FAV_RESTO_TEXT, ELM_FAV_RESTO);

  // URL: /
  I.amOnPage(URL_ROOT_PAGE);
  I.seeElement(ELM_CARD);

  const FIRST_RESTO = locate(ELM_CARD_TITLE).first();
  const FIRST_RESTO_TITLE = await I.grabTextFrom(FIRST_RESTO);
  I.click(FIRST_RESTO);

  // URL: /#/:detail
  I.seeElement(ELM_LIKE_BUTTON);
  I.click(ELM_LIKE_BUTTON);

  // URL: /#/favorite
  I.amOnPage(URL_FAVORITE_PAGE);
  I.seeElement(ELM_CARD);

  const FAV_RESTO_TITLE = await I.grabTextFrom(ELM_CARD_TITLE);

  assert.strictEqual(FIRST_RESTO_TITLE, FAV_RESTO_TITLE);
});

// SKENARIO UJI 3
Scenario('menampilkan satu galeri restoran yang tidak di-favoritkan', async ({I}) => {
  I.see(EMPTY_FAV_RESTO_TEXT, ELM_FAV_RESTO);

  // URL: /
  I.amOnPage(URL_ROOT_PAGE);
  I.seeElement(ELM_CARD);

  const FIRST_RESTO = locate(ELM_CARD_TITLE).first();
  const FIRST_RESTO_TITLE = await I.grabTextFrom(FIRST_RESTO);
  I.click(FIRST_RESTO);

  // URL: /#/:detail
  I.seeElement(ELM_LIKE_BUTTON);
  I.click(ELM_LIKE_BUTTON);

  /* UNFAVORITE RESTO */

  // URL: /#/favorite
  I.amOnPage(URL_FAVORITE_PAGE);
  I.seeElement(ELM_CARD);

  const UNFAV_RESTO_TITLE = await I.grabTextFrom(ELM_CARD_TITLE);

  assert.strictEqual(FIRST_RESTO_TITLE, UNFAV_RESTO_TITLE);

  I.click(UNFAV_RESTO_TITLE);

  I.seeElement(ELM_LIKE_BUTTON);
  I.click(ELM_LIKE_BUTTON);

  // // URL: /#/favorite
  I.amOnPage(URL_FAVORITE_PAGE);
  I.seeElement(ELM_FAV_RESTO);

  const UNFAV_RESTO = await I.grabTextFrom(ELM_FAV_RESTO);

  // Periksa, apakah halaman Favorite sudah kosong?
  assert.strictEqual(UNFAV_RESTO, EMPTY_FAV_RESTO_TEXT);
});
