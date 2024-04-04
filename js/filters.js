import {getRandomArrayElement} from './utils.js';

const COUNT_OF_RANDOM_PHOTOS = 10;

const filtersFormElement = document.querySelector('.img-filters__form');
const filterDefaultButtonElement = filtersFormElement.querySelector('#filter-default');
const filterRandomButtonElement = filtersFormElement.querySelector('#filter-random');
const filterDiscussedButtonElement = filtersFormElement.querySelector('#filter-discussed');

const changeToActiveFilterType = (active, others) => {
  others.forEach((other) => {
    if (other.classList.contains('img-filters__button--active')) {
      other.classList.remove('img-filters__button--active');
    }
  });
  active.classList.add('img-filters__button--active');
};

const clearPreviousRender = () => {
  const picturesElement = document.querySelector('.pictures');
  while (picturesElement.contains(picturesElement.querySelector('.picture'))) {
    picturesElement.querySelector('.picture').remove();
  }
};

const filterDefault = (callback, data) => {
  changeToActiveFilterType(filterDefaultButtonElement, [filterRandomButtonElement, filterDiscussedButtonElement]);
  callback(data);
};

const filterRandom = (callback, data) => {
  changeToActiveFilterType(filterRandomButtonElement, [filterDefaultButtonElement, filterDiscussedButtonElement]);
  const randomPhotosArray = [];
  while (randomPhotosArray.length < COUNT_OF_RANDOM_PHOTOS) {
    const randomArrayElement = getRandomArrayElement(data);
    if (!randomPhotosArray.includes(randomArrayElement)){
      randomPhotosArray.push(randomArrayElement);
    }
  }
  callback(randomPhotosArray);
};

const filterDiscussed = (callback, data) => {
  changeToActiveFilterType(filterDiscussedButtonElement, [filterDefaultButtonElement, filterRandomButtonElement]);
  const sortedArray = data.slice().sort((a, b) => b.comments.length - a.comments.length);
  callback(sortedArray);
};

const renderFilters = (callback, data) => {
  filtersFormElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target === filterDefaultButtonElement) {
      filterDefault(callback, data);
    } else if (evt.target === filterRandomButtonElement) {
      filterRandom(callback, data);
    } else if (evt.target === filterDiscussedButtonElement) {
      filterDiscussed(callback, data);
    }
  });
};

export {renderFilters, clearPreviousRender};
