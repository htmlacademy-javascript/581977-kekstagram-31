const EFFECTS = {
  'chrome': {
    'min': 0,
    'max': 1,
    'step': 0.1
  },
  'sepia': {
    'min': 0,
    'max': 1,
    'step': 0.1
  },
  'marvin': {
    'min': 0,
    'max': 100,
    'step': 1
  },
  'phobos': {
    'min': 0,
    'max': 3,
    'step': 0.1
  },
  'heat': {
    'min': 1,
    'max': 3,
    'step': 0.1
  },
  'none': {
    'min': 0,
    'max': 0,
    'step': 0
  }
};

const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
let currentEffect = 'none';

const changeEffect = (effect, levelOfIntensity) => {
  switch (effect) {
    case 'chrome':
      imgUploadPreviewImg.style.filter = `grayscale(${levelOfIntensity})`;
      break;
    case 'sepia':
      imgUploadPreviewImg.style.filter = `sepia(${levelOfIntensity})`;
      break;
    case 'marvin':
      imgUploadPreviewImg.style.filter = `invert(${levelOfIntensity}%)`;
      break;
    case 'phobos':
      imgUploadPreviewImg.style.filter = `blur(${levelOfIntensity}px)`;
      break;
    case 'heat':
      imgUploadPreviewImg.style.filter = `brightness(${levelOfIntensity})`;
      break;
    case 'none':
      imgUploadPreviewImg.style.filter = '';
  }
};

noUiSlider.create(sliderElement, {
  range: {
    min: EFFECTS.none.min,
    max: EFFECTS.none.max,
  },
  start: EFFECTS.none.max,
  step: EFFECTS.none.step,
  connect: 'lower'
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
  changeEffect(currentEffect, valueElement.value);
});

document.querySelector('.effects__list').addEventListener('click', (evt) => {
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
      connect: 'lower'
    });
  }
});
