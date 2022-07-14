import { doc, onSnapshot } from "@firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import db from "../firebase/fireInit";
import { getDocListener } from "../misc/handleFirestore";
import listsStore from "../stores/listsStore";
import userStore from "../stores/userStore";

const useGeneralListListener = () => {
  const { setFireFlags, setTurfChats, setOtherUser, setAllStrains } =
    listsStore();
  const { info, loggedIn } = userStore();

  useEffect(() => {
    var unsubscribe = () => {};

    if (info && loggedIn) {
      const docRef = doc(db, "general", "lists");
      unsubscribe = onSnapshot(docRef, (d) => {
        const lists = d.data();
        console.log("docs updated", lists);
        setFireFlags(info.uid, lists["fireFlags"]);
        setTurfChats(lists["turfChats"]);
        setOtherUser(info.uid, lists["userList"]);
        setAllStrains(info.uid, lists["strainList"]);
      });
    } else {
      unsubscribe();
    }

    return () => unsubscribe();
  }, [info]);

  return <div>useGeneralListListener</div>;
};

export default useGeneralListListener;
