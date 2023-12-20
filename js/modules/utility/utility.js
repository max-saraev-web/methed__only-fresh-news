export const splitDate = date => {
  const stamp = new Date(date).getTime();
  const dayMonth = new Date(stamp);

  const days = dayMonth.getDate();

  const month = 1 + (dayMonth.getMonth());
  const year = dayMonth.getFullYear();

  const minutes = Math.floor(stamp / 1000 / 60 % 60);
  const hours = Math.floor((stamp / (1000 * 60 * 60)) % 24);

  return {
    day: days,
    minutes,
    hours,
    month,
    year,
  };
};

export const limitedArticles = (data, rowItems, endPoint = 0) => {
  const {articles} = data;
  const remainer = articles.length % rowItems;

  let midResult = [];
  if (remainer === 0) {
    midResult = articles;
  } else {
    midResult = articles.slice(0, endPoint);
  }
  const newSize = articles.length - remainer;

  const newArr = [];
  for (let i = 0; i < newSize; i++) {
    newArr[i] = midResult[i];
  }

  const finalArr = [];

  if (endPoint > 0) {
    for (let i = 0; i < endPoint; i++) {
      finalArr[i] = newArr[i];
    }
    return finalArr;
  } else {
    return newArr;
  }
};
