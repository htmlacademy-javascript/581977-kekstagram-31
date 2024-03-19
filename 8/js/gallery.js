import {renderThumbnails} from './drawing-thumbnails';
import {openModal} from './full-size-mode';

renderThumbnails();

document.querySelector('.pictures').addEventListener('click', (evt) => {
  const pictureId = evt.target.closest('.picture');
  if (pictureId) {
    openModal(pictureId);
  }
});
