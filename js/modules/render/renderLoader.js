const createLoader = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  overlay.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" fill="none">
  <path d="M142.5 60L112.5 90H135C135 114.825 114.825 135 90 135C82.425 135 75.225 133.125 69 129.75L58.05 140.7C67.275 146.55 78.225 150 90 150C123.15 150 150 123.15 150 90H172.5L142.5 60ZM45 90C45 65.175 65.175 45 90 45C97.575 45 104.775 46.875 111 50.25L121.95 39.3C112.725 33.45 101.775 30 90 30C56.85 30 30 56.85 30 90H7.5L37.5 120L67.5 90H45Z" fill="black">
    <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="360" to="0" dur="3s" repeatCount="indefinite" />
  </path>
</svg>

  `;
  return overlay;
};

export default createLoader;
