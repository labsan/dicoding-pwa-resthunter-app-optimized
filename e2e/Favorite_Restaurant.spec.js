const assert = require('assert');
Feature('Favorite Restaurants');

Before(({I}) => {
  I.amOnPage('/#/favorite');  // START_URL: localhost:9191/#/favorite
});

/*
  Value variabel ini menyesuaikan kalimat yang ditampilkan pada halaman Favorite
  ketika tidak memiliki data restoran dihalamannya
*/ 
const emptyFavoriteRestoText = 'Tidak ada galeri restoran yang ditampilkan.';

// SKENARIO UJI 1
Scenario('menampilkan halaman favorit restoran yang kosong', ({I}) => {
  I.seeElement('#fav-resto');
  I.see(emptyFavoriteRestoText, '#fav-resto');
});

// SKENARIO UJI 2
Scenario('menampilkan satu galeri restoran yang di-favoritkan', async ({I}) => {
  I.see(emptyFavoriteRestoText, '#fav-resto');

  // URL: /
  I.amOnPage('/');
  I.seeElement('.card');
  const FIRST_RESTO = locate('.card-content-title').first();
  const FIRST_RESTO_TITLE = await I.grabTextFrom(FIRST_RESTO);
  I.click(FIRST_RESTO);

  // URL: /#/:detail
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // URL: /#/favorite
  I.amOnPage('/#/favorite');
  I.seeElement('.card');

  const FAV_RESTO_TITLE = await I.grabTextFrom('.card-content-title');

  assert.strictEqual(FIRST_RESTO_TITLE, FAV_RESTO_TITLE);
});

// SKENARIO UJI 3
Scenario('menampilkan satu galeri restoran yang tidak di-favoritkan', async ({I}) => {
  I.see(emptyFavoriteRestoText, '#fav-resto');

  // URL: /
  I.amOnPage('/');
  I.seeElement('.card');

  const FIRST_RESTO = locate('.card-content-title').first();
  const FIRST_RESTO_TITLE = await I.grabTextFrom(FIRST_RESTO);
  I.click(FIRST_RESTO);

  // URL: /#/:detail
  I.seeElement('#likeButton');
  I.click('#likeButton');

  /* UNFAVORITE RESTO */ 

  // URL: /#/favorite
  I.amOnPage('/#/favorite');
  I.seeElement('.card');

  const UNFAV_RESTO_TITLE = await I.grabTextFrom('.card-content-title');

  assert.strictEqual(FIRST_RESTO_TITLE, UNFAV_RESTO_TITLE);

  I.click(UNFAV_RESTO_TITLE);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  // // URL: /#/favorite
  I.amOnPage('/#/favorite');
  I.seeElement('#fav-resto');

  const UNFAV_RESTO = await I.grabTextFrom('#fav-resto');

  // CEK APAKAH HALAMAN FAVORITE SUDAH KOSONG
  assert.strictEqual(UNFAV_RESTO, emptyFavoriteRestoText);
});