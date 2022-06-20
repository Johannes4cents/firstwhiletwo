import React from "react";
import changeInfoObject from "../fixStuff/changeInfoObject";
import {
  getCollectionFromUserFirestore,
  getGeneralList,
  getFireItems,
  getCustomUserList,
} from "../misc/handleFirestore";
import listsStore from "../stores/listsStore";
import miscStore from "../stores/miscStore";
import readStore from "../stores/readStore";

const useFillStatesOnEnter = () => {
  const { setMyStrains, setActiveStrains, setStrainWords, setLoot } =
    listsStore();
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
    if (localList != null) setFunc(uid, localList);
  }

  function generalListToState(listName, onRetrievedFunc) {
    getGeneralList(listName, onRetrievedFunc);
  }

  function fillStates(uid) {
    getCollectionFromUser(uid, "myStrains", setMyStrains);
    storageListToState(uid, "activeStrains", setActiveStrains);
    storageListToState(uid, "scannedMessages", setScannedMessages);
    generalListToState("strainWords", setStrainWords);
    getListFromUser(uid, "loot", setLoot);

    // fireItems
    let fireitems = JSON.parse(localStorage.getItem(uid + "fireItems"));
    getFireItems(fireitems, uid, setFireItems);
  }

  return fillStates;
};

export default useFillStatesOnEnter;
