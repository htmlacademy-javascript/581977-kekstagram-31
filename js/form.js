import {addEffectsListener, removeEffectsListener} from './effects.js';
import {addScaleListeners, removeScaleListeners} from './scale.js';
import {pristine} from './validators.js';
import {sendData} from './api.js';
import {cloneTemplate} from './utils.js';

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const imgUploadPreviewImgElement = document.querySelector('.img-upload__preview img');
const imgUploadCancelElement = document.querySelector('.img-upload__cancel');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');

const resetSettings = () => {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onOutsideClick);
  imgUploadCancelElement.removeEventListener('click', onCloseButtonClick);
  formElement.removeEventListener('submit', onSubmitForm);
  removeScaleListeners();
  removeEffectsListener();
  if (bodyElement.contains(document.querySelector('.success'))) {
    document.querySelector('.success').remove();
  }
  pristine.reset();
  formElement.reset();
};

const resetErrorSettings = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onDocumentKeydownModal);
  document.removeEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  const hashtagsElement = formElement.querySelector('.text__hashtags');
  const descriptionElement = formElement.querySelector('.text__description');
  if (evt.key === 'Escape' && document.activeElement !== hashtagsElement && document.activeElement !== descriptionElement) {
    evt.preventDefault();
    resetSettings();
  }
}

function onDocumentKeydownModal (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    resetErrorSettings();
  }
}

function onOutsideClick (evt) {
  if (evt.target === document.querySelector('.success')) {
    document.querySelector('.success').remove();
    resetSettings();
  } else if (evt.target === document.querySelector('.error')) {
    resetErrorSettings();
  }
}

function onCloseButtonClick (evt) {
  if (evt.target === document.querySelector('.success__button')) {
    document.querySelector('.success').remove();
    resetSettings();
  } else if (evt.target === document.querySelector('.error__button')) {
    resetErrorSettings();
  } else {
    resetSettings();
  }
}

const onSuccess = () => {
  bodyElement.classList.remove('modal-open');
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

function onSubmitForm(evt) {
  evt.preventDefault();
  const isValid = pristine.validate();
  const requestBody = new FormData(evt.target);
  if (isValid) {
    const submitButtonElement = formElement.querySelector('.img-upload__submit');
    submitButtonElement.disabled = true;
    sendData(requestBody, onSuccess, onError)
      .finally(() => {
        submitButtonElement.disabled = false;
      });
  }
}

document.querySelector('.img-upload__input').addEventListener('change', (evt) => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadCancelElement.addEventListener('click', onCloseButtonClick);
  formElement.addEventListener('submit', onSubmitForm);
  addScaleListeners();
  addEffectsListener();

  const image = URL.createObjectURL(evt.target.files[0]);
  imgUploadPreviewImgElement.src = image;
  const children = document.querySelector('.effects__list').children;
  for (const child of children) {
    child.querySelector('.effects__preview').style.backgroundImage = `url("${image}")`;
  }
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  imgUploadPreviewImgElement.style.filter = '';
  imgUploadPreviewImgElement.style.transform = '';
});
