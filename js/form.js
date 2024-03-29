import './effects.js';
import {addScaleListeners, removeScaleListeners} from './scale.js';
import {pristine} from './validators.js';
import {sendData} from './api.js';
import {cloneTemplate} from './utils.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');

const resetSettings = (callback) => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', callback);
  document.removeEventListener('click', callback);
  removeScaleListeners();
  if (body.contains(document.querySelector('.success'))) {
    document.querySelector('.success').remove();
  }
  pristine.reset();
  form.reset();
};

const onDocumentKeydown = (evt) => {
  const hashtags = form.querySelector('.text__hashtags');
  const description = form.querySelector('.text__description');
  if (evt.key === 'Escape' && document.activeElement !== hashtags && document.activeElement !== description) {
    evt.preventDefault();
    resetSettings(onDocumentKeydown);
  }
};

const onDocumentKeydownModal = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.querySelector('.error').remove();
    document.addEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('keydown', onDocumentKeydownModal);
  }
};

const onOutsideClick = (evt) => {
  if (evt.target === document.querySelector('.success')) {
    document.querySelector('.success').remove();
    resetSettings(onOutsideClick);
  } else if (evt.target === document.querySelector('.error')) {
    document.querySelector('.error').remove();
    document.removeEventListener('click', onOutsideClick);
  }
};

const onCloseButtonClick = (evt) => {
  if (evt.target === document.querySelector('.success__button')) {
    document.querySelector('.success').remove();
    resetSettings(onCloseButtonClick);
  } else if (evt.target === document.querySelector('.error__button')) {
    document.querySelector('.error').remove();
  } else {
    resetSettings(onCloseButtonClick);
  }
};

const onSuccess = () => {
  body.classList.remove('modal-open');
  cloneTemplate('success');
  document.addEventListener('click', onOutsideClick);
  document.querySelector('.success__button').addEventListener('click', onCloseButtonClick);
};

const onError = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  cloneTemplate('error');
  document.addEventListener('keydown', onDocumentKeydownModal);
  document.addEventListener('click', onOutsideClick);
  document.querySelector('.error__button').addEventListener('click', onCloseButtonClick);
};

document.querySelector('.img-upload__input').addEventListener('change', (evt) => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  document.querySelector('.img-upload__cancel').addEventListener('click', onCloseButtonClick);
  addScaleListeners();

  const image = URL.createObjectURL(evt.target.files[0]);
  imgUploadPreviewImg.src = image;
  const children = document.querySelector('.effects__list').children;
  for (const child of children) {
    child.querySelector('.effects__preview').style.backgroundImage = `url("${image}")`;
  }
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  imgUploadPreviewImg.style.filter = '';
  imgUploadPreviewImg.style.transform = '';
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  const requestBody = new FormData(evt.target);
  if (isValid) {
    const submitButton = form.querySelector('.img-upload__submit');
    submitButton.disabled = true;
    sendData(requestBody, onSuccess, onError)
      .finally(() => {
        submitButton.disabled = false;
      });
  }
});
