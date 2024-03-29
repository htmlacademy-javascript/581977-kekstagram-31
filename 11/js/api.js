import {cloneTemplate} from './utils.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const errorMessageHandler = () => {
  cloneTemplate('data-error');
  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, 5000);
};

const getData = () => fetch(`${BASE_URL}/data`)
  .then((response) => response.json())
  .catch(errorMessageHandler);

const sendData = (body, onSuccess, onError) => fetch(`${BASE_URL}/`, {method: 'POST', body: body})
  .then((response) => response.ok ? onSuccess() : onError())
  .catch(() => onError());

export {getData, sendData};
