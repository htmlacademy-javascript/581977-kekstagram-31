import {getAllPostedPhoto} from './data';

const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();
const allPostedPhotos = getAllPostedPhoto();

allPostedPhotos.forEach((postedPhoto) => {
  const newPicture = picture.cloneNode(true);
  const newPictureImage = newPicture.querySelector('.picture__img');
  const newPictureComments = newPicture.querySelector('.picture__comments');
  const newPictureLikes = newPicture.querySelector('.picture__likes');

  newPictureImage.src = postedPhoto.url;
  newPictureImage.alt = postedPhoto.description;
  newPictureComments.textContent = postedPhoto.comments.length;
  newPictureLikes.textContent = postedPhoto.likes;

  picturesFragment.append(newPicture);
});

pictures.append(picturesFragment);
