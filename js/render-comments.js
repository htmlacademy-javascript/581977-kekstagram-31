const SHOWN_COMMENTS_COUNT = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCommentsElement = bigPictureElement.querySelector('.social__comments');
const bigPictureCommentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bigPictureShownCommentsElement = bigPictureElement.querySelector('.social__comment-shown-count');
const bigPictureTotalCommentsElement = bigPictureElement.querySelector('.social__comment-total-count');
let comments = [];
let commentsCounter = 0;

const renderComment = (data, index) => {
  const renderedComment = document.createElement('li');
  renderedComment.classList.add('social__comment');
  renderedComment.innerHTML = `<img class="social__picture" src="${data[index].avatar}" alt="${data[index].name}" width="35" height="35"> <p class="social__text">${data[index].message}</p>`;
  return renderedComment;
};

const onShowNextComments = () => {
  const commentsFragment = document.createDocumentFragment();

  for (let i = 0; i < Math.min(comments.length, SHOWN_COMMENTS_COUNT); i++) {
    commentsFragment.append(renderComment(comments, i));
    commentsCounter++;
  }
  bigPictureCommentsElement.append(commentsFragment);
  if (comments.length <= SHOWN_COMMENTS_COUNT) {
    bigPictureCommentsLoaderElement.classList.add('hidden');
    bigPictureCommentsLoaderElement.removeEventListener('click', onShowNextComments);
  } else {
    comments = comments.slice(SHOWN_COMMENTS_COUNT);
    bigPictureCommentsLoaderElement.classList.remove('hidden');
  }
  bigPictureShownCommentsElement.textContent = commentsCounter.toString();
};

const renderComments = (photo) => {
  bigPictureCommentsElement.innerHTML = '';
  commentsCounter = 0;
  bigPictureTotalCommentsElement.textContent = photo.comments.length.toString();
  comments = photo.comments;
  onShowNextComments();
  bigPictureCommentsLoaderElement.addEventListener('click', onShowNextComments);
};

export {renderComments};
