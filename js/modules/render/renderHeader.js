import createContainer from './renderContainer.js';

const createHeader = (parent) => {
  const header = document.createElement('header');
  header.classList.add('header');
  const container = createContainer();
  header.container = container;
  header.append(container);
  header.container.classList.add('header__container');

  // ! logo-start
  const logo = document.createElement('img');
  logo.classList.add('header__logo');
  logo.style.cssText = `
    width: 76px;
    height: 40px;
    object-fit: cover;
  `;
  logo.src = '../../../img/header/header__logo.svg';
  // ! logo-end

  // ! search-start
  const searchWrap = document.createElement('form');
  searchWrap.action = '#';
  searchWrap.classList.add('header__search-wrap');

  const search = document.createElement('input');
  search.name = 'headerSearch';
  search.type = 'search';
  search.classList.add('header__search');
  search.setAttribute('placeholder', 'Я хочу узнать про...');

  const searchBtn = document.createElement('button');
  searchBtn.classList.add('header__search-btn');
  searchBtn.type = 'submit';
  searchWrap.append(search, searchBtn);
  // !search-end

  // !select-start
  const headerSelectWrap = document.createElement('div');
  headerSelectWrap.classList.add('header__search-select-wrap');
  const indicator = document.createElement('div');
  indicator.classList.add('header__search-indicator');
  const headerSelect = document.createElement('select');
  headerSelect.classList.add('header__search-select');

  const optionKeys = [
    {
      key: 'Россия',
      value: 'ru',
    },
    {
      key: 'Австралия',
      value: 'au',
    },
    {
      key: 'Великобритания',
      value: 'gb',
    },
  ];

  const options = optionKeys.map(elem => {
    const selectOption = document.createElement('option');
    selectOption.value = elem.value;
    selectOption.classList.add('header__search-option');
    selectOption.textContent = elem.key;
    return selectOption;
  });

  headerSelect.append(...options);
  headerSelectWrap.append(headerSelect, indicator);
  // !select-end

  header.container.append(logo, searchWrap, headerSelectWrap);
  parent.append(header);

  return {
    header,
    container: header.contaier,
    logo,
    form: searchWrap,
    searchBtn,
    headerSelect,
  };
};

export default createHeader;
