import fetchRequest from '../networking/fetchRequest.js';
import renderCard from '../render/renderCard.js';
import createLoader from '../render/renderLoader.js';
import renderMain from '../render/renderMain.js';
import {limitedArticles} from '../utility/utility.js';

const mainControl = async (selector, url, rowItems) => {
  const {contentBlock: block} = renderMain(selector);

  const overlay = createLoader();

  selector.append(overlay.overlay);

  const data = await fetchRequest(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': '4c200be121114cb3a3e43c38e8d23c4c',
    },
  });
  const newData = limitedArticles(data, rowItems, 8);

  Promise.all(newData.map(async elem => await renderCard(elem)))
    .then(cards => {
      overlay.stopAnimation();
      overlay.overlay.remove();
      cards.forEach(card => block.append(card));
    });
};

export default mainControl;
