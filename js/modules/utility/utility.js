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
