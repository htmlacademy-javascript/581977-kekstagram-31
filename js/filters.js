import {getRandomArrayElement} from './utils.js';

const COUNT_OF_RANDOM_PHOTOS = 10;
const filtersForm = document.querySelector('.img-filters__form');
const filterDefaultButton = filtersForm.querySelector('#filter-default');
const filterRandomButton = filtersForm.querySelector('#filter-random');
const filterDiscussedButton = filtersForm.querySelector('#filter-discussed');

const changeToActiveFilterType = (active, others) => {
  others.forEach((other) => {
    if (other.classList.contains('img-filters__button--active')) {
      other.classList.remove('img-filters__button--active');
    }
  });
  active.classList.add('img-filters__button--active');
};

const clearPreviousRender = () => {
  const pictures = document.querySelector('.pictures');
  while (pictures.contains(pictures.querySelector('.picture'))) {
    pictures.querySelector('.picture').remove();
  }
};

const filterDefault = (cb, data) => {
  changeToActiveFilterType(filterDefaultButton, [filterRandomButton, filterDiscussedButton]);
  cb(data);
};

const filterRandom = (cb, data) => {
  changeToActiveFilterType(filterRandomButton, [filterDefaultButton, filterDiscussedButton]);
  const randomPhotosArray = [];
  while (randomPhotosArray.length < COUNT_OF_RANDOM_PHOTOS) {
    const randomArray = getRandomArrayElement(data);
    if (!randomPhotosArray.includes(randomArray)){
      randomPhotosArray.push(randomArray);
    }
  }
  cb(randomPhotosArray);
};

const filterDiscussed = (cb, data) => {
  changeToActiveFilterType(filterDiscussedButton, [filterDefaultButton, filterRandomButton]);
  const sortedArray = data.slice().sort((a, b) => b.comments.length - a.comments.length);
  cb(sortedArray);
};

const renderFilters = (cb, data) => {
  filtersForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target === filterDefaultButton) {
      filterDefault(cb, data);
    } else if (evt.target === filterRandomButton) {
      filterRandom(cb, data);
    } else if (evt.target === filterDiscussedButton) {
      filterDiscussed(cb, data);
    }
  });
};

export {renderFilters, clearPreviousRender};
