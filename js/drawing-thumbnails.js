const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const renderThumbnails = (data) => {
  const picturesFragment = document.createDocumentFragment();
  data.forEach((postedPhoto) => {
    const newPicture = picture.cloneNode(true);
    const newPictureImage = newPicture.querySelector('.picture__img');
    const newPictureComments = newPicture.querySelector('.picture__comments');
    const newPictureLikes = newPicture.querySelector('.picture__likes');

    newPicture.dataset.id = postedPhoto.id;
    newPictureImage.src = postedPhoto.url;
    newPictureImage.alt = postedPhoto.description;
    newPictureComments.textContent = postedPhoto.comments.length;
    newPictureLikes.textContent = postedPhoto.likes;

    picturesFragment.append(newPicture);
  });
  pictures.append(picturesFragment);
};

export {renderThumbnails};
