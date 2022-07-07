import { doc, onSnapshot } from "@firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import db from "../firebase/fireInit";
import { getDocListener } from "../misc/handleFirestore";
import listsStore from "../stores/listsStore";
import userStore from "../stores/userStore";

const useGeneralListListener = () => {
  const [unsubscribe, setUnsubscribe] = useState(null);
  const { setFireFlags } = listsStore();
  const { info, loggedIn } = userStore();

  useEffect(() => {
    var listener = () => {};

    if (info && loggedIn) {
      const docRef = doc(db, "general", "lists");
      listener = onSnapshot(docRef, (d) => {
        console.log("doc - ", d);
        const lists = d.data();
        setFireFlags(info.uid, lists["fireFlags"]);
      });
      setUnsubscribe(listener);
    } else {
      if (unsubscribe) unsubscribe();
    }

    return () => {
      listener();
    };
  }, [info]);
  return <div>useGeneralListListener</div>;
};

export default useGeneralListListener;
