import React from "react";
import changeInfoObject from "../fixStuff/changeInfoObject";
import {
  getCollectionFromUserFirestore,
  getGeneralList,
} from "../misc/handleFirestore";
import listsStore from "../stores/listsStore";

const useFillStatesOnEnter = () => {
  const { setMyStrains, setActiveStrains, setStrainWords } = listsStore();

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
  }

  return fillStates;
};

export default useFillStatesOnEnter;
