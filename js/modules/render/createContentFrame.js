import createContainer from './renderContainer.js';

const createContentFrame = () => {
  const content = document.createElement('section');
  content.classList.add('main__content');
  const contentContainer = createContainer();
  content.contentContainer = contentContainer;
  content.append(contentContainer);

  return {
    content,
    cContainer: content.contentContainer,
  };
};

export default createContentFrame;
