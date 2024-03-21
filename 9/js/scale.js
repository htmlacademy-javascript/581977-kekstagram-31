const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
const imageUploadScale = document.querySelector('.img-upload__scale');
const scaleControlSmaller = imageUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imageUploadScale.querySelector('.scale__control--bigger');
const scaleControlValue = imageUploadScale.querySelector('.scale__control--value');
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleControlSmallerHandler = () => {
  if (parseInt(scaleControlValue.value, 10) > SCALE_MIN) {
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - SCALE_STEP}%`;
    imgUploadPreviewImg.style.transform = `scale(${parseInt(scaleControlValue.value, 10) / 100})`;
  }
};

const scaleControlBiggerHandler = () => {
  if (parseInt(scaleControlValue.value, 10) < SCALE_MAX) {
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + SCALE_STEP}%`;
    imgUploadPreviewImg.style.transform = `scale(${parseInt(scaleControlValue.value, 10) / 100})`;
  }
};

const addScaleListeners = () => {
  scaleControlSmaller.addEventListener('click', scaleControlSmallerHandler);
  scaleControlBigger.addEventListener('click', scaleControlBiggerHandler);
};

const removeScaleListeners = () => {
  scaleControlSmaller.removeEventListener('click', scaleControlSmallerHandler);
  scaleControlBigger.removeEventListener('click', scaleControlBiggerHandler);
};

export {addScaleListeners, removeScaleListeners};
