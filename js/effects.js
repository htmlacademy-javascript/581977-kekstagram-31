const EFFECTS = {
  'chrome': {'min': 0, 'max': 1, 'step': 0.1},
  'sepia': {'min': 0, 'max': 1, 'step': 0.1},
  'marvin': {'min': 0, 'max': 100, 'step': 1},
  'phobos': {'min': 0, 'max': 3, 'step': 0.1},
  'heat': {'min': 1, 'max': 3, 'step': 0.1},
  'none': {'min': 0, 'max': 0, 'step': 0}
};

const imgUploadPreviewImgElement = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const effectsListElement = document.querySelector('.effects__list');
let currentEffect = 'none';

const changeEffect = (effect, levelOfIntensity) => {
  switch (effect) {
    case 'chrome':
      imgUploadPreviewImgElement.style.filter = `grayscale(${levelOfIntensity})`;
      break;
    case 'sepia':
      imgUploadPreviewImgElement.style.filter = `sepia(${levelOfIntensity})`;
      break;
    case 'marvin':
      imgUploadPreviewImgElement.style.filter = `invert(${levelOfIntensity}%)`;
      break;
    case 'phobos':
      imgUploadPreviewImgElement.style.filter = `blur(${levelOfIntensity}px)`;
      break;
    case 'heat':
      imgUploadPreviewImgElement.style.filter = `brightness(${levelOfIntensity})`;
      break;
    case 'none':
      imgUploadPreviewImgElement.style.filter = '';
      break;
  }
};

noUiSlider.create(sliderElement, {
  range: {
    min: EFFECTS.none.min,
    max: EFFECTS.none.max,
  },
  start: EFFECTS.none.max,
  step: EFFECTS.none.step,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
  changeEffect(currentEffect, valueElement.value);
});

const onEffectsClick = (evt) => {
  evt.preventDefault();
  const currentElement = evt.target.closest('.effects__item');
  if (currentElement) {
    const currentElementInput = currentElement.querySelector('input');
    if (currentElementInput.hasAttribute('checked')) {
      document.querySelector('.img-upload__effect-level').classList.add('hidden');
    } else {
      document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    }
    currentEffect = currentElementInput.value;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: EFFECTS[currentEffect].min,
        max: EFFECTS[currentEffect].max,
      },
      start: EFFECTS[currentEffect].max,
      step: EFFECTS[currentEffect].step,
    });
  }
};

const addEffectsListener = () => {
  effectsListElement.addEventListener('click', onEffectsClick);
};

const removeEffectsListener = () => {
  effectsListElement.removeEventListener('click', onEffectsClick);
};

export {addEffectsListener, removeEffectsListener};
