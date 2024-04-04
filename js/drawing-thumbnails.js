import {clearPreviousRender} from './filters.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictureElement = pictureTemplate.querySelector('.picture');
const picturesElement = document.querySelector('.pictures');

const renderThumbnails = (photos) => {
  const picturesFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const newPicture = pictureElement.cloneNode(true);
    const newPictureImageElement = newPicture.querySelector('.picture__img');
    const newPictureCommentsElement = newPicture.querySelector('.picture__comments');
    const newPictureLikesElement = newPicture.querySelector('.picture__likes');

    newPicture.dataset.id = photo.id;
    newPictureImageElement.src = photo.url;
    newPictureImageElement.alt = photo.description;
    newPictureCommentsElement.textContent = photo.comments.length;
    newPictureLikesElement.textContent = photo.likes;

    picturesFragment.append(newPicture);
  });
  clearPreviousRender();
  picturesElement.append(picturesFragment);
};

export {renderThumbnails};
