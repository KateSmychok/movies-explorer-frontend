export const SetMaximumCards = () => {
  let i;
  if (window.innerWidth > 768) {
    i = 3;
  } else if (window.innerWidth > 480) {
    i = 2;
  } else {
    i = 5;
  }
  return i;
};

export const AddCardsOnBtnClick = () => {
  let i;
  if (window.innerWidth > 768) {
    i = 3;
  } else if (window.innerWidth > 480) {
    i = 2;
  } else {
    i = 2;
  }
  return i;
};

export const MinToHours = (min) => {
  const hours = Math.trunc(min / 60);
  const minutes = min % 60;
  if (min < 60) {
    return `${min} мин.`;
  }
  if (minutes === 0) {
    return `${hours} ч.`;
  }
  return `${hours} ч. ${minutes} мин.`;
};
