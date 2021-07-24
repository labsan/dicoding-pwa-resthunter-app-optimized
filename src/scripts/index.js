/* for async await transpile */
import 'regenerator-runtime';

/* import CSS */
import '../styles/root.css';

import '../styles/elements/header.css';
import '../styles/elements/nav.css';
import '../styles/elements/main.css';
import '../styles/elements/footer.css';

import '../styles/elements/mains/detail-resto-layout.css';
import '../styles/elements/mains/fav-resto-layout.css';
import '../styles/elements/mains/spinner.css';

import '../styles/responsives/responsive.css';

/* Import Custom Element */
import './components/navbar';
import './components/hero';
import './components/footer';

/* import JS */
import App from './views/app';
import SW_REGISTER from './utils/sw-register';
import WEBSOCKET_INITIATOR from './utils/websocket-initiator';
import CONFIG from './globals/config';

/* Init App */
const APP = new App({
  button: document.querySelector('.menu'),
  drawer: document.querySelector('.nav-list'),
  content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
  document.querySelector('.container').scrollIntoView();
  APP.renderPage();
});

window.addEventListener('load', () => {
  APP.renderPage();
  SW_REGISTER();
  WEBSOCKET_INITIATOR.init(CONFIG.WEBSOCKET_SERVER);
});
