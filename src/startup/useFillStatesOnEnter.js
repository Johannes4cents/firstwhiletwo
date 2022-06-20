import React from "react";
import changeInfoObject from "../fixStuff/changeInfoObject";
import {
  getCollectionFromUserFirestore,
  getGeneralList,
  getCustomUserList,
  getUserLoot,
  getFireItems,
} from "../misc/handleFirestore";
import listsStore from "../stores/listsStore";
import miscStore from "../stores/miscStore";
import readStore from "../stores/readStore";
import settingsStore from "../stores/settingsStore";

const useFillStatesOnEnter = () => {
  const { setMyStrains, setActiveStrains, setStrainWords, setLoot } =
    listsStore();
  const { setMinMaxUpvotes, setShowPeople } = settingsStore();
  const { setLastUpdates } = miscStore();
  const { setFireItems, setScannedMessages } = readStore();

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

  function generalListToState(listName, onRetrievedFunc) {
    getGeneralList(listName, onRetrievedFunc);
  }

  function fillStates(uid) {
    getCollectionFromUser(uid, "myStrains", setMyStrains);
    storageListToState(uid, "activeStrains", setActiveStrains);
    storageListToState(uid, "scannedMessages", setScannedMessages);
    storageListToState(uid, "minMaxMsgUpvotes", setMinMaxUpvotes);
    generalListToState("strainWords", setStrainWords);

    // loot
    let loot = JSON.parse(localStorage.getItem(uid + "loot"));
    if (loot != null && loot != undefined) setLoot(uid, loot);
    else
      getUserLoot(uid, (list) => {
        setLoot(uid, list);
      });

    // fireItems
    let fireitems = JSON.parse(localStorage.getItem(uid + "fireItems"));
    getFireItems(fireitems, uid, setFireItems);

    //
    let showPeopleFilter = JSON.parse(localStorage.getItem(uid + "showPeople"));
    if (showPeopleFilter) setShowPeople(showPeopleFilter);
  }

  return fillStates;
};

export default useFillStatesOnEnter;
