const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const COMMENT_MAX_LENGTH = 140;

const formElement = document.querySelector('.img-upload__form');
const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);

const createNewHashtagsArray = (hashtagsArray) => {
  const newHashtagsArray = [];
  hashtagsArray.forEach((hashtag) => {
    if (hashtag !== '') {
      newHashtagsArray.push(hashtag.toLowerCase());
    }
  });
  return newHashtagsArray;
};

const validateHashtags = () => {
  const hashtags = formElement.querySelector('.text__hashtags').value;
  const hashtagsArray = hashtags.split(' ');
  return (hashtags === '' || createNewHashtagsArray(hashtagsArray).every((hashtag) => REGEXP.test(hashtag)));
};
pristine.addValidator(
  formElement.querySelector('.text__hashtags'),
  validateHashtags,
  'Введён невалидный хэштег'
);

const validateHashtagsLength = () => {
  const hashtagsArray = formElement.querySelector('.text__hashtags').value.split(' ');
  return createNewHashtagsArray(hashtagsArray).length <= 5;
};
pristine.addValidator(
  formElement.querySelector('.text__hashtags'),
  validateHashtagsLength,
  'Превышено количество хэштегов'
);

const validateHashtagsUniqueness = () => {
  const hashtagsArray = formElement.querySelector('.text__hashtags').value.split(' ');
  return (new Set(createNewHashtagsArray(hashtagsArray))).size === createNewHashtagsArray(hashtagsArray).length;
};
pristine.addValidator(
  formElement.querySelector('.text__hashtags'),
  validateHashtagsUniqueness,
  'Хэштеги повторяются'
);

const validateCommentLength = () => formElement.querySelector('.text__description').value.length <= COMMENT_MAX_LENGTH;
pristine.addValidator(
  formElement.querySelector('.text__description'),
  validateCommentLength,
  'Превышено количество допустимых символов'
);

export {pristine};
