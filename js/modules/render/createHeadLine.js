import createContainer from './renderContainer.js';

const createHeadLine = titleContent => {
  const headLine = document.createElement('div');
  headLine.classList.add('main__headline');

  const container = createContainer();
  headLine.headlineContainer = container;

  const title = document.createElement('h1');
  title.classList.add('main-title');
  title.textContent = titleContent;

  headLine.append(container);
  headLine.headlineContainer.append(title);

  return {
    headLine,
    hContainer: headLine.headlineContainer,
    title,
  };
};

export default createHeadLine;
