import createContainer from './renderContainer.js';

const renderMain = (selector, titleContent = 'Свежие новости') => {
  const main = document.createElement('main');
  main.classList.add('main');

  const headLine = document.createElement('div');
  headLine.classList.add('main__headline');

  const container = createContainer();
  headLine.headlineContainer = container;

  const title = document.createElement('h1');
  title.classList.add('main-title');
  title.textContent = titleContent;

  const content = document.createElement('section');
  content.classList.add('main__content');
  const contentContainer = createContainer();
  content.contentContainer = contentContainer;
  content.append(contentContainer);


  headLine.append(container);
  headLine.headlineContainer.append(title);
  main.append(headLine, content);
  selector.append(main);

  return {
    main,
    title,
    contentBlock: content.contentContainer,
  };
};

export default renderMain;
