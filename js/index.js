import footerControl from './modules/control/footerControl.js';
import headerControl from './modules/control/headerControl.js';
import mainControl from './modules/control/mainControl.js';
import createNewsContainer from './modules/render/renderNewscontainer.js';

// const URL = '/headlines.json';
// const SEARCH_URL = '/search.json';
const SEARCH_URL = 'https://newsapi.org/v2/everything?q=';
const URL = 'https://newsapi.org/v2/top-headlines?country=';

const init = (selector, rowItems) => {
  const app = document.querySelector(selector);
  const {header, lang} = headerControl(app, rowItems, URL, SEARCH_URL);
  const newsContainer = createNewsContainer(app);

  mainControl(newsContainer, URL + `${lang}`, rowItems, header);
  footerControl(app);
};

document.addEventListener('DOMContentLoaded', () => {
  init('.app', 4);
});
