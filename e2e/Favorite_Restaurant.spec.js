const assert = require('assert');

Feature('Favorite Restaurants');

Before(({I}) => {
  I.amOnPage('/#/favorite');
});

const emptyFavoriteRestoText = 'Restoran yang di-favoritkan tidak ada. Klik button favorit pada halaman informasi restoran.';

Scenario('menampilkan halaman favorit restoran yang kosong', ({I}) => {
  I.seeElement('#fav-resto');
  I.see(emptyFavoriteRestoText, '#fav-resto');
});

Scenario('menampilkan satu galeri restoran yang di-favoritkan', async ({I}) => {
  I.see(emptyFavoriteRestoText, '#fav-resto');

  // URL: /
  I.amOnPage('/');
  I.seeElement('.card a');
  const FIRST_RESTO_CARD = locate('.card-content-title').first();
  const FIRST_RESTO_CARD_TITLE = await I.grabTextFrom(FIRST_RESTO_CARD);
  I.click(FIRST_RESTO_CARD);

  // URL: /resto/:id
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // URL: /#/favorite
  I.amOnPage('/#/favorite');
  I.seeElement('.card');
  const UNLIKE_CARD_TITLE = await I.grabTextFrom('.card-content-title');
  assert.strictEqual(FIRST_RESTO_CARD_TITLE, UNLIKE_CARD_TITLE);
});

Scenario('menampilkan satu galeri restoran yang tidak di-favoritkan', async ({I}) => {
  I.seeElement('.card');
  const UNLIKE_CARD_TITLE = await I.grabTextFrom('.card-content-title');
  I.click(UNLIKE_CARD_TITLE);

  // URL: /resto/:id
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // URL: /#/favorite
  I.amOnPage('/#/favorite');
  I.seeElement('#fav-resto');
  I.dontSeeElement('.card');
  I.dontSeeElement('.card-content-title');
});
