import fetchRequest from '../networking/fetchRequest.js';
import createContentFrame from '../render/createContentFrame.js';
import createHeadLine from '../render/createHeadLine.js';
import renderCard from '../render/renderCard.js';
import renderFooter from '../render/renderFooter.js';
import createHeader from '../render/renderHeader.js';
import renderMain from '../render/renderMain.js';
import {limitedArticles} from '../utility/utility.js';

const headerControl = (parent, rowItems, url, searchUrl) => {
  const header = createHeader(parent);
  const {form, headerSelect} = header;

  let lang = headerSelect.value;

  headerSelect.addEventListener('change', async ({target}) => {
    const newsContainer = document.querySelector('main');
    newsContainer.innerHTML = '';
    lang = target.value;
    const {headLine} = createHeadLine('Свежие новости');
    const {content, cContainer} = createContentFrame();
    newsContainer.append(headLine, content);

    const data = await fetchRequest(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': '4c200be121114cb3a3e43c38e8d23c4c',
      },
    });
    // if (data) overlay.remove();
    const newData = limitedArticles(data, rowItems, 8);


    newData.forEach(elem => {
      const newCard = new Promise(resolve => {
        resolve(renderCard(elem));
      });
      newCard.then(card => cContainer.append(card));
    });
  });

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const target = ev.target;
    const val = target.headerSearch.value;
    if (val !== (val.trim() === '')) {
      const newsContainer = document.querySelector('main');
      newsContainer.innerHTML = '';
      // ! - тут будет рендер поиска
      const {headLine} = createHeadLine('Свежие новости');
      const {content, cContainer} = createContentFrame();
      const data = await fetchRequest(searchUrl, {
        method: 'GET',
        headers: {
          'X-Api-Key': '4c200be121114cb3a3e43c38e8d23c4c',
        },
      });
      // const data = await fetchRequest(searchUrl + `{${val}}`, {
      //   method: 'GET',
      //   headers: {
      //     'X-Api-Key': '4c200be121114cb3a3e43c38e8d23c4c',
      //   },
      // });
      newsContainer.append(headLine, content);

      const newData = limitedArticles(data, rowItems, 8);

      const mainReturn = renderMain(parent);
      const {
        main,
        title,
        contentBlock: block} = mainReturn;

      title.textContent = `По вашему запросу “${val}” найдено 
        ${data.totalResults} результатов`;

      Promise.all(newData.map(async elem => await renderCard(elem)))
        .then(cards => {
          console.log(cards);
          cards.forEach(card => cContainer.append(card));
        })
        .catch(err => console.log(err));
      target.reset();
      renderFooter(parent);
    }
  });
  return {
    lang,
  };
};

export default headerControl;
