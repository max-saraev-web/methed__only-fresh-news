const createNewsContainer = selector => {
  const main = document.createElement('main');
  main.classList.add('main');
  selector.append(main);
  return main;
};

export default createNewsContainer;
