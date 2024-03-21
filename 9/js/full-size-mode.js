import {allPostedPhotos} from './data';
import {renderComments} from './render-comments';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureShownComments = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureTotalComments = bigPicture.querySelector('.social__comment-total-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

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

const openModal = (pictureId) => {
  const photo = allPostedPhotos.find((postedPhoto) => postedPhoto.id === parseInt(pictureId.dataset.id, 10));

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImage.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureShownComments.textContent = photo.comments.length.toString();
  bigPictureTotalComments.textContent = photo.comments.length.toString();
  bigPictureComments.innerHTML = '';
  bigPictureDescription.textContent = photo.description;
  bigPictureCommentCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');

  renderComments(photo);

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCloseButton.addEventListener('click', onCloseButtonClick);
};

export {openModal};
