import fetchRequest from '../networking/fetchRequest.js';
import renderCard from '../render/renderCard.js';
import renderMain from '../render/renderMain.js';

const mainControl = async (selector, url) => {
  const data = await fetchRequest(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': '4c200be121114cb3a3e43c38e8d23c4c',
    },
  });
  console.log('data: ', data);

  const mainReturn = renderMain(selector);
  const {
    main,
    title,
    contentBlock: block} = mainReturn;

  data.articles.forEach(elem => {
    const newCard = new Promise(resolve => {
      resolve(renderCard(elem));
    });
    newCard.then(card => block.append(card));
  });
};

export default mainControl;
