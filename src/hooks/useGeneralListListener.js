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
  const [unsub, setUnsub] = useState(null);

  useEffect(() => {
    var unsubscribe = () => {};

    if (loggedIn) {
      const docRef = doc(db, "general", "lists");
      unsubscribe = onSnapshot(docRef, (d) => {
        const lists = d.data();
        setFireFlags(info.uid, lists["fireFlags"]);
        setTurfChats(lists["turfChats"]);
        setOtherUser(info.uid, lists["userList"]);
        setAllStrains(info.uid, lists["strainList"]);
      });
      setUnsub(unsubscribe);
    } else {
      setUnsub((unsub) => {
        if (unsub) unsub();
        return null;
      });
    }

    return () => unsubscribe();
  }, [loggedIn]);

  return <div>useGeneralListListener</div>;
};

export default useGeneralListListener;
