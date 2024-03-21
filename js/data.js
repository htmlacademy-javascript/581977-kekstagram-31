import {getRandomInteger, getRandomArrayElement, createIdFromRangeGenerator} from './utils.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Андрей',
  'Антон',
  'Виктория',
  'Екатерина',
  'Илья',
  'Мария'
];
const DESCRIPTIONS = [
  'Поздравьте меня с первым постом!',
  'Привет, подписчики!',
  'Жду много лайков...',
  'Клики 2 раза по фотке и получишь мое уважение)',
  'Очередной пост про меня :)',
  'Завтра будет новый пост.'
];
const PHOTOS_MIN_AMOUNT = 1;
const PHOTOS_MAX_AMOUNT = 25;
const LIKES_MIN_AMOUNT = 15;
const LIKES_MAX_AMOUNT = 200;
const COMMENTS_MIN_AMOUNT = 0;
const COMMENTS_MAX_AMOUNT = 30;
const MESSAGES_STRINGS_MIN_AMOUNT = 1;
const MESSAGES_STRINGS_MAX_AMOUNT = 2;
const AVATARS_FROM_NUMBER = 1;
const AVATARS_TO_NUMBER = 6;
const ALL_PHOTOS_COUNT = 25;
const generatePhotoId = createIdFromRangeGenerator(PHOTOS_MIN_AMOUNT, PHOTOS_MAX_AMOUNT);
const generateUrlId = createIdFromRangeGenerator(PHOTOS_MIN_AMOUNT, PHOTOS_MAX_AMOUNT);
const generateCommentId = createIdFromRangeGenerator();

const generateMessage = () => {
  const messageStringsAmount = getRandomInteger(MESSAGES_STRINGS_MIN_AMOUNT, MESSAGES_STRINGS_MAX_AMOUNT);
  let message = '';
  for (let i = 0; i < messageStringsAmount; i++) {
    message += `${getRandomArrayElement(MESSAGES)} `;
  }
  return message.trim();
};

const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AVATARS_FROM_NUMBER, AVATARS_TO_NUMBER)}.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(NAMES),
});

const generatePostedPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN_AMOUNT, LIKES_MAX_AMOUNT),
  comments: Array.from({length: getRandomInteger(COMMENTS_MIN_AMOUNT, COMMENTS_MAX_AMOUNT)}, generateComment)
});

const allPostedPhotos = Array.from({length: ALL_PHOTOS_COUNT}, generatePostedPhoto);

export {allPostedPhotos};
