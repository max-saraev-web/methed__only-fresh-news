import fetchRequest from '../networking/fetchRequest.js';
import createContentFrame from '../render/createContentFrame.js';
import createHeadLine from '../render/createHeadLine.js';
import renderCard from '../render/renderCard.js';
import createHeader from '../render/renderHeader.js';
import createLoader from '../render/renderLoader.js';
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
    const overlay = createLoader();
    overlay.startAnimation();
    newsContainer.append(headLine, content, overlay.overlay);

    const data = await fetchRequest(url + `${lang}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': '4c200be121114cb3a3e43c38e8d23c4c',
      },
    });
    const newData = limitedArticles(data, rowItems, 8);

    Promise.all(newData.map(async elem => await renderCard(elem)))
      .then(cards => {
        cards.forEach(card => cContainer.append(card));
      })
      .then(() => {
        overlay.stopAnimation();
        overlay.overlay.remove();
      });
  });

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const target = ev.target;
    const val = target.headerSearch.value;
    if (val.trim() !== '') {
      const newsContainer = document.querySelector('main');
      newsContainer.innerHTML = '';

      const {headLine: headLineSearch, title: titleSearch} = createHeadLine();
      const {headLine: headLineRegular} =
        createHeadLine('Свежие новости');
      const {content: contentSearch, cContainer: cContainerSearch} =
        createContentFrame();
      const {content: contentRegular, cContainer: cContainerRegular} =
        createContentFrame();
      const overlay = createLoader();
      overlay.startAnimation();

      const data = await fetchRequest(searchUrl + `{${val}}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': '4c200be121114cb3a3e43c38e8d23c4c',
        },
      });
      console.log(data);
      const dataRegular = await fetchRequest(url + `${lang}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': '4c200be121114cb3a3e43c38e8d23c4c',
        },
      });
      newsContainer.append(headLineSearch, contentSearch, headLineRegular,
        contentRegular, overlay.overlay);
      const newData = limitedArticles(data, rowItems, 8);
      console.log('newData: ', newData);
      const newDataRegular = limitedArticles(dataRegular, rowItems, 4);

      titleSearch.textContent = `По вашему запросу “${val}” найдено 
        ${data.totalResults} результатов`;

      Promise.all([
        Promise.all(newData.map(async elem => await renderCard(elem)))
          .then(cards => {
            cards.forEach(card => cContainerSearch.append(card));
          })
          .catch(err => console.log(err)),
        Promise.all(newDataRegular.map(async elem => await renderCard(elem)))
          .then(cards => {
            cards.forEach(card => cContainerRegular.append(card));
          })
          .catch(err => console.log(err)),
      ]).then(() => {
        overlay.stopAnimation();
        overlay.overlay.remove();
        target.reset();
      });
    }
  });
  return {
    header,
    lang,
  };
};

export default headerControl;
