import footerControl from './modules/control/footerControl.js';
import headerControl from './modules/control/headerControl.js';
import mainControl from './modules/control/mainControl.js';

const URL = '/headlines.json';
// const URL = 'https://newsapi.org/v2/top-headlines?country=';

const init = async (selector, rowItems) => {
  const app = document.querySelector(selector);
  const {lang} = headerControl(app, rowItems);
  // await mainControl(app, URL + `${lang}`, rowItems);
  await mainControl(app, URL, rowItems);
  footerControl(app);
};

document.addEventListener('DOMContentLoaded', () => {
  init('.app', 4);
});
