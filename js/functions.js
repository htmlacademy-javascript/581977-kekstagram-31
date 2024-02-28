function checkStringLength(string, length) {
  return string.length <= length;
}

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

function isPalindrome(string) {
  const stringBefore = string.toLowerCase().replaceAll(' ', '');
  const stringAfter = stringBefore.split('').reverse().join('');
  return stringBefore === stringAfter;
}

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

function getNumber(data) {
  let result = '';
  data = data.toString();
  for (let i = 0; i < data.length; i++) {
    if (!Number.isNaN(parseInt(data[i], 10))) {
      result += data[i];
    }
  }
  return parseInt(result, 10);
}

getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');
getNumber(2023);
getNumber(-1);
getNumber(1.5);
