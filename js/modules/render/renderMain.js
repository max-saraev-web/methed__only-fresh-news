import createContentFrame from './createContentFrame.js';
import createHeadLine from './createHeadLine.js';

const renderMain = (selector, titleContent = 'Свежие новости') => {
  const {headLine, title} = createHeadLine(titleContent);

  const {content} = createContentFrame();

  selector.append(headLine, content);

  return {
    selector,
    title,
    contentBlock: content.contentContainer,
  };
};

export default renderMain;
