const renderComments = (photo) => {
  const bigPictureComments = document.querySelector('.social__comments');
  const commentsContainer = document.createDocumentFragment();
  photo.comments.forEach((comment) => {
    const renderedComment = document.createElement('li');
    renderedComment.classList.add('social__comment');
    renderedComment.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35"> <p class="social__text">${comment.message}</p>`;
    commentsContainer.append(renderedComment);
  });
  bigPictureComments.append(commentsContainer);
};

export {renderComments};
