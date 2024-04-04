import {renderComments} from './render-comments.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');

const resetSettings = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseModal);
  bigPictureCloseButtonElement.removeEventListener('click', onCloseModal);
};

function onCloseModal (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
  }
  resetSettings();
}

const openModal = (photos, photoId) => {
  const currentPhoto = photos.find((photo) => photo.id === parseInt(photoId.dataset.id, 10));

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  bigPictureImageElement.src = currentPhoto.url;
  bigPictureLikesElement.textContent = currentPhoto.likes;
  bigPictureDescriptionElement.textContent = currentPhoto.description;

  renderComments(currentPhoto);

  document.addEventListener('keydown', onCloseModal);
  bigPictureCloseButtonElement.addEventListener('click', onCloseModal);
};

export {openModal};
