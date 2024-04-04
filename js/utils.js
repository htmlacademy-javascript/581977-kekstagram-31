const getRandomInteger = (min, max)=> {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const cloneTemplate = (locator) => {
  const bodyElement = document.querySelector('body');
  const template = document.querySelector(`#${locator}`).content;
  const templateElement = template.querySelector(`.${locator}`);
  const newElement = templateElement.cloneNode(true);
  bodyElement.append(newElement);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, getRandomArrayElement, cloneTemplate, debounce};
