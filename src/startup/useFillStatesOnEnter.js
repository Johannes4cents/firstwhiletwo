import React from "react";
import {
  getCollectionFromUserFirestore,
  getCustomUserList,
  getUserLoot,
  getGeneralStuff,
  getBaseCollection,
} from "../misc/handleFirestore";
import { updateTimeCheck } from "../misc/handleUpdates";
import listsStore from "../stores/listsStore";
import miscStore from "../stores/miscStore";
import readStore from "../stores/readStore";
import settingsStore from "../stores/settingsStore";

const useFillStatesOnEnter = () => {
  const {
    setMyStrains,
    setActiveStrains,
    setLoot,
    setFireFlags,
    setSuggestedStrains,
  } = listsStore();

  const { setMinMaxUpvotes, setShowPeople } = settingsStore();
  const { setLastUpdates } = miscStore();
  const { setFireStuff, setScannedMessages } = readStore();

  function getCollectionFromUser(uid, collection, setFunc) {
    const localList = JSON.parse(localStorage.getItem(uid + collection));
    if (localList != null) {
      setFunc(uid, localList);
    } else {
      getCollectionFromUserFirestore(uid, collection, (list) => {
        setFunc(uid, list);
      });
    }
  }

  function getMainCollection(uid, collection, setFunc, timecheck) {
    const localList = JSON.parse(localStorage.getItem(uid + collection)) ?? [];
    if (localList.length > 0) {
      if (timecheck && updateTimeCheck(collection, timecheck, setLastUpdates)) {
        getBaseCollection(collection, (list) => {
          setFunc(uid, list);
        });
      } else setFunc(uid, localList);
    } else {
      getBaseCollection(collection, (list) => {
        setFunc(uid, list);
      });
    }
  }

  function getListFromUser(uid, userList, setFunc) {
    const localList = JSON.parse(localStorage.getItem(uid + userList));
    console.log("localList - ", localList);
    if (localList != null) {
      setFunc(uid, localList);
    } else {
      getCustomUserList(uid, userList, (list) => {
        setFunc(uid, list);
      });
    }
  }

  function storageListToState(uid, list, setFunc) {
    let localList = JSON.parse(localStorage.getItem(uid + list));
    if (localList) setFunc(uid, localList);
  }

  function fillStates(uid) {
    getCollectionFromUser(uid, "myStrains", setMyStrains);
    storageListToState(uid, "activeStrains", setActiveStrains);
    storageListToState(uid, "scannedMessages", setScannedMessages);
    storageListToState(uid, "minMaxMsgUpvotes", setMinMaxUpvotes);
    getMainCollection(uid, "fireFlags", setFireFlags, 24 * 60);

    // loot
    let loot = JSON.parse(localStorage.getItem(uid + "loot"));
    if (loot != null && loot != undefined) setLoot(uid, loot);
    else
      getUserLoot(uid, (list) => {
        setLoot(uid, list);
      });

    // generalStuff
    let fireitems = JSON.parse(localStorage.getItem(uid + "fireItems"));
    getGeneralStuff(fireitems, uid, setFireStuff, setSuggestedStrains);

    //
    let showPeopleFilter = JSON.parse(localStorage.getItem(uid + "showPeople"));
    if (showPeopleFilter) setShowPeople(showPeopleFilter);
  }

  return fillStates;
};

export default useFillStatesOnEnter;
