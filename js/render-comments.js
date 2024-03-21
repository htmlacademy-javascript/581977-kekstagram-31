const SHOWN_COMMENTS_COUNT = 5;
let comments = [];
let commentsCounter = 0;
let commentsTotal = 0;

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

  if (comments.length <= SHOWN_COMMENTS_COUNT) {
    for (let i = 0; i < comments.length; i++) {
      commentsContainer.append(renderComment(comments, i));
      commentsCounter++;
    }
    bigPictureCommentsLoader.classList.add('hidden');
    bigPictureCommentsLoader.removeEventListener('click', showNextComments);
  } else {
    for (let i = 0; i < SHOWN_COMMENTS_COUNT; i++) {
      commentsContainer.append(renderComment(comments, i));
      commentsCounter++;
    }
    comments = comments.slice(SHOWN_COMMENTS_COUNT);
    bigPictureCommentsLoader.classList.remove('hidden');
  }
  bigPictureComments.append(commentsContainer);

  bigPictureShownComments.textContent = commentsCounter.toString();
  bigPictureTotalComments.textContent = commentsTotal.toString();
};

const renderComments = (photo) => {
  bigPictureComments.innerHTML = '';
  commentsCounter = 0;
  commentsTotal = photo.comments.length;
  comments = photo.comments;
  showNextComments();
  bigPictureCommentsLoader.addEventListener('click', showNextComments);
};

export {renderComments};
