import {renderComments} from './render-comments.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onCloseButtonClick = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPictureCloseButton.removeEventListener('click', onCloseButtonClick);
};

const openModal = (data, pictureId) => {
  const photo = data.find((postedPhoto) => postedPhoto.id === parseInt(pictureId.dataset.id, 10));

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImage.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureDescription.textContent = photo.description;

  renderComments(photo);

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCloseButton.addEventListener('click', onCloseButtonClick);
};

export {openModal};
