const SHOWN_COMMENTS_COUNT = 5;
let comments = [];
let commentsCounter = 0;

const bigPicture = document.querySelector('.big-picture');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureShownComments = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureTotalComments = bigPicture.querySelector('.social__comment-total-count');

const renderComment = (data, index) => {
  const renderedComment = document.createElement('li');
  renderedComment.classList.add('social__comment');
  renderedComment.innerHTML = `<img class="social__picture" src="${data[index].avatar}" alt="${data[index].name}" width="35" height="35"> <p class="social__text">${data[index].message}</p>`;
  return renderedComment;
};

const showNextComments = () => {
  const commentsContainer = document.createDocumentFragment();

  for (let i = 0; i < Math.min(comments.length, SHOWN_COMMENTS_COUNT); i++) {
    commentsContainer.append(renderComment(comments, i));
    commentsCounter++;
  }
  bigPictureComments.append(commentsContainer);
  if (comments.length <= SHOWN_COMMENTS_COUNT) {
    bigPictureCommentsLoader.classList.add('hidden');
    bigPictureCommentsLoader.removeEventListener('click', showNextComments);
  } else {
    comments = comments.slice(SHOWN_COMMENTS_COUNT);
    bigPictureCommentsLoader.classList.remove('hidden');
  }
  bigPictureShownComments.textContent = commentsCounter.toString();
};

const renderComments = (photo) => {
  bigPictureComments.innerHTML = '';
  commentsCounter = 0;
  bigPictureTotalComments.textContent = photo.comments.length.toString();
  comments = photo.comments;
  showNextComments();
  bigPictureCommentsLoader.addEventListener('click', showNextComments);
};

export {renderComments};
