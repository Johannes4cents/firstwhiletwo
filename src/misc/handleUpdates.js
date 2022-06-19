import { checkTimeDiff, dateToTimestamp } from "./helperFuncs";

function handleTimecheck(lastUpdates, setLastUpdates, cat, newTimestamp) {
  let newUpdates = {
    ...lastUpdates,
    [cat]: { ...lastUpdates[cat], timestamp: newTimestamp },
  };
  setLastUpdates(newUpdates);
}

function updateTimeCheck(cat, minDiff, setLastUpdates) {
  const lastUpdates = JSON.parse(localStorage.getItem("lastUpdates")) ?? {
    info: {},
    votes: {},
  };
  let newTimestamp = dateToTimestamp(new Date());
  const oldTimestamp = lastUpdates[cat].timestamp;
  if (oldTimestamp != null) {
    let timeDiff = checkTimeDiff(oldTimestamp, newTimestamp);
    if (timeDiff > minDiff) {
      handleTimecheck(lastUpdates, setLastUpdates, cat, newTimestamp);
      return true;
    } else return false;
  } else {
    handleTimecheck(lastUpdates, setLastUpdates, cat, newTimestamp);
    return true;
  }
}

export { updateTimeCheck };
