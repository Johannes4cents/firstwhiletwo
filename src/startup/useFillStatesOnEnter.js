import React from "react";
import changeInfoObject from "../fixStuff/changeInfoObject";
import {
  getCollectionFromUserFirestore,
  getGeneralList,
  getFireItems,
} from "../misc/handleFirestore";
import listsStore from "../stores/listsStore";
import miscStore from "../stores/miscStore";
import readStore from "../stores/readStore";

const useFillStatesOnEnter = () => {
  const { setMyStrains, setActiveStrains, setStrainWords } = listsStore();
  const { setLastUpdates } = miscStore();
  const { setFireItems } = readStore();

  function getListFromUser(uid, collection, setFunc) {
    const localList = JSON.parse(localStorage.getItem(uid + collection));
    if (localList != null) {
      setFunc(uid, localList);
    } else {
      getCollectionFromUserFirestore(uid, collection, (list) => {
        setFunc(uid, list);
      });
    }
  }

  function storageListToState(uid, list, setFunc) {
    let localList = JSON.parse(localStorage.getItem(uid + list));
    if (localList != null) setFunc(localList);
  }

  function generalListToState(listName, onRetrievedFunc) {
    getGeneralList(listName, onRetrievedFunc);
  }

  function fillStates(uid) {
    getListFromUser(uid, "myStrains", setMyStrains);
    storageListToState(uid, "activeStrains", setActiveStrains);
    generalListToState("strainWords", setStrainWords);

    // fireItems
    let fireitems = JSON.parse(localStorage.getItem(uid + "fireItems"));
    getFireItems(fireitems, uid, setFireItems);
  }

  return fillStates;
};

export default useFillStatesOnEnter;
