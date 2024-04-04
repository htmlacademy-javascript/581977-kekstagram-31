import {cloneTemplate} from './utils.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const GET_DATA_ERROR_TIMEOUT = 5000;

const onGetDataError = () => {
  cloneTemplate('data-error');
  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, GET_DATA_ERROR_TIMEOUT);
};

const getData = () => fetch(`${BASE_URL}/data`)
  .then((response) => response.json())
  .catch(onGetDataError);

const sendData = (body, onSuccess, onError) => fetch(`${BASE_URL}/`, {method: 'POST', body: body})
  .then((response) => response.ok ? onSuccess() : onError())
  .catch(() => onError());

export {getData, sendData};
