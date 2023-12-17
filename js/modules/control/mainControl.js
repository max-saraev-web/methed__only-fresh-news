import fetchRequest from '../networking/fetchRequest.js';
import renderCard from '../render/renderCard.js';
import createLoader from '../render/renderLoader.js';
import renderMain from '../render/renderMain.js';
import {limitedArticles} from '../utility/utility.js';

const mainControl = async (selector, url, rowItems) => {
  const mainReturn = renderMain(selector);
  const {
    main,
    title,
    contentBlock: block} = mainReturn;

  const overlay = createLoader();
  block.append(overlay);

  const data = await fetchRequest(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': '4c200be121114cb3a3e43c38e8d23c4c',
    },
  });
  if (data) overlay.remove();
  const newData = limitedArticles(data, rowItems, 8);


  newData.forEach(elem => {
    const newCard = new Promise(resolve => {
      resolve(renderCard(elem));
    });
    newCard.then(card => block.append(card));
  });
};

export default mainControl;
