import './effects.js';
import {addScaleListeners, removeScaleListeners} from './scale.js';
import {validateForm} from './validators.js';

const form = document.querySelector('.img-upload__form');
const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');

const resetSettings = (callback) => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', callback);
  removeScaleListeners();
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

const onCloseButtonClick = () => {
  resetSettings(onCloseButtonClick);
};

document.querySelector('.img-upload__input').addEventListener('change', (evt) => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
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
  validateForm();
});
