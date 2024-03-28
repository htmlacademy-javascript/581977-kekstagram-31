import {renderThumbnails} from './drawing-thumbnails.js';
import {openModal} from './full-size-mode.js';
import './form.js';
import {getData} from './api.js';

getData().then((data) => {
  if (data) {
    renderThumbnails(data);
    document.querySelector('.pictures').addEventListener('click', (evt) => {
      const pictureId = evt.target.closest('.picture');
      if (pictureId) {
        openModal(data, pictureId);
      }
    });
  }
});
