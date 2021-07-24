import DRAWER_INITIATOR from '../utils/drawer-initiator';
import URL_PARSER from '../routes/url-parser';
import ROUTES from '../routes/routes';

class App {
  constructor({button, drawer, content}) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DRAWER_INITIATOR.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = URL_PARSER.parseActiveUrlWithCombiner();
    const page = ROUTES[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
