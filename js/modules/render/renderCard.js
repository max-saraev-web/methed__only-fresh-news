import {splitDate} from '../utility/utility.js';

const renderCard = async ({
  urlToImage,
  title: cardTitle,
  description,
  url,
  publishedAt,
  author,
}) => {
  const card = document.createElement('article');
  card.classList.add('card');

  const block = document.createElement('a');
  block.target = '_blank';
  block.href = url;
  block.classList.add('card__block');

  const img = document.createElement('img');
  img.classList.add('card__image');
  img.src = `
    ${typeof urlToImage !== 'string' ?
  '../../../img/card/placeholder.jpg' : urlToImage}
  `;

  const arrow = document.createElement('img');
  arrow.classList.add('card__arrow');
  arrow.src = '../../../img/card/arrow.svg';

  const title = document.createElement('h2');
  title.classList.add('card__title');
  title.textContent = cardTitle;

  const descr = document.createElement('p');
  descr.classList.add('card__descr');
  descr.textContent = description;

  const postBlock = document.createElement('div');
  postBlock.classList.add('card__post-block');

  const dateBlock = document.createElement('div');
  dateBlock.classList.add('card__date-block');

  const parseDate = splitDate(publishedAt);
  const {
    day,
    month,
    year,
    hours,
    minutes,
  } = parseDate;

  const date = document.createElement('span');
  date.style.marginRight = '12px';
  date.textContent = `${day}/${month}/${year}`;

  const time = document.createElement('span');

  const adjustedMins = mins => {
    const m = mins.toString();
    if (m === '0') {
      return '00';
    } else if (m.length === 1 && m > 0) {
      return `0${minutes}`;
    } else {
      return `${minutes}`;
    }
  };
  const minResult = adjustedMins(minutes);

  time.textContent = `${hours}:${minResult}`;

  const authorName = document.createElement('span');
  authorName.textContent = `${(author === null || author.trim() === '') ?
    'Автор неизвестен' : author}`;

  dateBlock.append(date, time);

  postBlock.append(dateBlock, authorName);
  block.append(arrow, title, descr, postBlock);

  const checkImage = async () => new Promise((resolve, reject) => {
    img.addEventListener('load', () => {
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(img);
    });
  });

  const loadedCard = async () => {
    try {
      const img = await checkImage();
      card.append(img, block);
    } catch (error) {
      img.src = '../../../img/card/placeholder.jpg';
      card.append(img, block);
    }
  };

  loadedCard();
  return card;
};

export default renderCard;
