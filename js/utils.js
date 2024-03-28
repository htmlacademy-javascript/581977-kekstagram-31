const getRandomInteger = (min, max)=> {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdFromRangeGenerator = (min = 1, max = Infinity) => {
  const previousValues = [];
  return function () {
    let currentValue = min;
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue += 1;
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const cloneTemplate = (locator) => {
  const body = document.querySelector('body');
  const template = document.querySelector(`#${locator}`).content;
  const templateElement = template.querySelector(`.${locator}`);
  const newElement = templateElement.cloneNode(true);
  body.append(newElement);
};

export {getRandomInteger, getRandomArrayElement, createIdFromRangeGenerator, cloneTemplate};
