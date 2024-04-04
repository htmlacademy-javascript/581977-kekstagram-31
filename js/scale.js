const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DIVIDER = 100;

const imgUploadPreviewImgElement = document.querySelector('.img-upload__preview img');
const imageUploadScaleElement = document.querySelector('.img-upload__scale');
const scaleControlSmallerElement = imageUploadScaleElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = imageUploadScaleElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = imageUploadScaleElement.querySelector('.scale__control--value');

const onSetScaleControlSmaller = () => {
  if (parseInt(scaleControlValueElement.value, 10) > SCALE_MIN) {
    scaleControlValueElement.value = `${parseInt(scaleControlValueElement.value, 10) - SCALE_STEP}%`;
    imgUploadPreviewImgElement.style.transform = `scale(${parseInt(scaleControlValueElement.value, 10) / DIVIDER})`;
  }
};

const onSetScaleControlBigger = () => {
  if (parseInt(scaleControlValueElement.value, 10) < SCALE_MAX) {
    scaleControlValueElement.value = `${parseInt(scaleControlValueElement.value, 10) + SCALE_STEP}%`;
    imgUploadPreviewImgElement.style.transform = `scale(${parseInt(scaleControlValueElement.value, 10) / DIVIDER})`;
  }
};

const addScaleListeners = () => {
  scaleControlSmallerElement.addEventListener('click', onSetScaleControlSmaller);
  scaleControlBiggerElement.addEventListener('click', onSetScaleControlBigger);
};

const removeScaleListeners = () => {
  scaleControlSmallerElement.removeEventListener('click', onSetScaleControlSmaller);
  scaleControlBiggerElement.removeEventListener('click', onSetScaleControlBigger);
};

export {addScaleListeners, removeScaleListeners};
