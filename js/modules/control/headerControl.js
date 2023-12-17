import fetchRequest from '../networking/fetchRequest.js';
import renderCard from '../render/renderCard.js';
import renderFooter from '../render/renderFooter.js';
import createHeader from '../render/renderHeader.js';
import renderMain from '../render/renderMain.js';
import {limitedArticles} from '../utility/utility.js';


// const SEARCH_URL = 'https://newsapi.org/v2/everything?q=';
const SEARCH_URL = '/search.json';


const headerControl = (parent, rowItems) => {
  const header = createHeader(parent);
  const {form, headerSelect} = header;

  let lang = headerSelect.value;

  headerSelect.addEventListener('change', ({target}) => {
    lang = target.value;
    console.log(lang);
  });

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const target = ev.target;
    const val = target.headerSearch.value;
    if (val !== (val.trim() === '')) {
      const removeElems = document.querySelector('main');
      const removeFooter = document.querySelector('footer');
      removeElems.remove();
      removeFooter.remove();

      const data = await fetchRequest(SEARCH_URL, {
        method: 'GET',
        headers: {
          'X-Api-Key': '4c200be121114cb3a3e43c38e8d23c4c',
        },
      });
      // const data = await fetchRequest(SEARCH_URL + `{${val}}`, {
      //   method: 'GET',
      //   headers: {
      //     'X-Api-Key': '4c200be121114cb3a3e43c38e8d23c4c',
      //   },
      // });

      const newData = limitedArticles(data, rowItems, 8);

      const mainReturn = renderMain(parent);
      const {
        main,
        title,
        contentBlock: block} = mainReturn;

      title.textContent = `По вашему запросу “${val}” найдено 
        ${data.totalResults} результатов`;

      newData.forEach(elem => {
        const newCard = new Promise(resolve => {
          resolve(renderCard(elem));
        });
        newCard.then(card => block.append(card));
      });
      target.reset();
      renderFooter(parent);
    }
  });
  return {
    lang
  };
};

export default headerControl;
