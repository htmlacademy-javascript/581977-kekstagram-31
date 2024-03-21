import {renderThumbnails} from './drawing-thumbnails.js';
import {openModal} from './full-size-mode.js';
import './form.js';

renderThumbnails();

document.querySelector('.pictures').addEventListener('click', (evt) => {
  const pictureId = evt.target.closest('.picture');
  if (pictureId) {
    openModal(pictureId);
  }
});
