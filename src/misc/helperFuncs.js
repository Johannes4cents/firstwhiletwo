function getRandomId() {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let randomId = "";
  for (let i = 0; i < 14; i++) {
    let c = chars[Math.floor(Math.random() * chars.length)];
    randomId += c;
  }
  return randomId;
}

function getItemFromList(list, identifier, value, toLowerCase = false) {
  if (toLowerCase) return list.find((i) => i[identifier] == value);
  else
    return list.find((i) => i[identifier].toLowerCase() == value.toLowerCase());
}

function showImagePreviewWithFileReader(file, target) {
  var fr = new FileReader();
  if (file != null) {
    fr.readAsDataURL(file);
  }

  fr.onload = function (e) {
    var image = this.result ?? "/images/drawable/icon_description.png";
    target.src = image;
  };
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomItem(list) {
  return list[getRandomNumber(0, list.length - 1)];
}

function checkTimeDiff(older, newer) {
  function yearsToMinutes(years) {
    return years * 525600;
  }

  function monthsToMinutes(months) {
    return months * 43800;
  }

  function daysToMinutes(days) {
    return days * 1440;
  }

  function hoursToMinutes(hours) {
    return hours * 60;
  }

  function secondsToMinutes(seconds) {
    return seconds * 0.016;
  }

  return (
    yearsToMinutes(newer.year - older.year) +
    monthsToMinutes(newer.month - older.month) +
    daysToMinutes(newer.day - older.day) +
    hoursToMinutes(newer.hour - older.hour) +
    (newer.minute - older.minute) +
    secondsToMinutes(newer.second - older.second)
  );
}

function minutesToSeconds(minutes) {
  return minutes / 0.016;
}

function msTimeToTimestamp(msTime) {
  return dateToTimestamp(new Date(msTime));
}

function dateToTimestamp(date) {
  const dateArray = date.toString().split(" ");

  const monthObj = {
    January: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };
  const clockTime = dateArray[4].split(":");
  const resultArray = [
    Number(dateArray[3]),
    monthObj[dateArray[1]],
    Number(dateArray[2]),
  ].concat(clockTime.map((string) => Number(string)));

  const resultObject = {
    year: resultArray[0],
    month: resultArray[1],
    day: resultArray[2],
    hour: resultArray[3],
    minute: resultArray[4],
    second: resultArray[5],
    timezone: dateArray[5],
    msTime: date.getTime(),
  };

  return resultObject;
}

function timestampToChatDate(timestamp) {
  const currentTimeStamp = dateToTimestamp(new Date());
  var dateString = "";
  var todayString = "";
  if (
    (timestamp.year =
      currentTimeStamp.year && timestamp.month == currentTimeStamp.month)
  ) {
    if (timestamp.day == currentTimeStamp.day) {
      todayString = "today at ";
    } else if (currentTimeStamp.day - timestamp.day < 2)
      todayString = "yesterday at ";

    dateString = todayString + timestamp.hour + ":" + timestamp.minute;
  } else
    dateString =
      timestamp.day.toString() +
      "/" +
      timestamp.month.toString() +
      "/" +
      timestamp.year.toString();

  return dateString;
}

function makeMousePositionObj(e) {
  return { x: e.clientX, y: e.clientY };
}

function doAfterTimeDiffCheck(uid, timestampName, func, intervalInSeconds) {
  let oldTimestamp = JSON.parse(localStorage.getItem(uid + timestampName));
  if (oldTimestamp == null) {
    const timestamp = dateToTimestamp(new Date());
    localStorage.setItem(uid + timestampName, JSON.stringify(timestamp));
    func();
  } else {
    const newTimestamp = dateToTimestamp(new Date());
    const timeDiff = minutesToSeconds(
      checkTimeDiff(oldTimestamp, newTimestamp)
    );
    if (timeDiff >= intervalInSeconds) {
      localStorage.setItem(uid + timestampName, JSON.stringify(newTimestamp));
      func();
    }
  }
}

function newTrim(string) {
  return string
    .replace(/[^a-zA-Z ]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim()
    .toLowerCase();
}

function testChance(chance, maxChance) {
  let randomNumber = Math.floor(Math.random() * (maxChance + 1));
  return randomNumber < chance;
}

function makeDescriptionField(
  text,
  textSize,
  width,
  flex,
  identifier,
  hidden = false
) {
  return {
    text,
    textSize: textSize ?? "11px",
    width,
    flex,
    identifier: identifier ?? text,
    hidden,
  };
}
function umlautFix(char) {
  if (
    ![
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "ä",
      "ö",
      "ü",
    ].includes(char.toLowerCase())
  )
    return null;
  if (!["ä", "ö", "ü"].includes(char)) return char;
  if (char == "ö") return "o";
  if (char == "ä") return "a";
  if (char == "ü") return "u";
}

function forArrayLength(array, func) {
  for (let i = 0; i < array.length; i++) {
    func(array[i]);
  }
}

function objectToArray(object) {
  const keys = Object.keys(object);
  const values = Object.values(object);
  return keys.map((key, index) => {
    return { key, value: values[index] };
  });
}

function updateItemInStorageAndState(uid, collection, item, setState) {
  const idList = [];
  let localList = JSON.parse(localStorage.getItem(uid + collection));
  localList.forEach((i) => idList.push(i.id));
  const index = idList.indexOf(item.id);

  let newList = [...localList];
  newList[index] = item;
  setState(uid, newList);
}

function checkIfListsTheSame(listOne, listTwo) {
  var theSame = true;
  listOne.forEach((i) => {
    if (!listTwo.includes(i)) theSame = false;
    return false;
  });
  listTwo.forEach((i) => {
    if (!listOne.includes(i)) theSame = false;
    return false;
  });

  return theSame;
}

function objectsListToIdList(objects) {
  let idList = [];
  objects.forEach((o) => idList.push(o.id));
  return idList;
}

function idListToOjectsList(ids, list) {
  return ids.map((id) => getItemById(id, list));
}

function getItemById(id, list) {
  return list.find((i) => i.id == id);
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getNumberInBetweenRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function timeToMs(seconds = 0, minutes = 0, hours = 0, days = 0) {
  return seconds * 1000 + minutes * 60000 + hours * 3600000 + days * 8640000;
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function clickThroughIndex(list, currentItem, upDown, identifier) {
  let itemIndex = identifier
    ? list.map((i) => i[identifier]).indexOf(currentItem[identifier])
    : list.indexOf(currentItem);
  var index = Math.abs((itemIndex + upDown) % list.length);
  if (itemIndex + upDown < 0) index = list.length - 1;
  return index;
}

export {
  clickThroughIndex,
  clamp,
  makeDescriptionField,
  timeToMs,
  getNumberInBetweenRange,
  capitalize,
  objectsListToIdList,
  idListToOjectsList,
  checkIfListsTheSame,
  newTrim,
  getRandomNumber,
  makeMousePositionObj,
  timestampToChatDate,
  getRandomId,
  getItemFromList,
  getItemById,
  showImagePreviewWithFileReader,
  dateToTimestamp,
  checkTimeDiff,
  doAfterTimeDiffCheck,
  minutesToSeconds,
  testChance,
  umlautFix,
  forArrayLength,
  objectToArray,
  updateItemInStorageAndState,
  msTimeToTimestamp,
  getRandomItem,
};
