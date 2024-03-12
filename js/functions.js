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

const isMeetingInWorkingHours = (workDayStart, workDayEnd, meetingStart, meetingTime) => {
  const MINUTES_IN_HOUR = 60;
  const workDayStartAsArray = workDayStart.split(':');
  const workDayEndAsArray = workDayEnd.split(':');
  const meetingStartAsArray = meetingStart.split(':');
  const workDayStartHour = parseInt(workDayStartAsArray[0], 10);
  const workDayStartMinute = parseInt(workDayStartAsArray[1], 10);
  const workDayEndHour = parseInt(workDayEndAsArray[0], 10);
  const workDayEndMinute = parseInt(workDayEndAsArray[1], 10);
  const meetingStartHour = parseInt(meetingStartAsArray[0], 10);
  const meetingStartMinute = parseInt(meetingStartAsArray[1], 10);
  const timeUntilDayEndInHours = (workDayEndHour - meetingStartHour) + ((workDayEndMinute - meetingStartMinute) / MINUTES_IN_HOUR);
  const meetingTimeInHours = meetingTime / MINUTES_IN_HOUR;

  return meetingStartHour >= workDayStartHour && meetingStartHour <= workDayEndHour && meetingStartMinute >= workDayStartMinute && meetingStartMinute <= workDayEndMinute && meetingTimeInHours <= timeUntilDayEndInHours;
};

isMeetingInWorkingHours('08:00', '17:30', '14:00', 90);
isMeetingInWorkingHours('8:0', '10:0', '8:0', 120);
isMeetingInWorkingHours('08:00', '14:30', '14:00', 90);
isMeetingInWorkingHours('14:00', '17:30', '08:0', 90);
isMeetingInWorkingHours('8:00', '17:30', '08:00', 900);
