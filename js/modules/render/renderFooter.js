import createContainer from './renderContainer.js';

const renderFooter = (parent) => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const container = createContainer();
  footer.footerContainer = container;
  footer.footerContainer.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  `;
  footer.append(container);

  const logo = document.createElement('img');
  logo.classList.add('footer__logo');
  logo.style.cssText = `
    width: 76px;
    height: 40px;
    object-fit: cover;
  `;
  logo.src = '../../../img/header/header__logo.svg';

  const copyRight = document.createElement('span');
  copyRight.classList.add('footer__copyright');
  copyRight.textContent = '© 2020-2022 News';

  const socials = document.createElement('div');
  socials.classList.add('footer__socials');

  const twitter = document.createElement('a');
  twitter.href = '#';
  twitter.classList.add('footer__social-link');
  const twitterIcon = document.createElement('img');
  twitterIcon.src = '../../../img/footer/twitter-icon.svg';
  twitter.append(twitterIcon);

  const ghost = document.createElement('a');
  ghost.href = '#';
  ghost.classList.add('footer__social-link');
  const ghostIcon = document.createElement('img');
  ghostIcon.src = '../../../img/footer/ghost-icon.svg';
  ghost.append(ghostIcon);

  const vk = document.createElement('a');
  vk.href = '#';
  vk.classList.add('footer__social-link');
  const vkIcon = document.createElement('img');
  vkIcon.src = '../../../img/footer/vk-icon.svg';
  vk.append(vkIcon);

  socials.append(twitter, ghost, vk);
  footer.footerContainer.append(logo, copyRight, socials);
  parent.append(footer);
};

export default renderFooter;
