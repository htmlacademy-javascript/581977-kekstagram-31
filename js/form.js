import './effects.js';
import {addScaleListeners, removeScaleListeners} from './scale.js';
import {addFocusListeners, validateForm} from './validators.js';

const form = document.querySelector('.img-upload__form');
const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
    removeScaleListeners();
    form.reset();
  }
};

const onCloseButtonClick = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('.img-upload__cancel').removeEventListener('click', onCloseButtonClick);
  removeScaleListeners();
  form.reset();
};

document.querySelector('.img-upload__input').addEventListener('change', () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  document.querySelector('.img-upload__cancel').addEventListener('click', onCloseButtonClick);

  addFocusListeners(onDocumentKeydown);
  addScaleListeners();

  imgUploadPreviewImg.src = 'img/upload-image.jpeg';
  const children = document.querySelector('.effects__list').children;
  for (const child of children) {
    child.querySelector('.effects__preview').style.backgroundImage = 'url("img/upload-image.jpeg")';
  }
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  imgUploadPreviewImg.style.filter = '';
  imgUploadPreviewImg.style.transform = '';
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  validateForm();
});
