const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const form = document.querySelector('.img-upload__form');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);

const validateHashtags = () => {
  const hashtags = form.querySelector('.text__hashtags').value;
  return (hashtags === '' || hashtags.split(' ').every((hashtag) => REGEXP.test(hashtag)));
};
pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtags,
  'Введён невалидный хэштег'
);

const validateHashtagsLength = () => form.querySelector('.text__hashtags').value.split(' ').length <= 5;
pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtagsLength,
  'Превышено количество хэштегов'
);

const validateHashtagsUniqueness = () => {
  const hashtagsArray = form.querySelector('.text__hashtags').value.split(' ');
  const newHashtagsArray = [];
  for (let i = 0; i < hashtagsArray.length; i++) {
    newHashtagsArray.push(hashtagsArray[i].toLowerCase());
  }
  return (new Set(newHashtagsArray)).size === newHashtagsArray.length;
};
pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtagsUniqueness,
  'Хэштеги повторяются'
);

const validateCommentLength = () => form.querySelector('.text__description').value.length <= 140;
pristine.addValidator(
  form.querySelector('.text__description'),
  validateCommentLength,
  'Превышено количество допустимых символов'
);

const addFocusListeners = (callback) => {
  form.querySelector('.text__hashtags').addEventListener('focus', () => {
    document.removeEventListener('keydown', callback);
  });
  form.querySelector('.text__hashtags').addEventListener('blur', () => {
    document.addEventListener('keydown', callback);
  });
  form.querySelector('.text__description').addEventListener('focus', () => {
    document.removeEventListener('keydown', callback);
  });
  form.querySelector('.text__description').addEventListener('blur', () => {
    document.addEventListener('keydown', callback);
  });
};

const validateForm = () => {
  pristine.validate();
};

export {validateForm, addFocusListeners};
