import {renderThumbnails} from './drawing-thumbnails.js';
import {openModal} from './full-size-mode.js';
import './form.js';
import {getData} from './api.js';
import {renderFilters} from './filters.js';
import {debounce} from './utils.js';

const RENDER_FILTERS_TIMEOUT_DELAY = 500;

getData().then((data) => {
  if (data) {
    renderThumbnails(data);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    renderFilters(debounce(renderThumbnails, RENDER_FILTERS_TIMEOUT_DELAY), data);
    document.querySelector('.pictures').addEventListener('click', (evt) => {
      const pictureId = evt.target.closest('.picture');
      if (pictureId) {
        openModal(data, pictureId);
      }
    });
  }
});
