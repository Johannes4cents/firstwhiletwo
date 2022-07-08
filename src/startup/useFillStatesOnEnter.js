import React from "react";
import {
  getCollectionFromUserFirestore,
  getCustomUserList,
  getUserLoot,
  getGeneralStuff,
  getBaseCollection,
  getUserListsOnStartUp,
  fireAnswersToExtended,
} from "../misc/handleFirestore";
import { updateTimeCheck } from "../misc/handleUpdates";
import listsStore from "../stores/listsStore";
import miscStore from "../stores/miscStore";
import readStore from "../stores/readStore";
import settingsStore from "../stores/settingsStore";
import userStore from "../stores/userStore";

const useFillStatesOnEnter = () => {
  const {
    setMyStrains,
    setActiveStrains,
    setLoot,
    setAllStrains,
    setMyMedia,
    setUserComparissons,
    fireFlags,
  } = listsStore();

  const { setMinMaxUpvotes, setShowPeople } = settingsStore();
  const { setLastUpdates } = miscStore();
  const { setFireStuff, setScannedMessages } = readStore();
  const { setMediaFolder, setAnswers, setSavedChats } = userStore();

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
    getUserListsOnStartUp(uid, [
      { list: "myStrains", set: setMyStrains },
      { list: "myMedia", set: setMyMedia },
    ]);
    storageListToState(uid, "activeStrains", setActiveStrains);
    storageListToState(uid, "scannedMessages", setScannedMessages);
    storageListToState(uid, "mediaFolder", setMediaFolder);
    storageListToState(uid, "minMaxMsgUpvotes", setMinMaxUpvotes);
    storageListToState(uid, "userComparissons", setUserComparissons);
    storageListToState(uid, "savedChats", setSavedChats);

    // loot
    let loot = JSON.parse(localStorage.getItem(uid + "loot"));
    if (loot != null && loot != undefined) setLoot(uid, loot);
    else
      getUserLoot(uid, (list) => {
        setLoot(uid, list);
      });

    // myAnswers
    let localAnswers = JSON.parse(localStorage.getItem(uid + "myAnswers"));
    if (localAnswers) setAnswers(uid, localAnswers);
    else {
      fireAnswersToExtended(uid, setAnswers);
    }

    // generalStuff
    let fireitems = JSON.parse(localStorage.getItem(uid + "fireItems"));
    getGeneralStuff(fireitems, uid, setFireStuff, setAllStrains);

    //
    let showPeopleFilter = JSON.parse(localStorage.getItem(uid + "showPeople"));
    if (showPeopleFilter) setShowPeople(showPeopleFilter);
  }

  return fillStates;
};

export default useFillStatesOnEnter;
