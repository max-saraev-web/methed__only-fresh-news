import footerControl from './modules/control/footerControl.js';
import headerControl from './modules/control/headerControl.js';
import mainControl from './modules/control/mainControl.js';

// const URL = '/headlines.json';
const URL = 'https://newsapi.org/v2/top-headlines?country=ru';

const init = async selector => {
  const app = document.querySelector(selector);
  headerControl(app);
  await mainControl(app, URL);
  footerControl(app);
};

document.addEventListener('DOMContentLoaded', () => {
  init('.app');
});
