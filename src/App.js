import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ContextMenu from "./contextMenu/ContextMenu";
import DragCursor from "./contextMenu/DragCursor";
import HoverBox from "./contextMenu/HoverBox";
import SignInBar from "./sections/topBar/SignInBar";
import useClearOnLogOut from "./startup/useClearOnLogOut";
import miscStore from "./stores/miscStore";
import userStore from "./stores/userStore";
import MakeFlagsPage from "./AdminStuff/AdminMakeFlags/MakeFlagsPage";
import MainPage from "./sections/main/MainPage";
import useFillStatesOnEnter from "./startup/useFillStatesOnEnter";
import useListenToActiveStrains from "./hooks/useListenToActiveStrains";
import listsStore from "./stores/listsStore";
import chatStore from "./stores/chatStore";
import changeInfoObject from "./fixStuff/changeInfoObject";
import { checkMessagesForUpdate } from "./chat/handleChat";
import useCheckArraysForResTrigger from "./scanTexts/useCheckArraysForResTrigger";

function App() {
  const { info, setInfo } = userStore();
  const { setDragCursor } = miscStore();
  const { activeStrains } = listsStore();
  const { displayedMessages } = chatStore();
  const { setActiveChat, setDisplayedMessages } = chatStore();
  const [subscriptions, setSubscriptions] = useState([]);
  const fillStorage = useFillStatesOnEnter();
  const clearOnLogOut = useClearOnLogOut();

  const listenToChats = useListenToActiveStrains(
    subscriptions,
    setSubscriptions
  );

  useCheckArraysForResTrigger();

  useEffect(() => {
    setInterval(() => {
      checkMessagesForUpdate(displayedMessages);
    }, 5000);
  }, []);

  useEffect(() => {
    var unsubscribe = () => {};
    if (activeStrains.length > 0) {
      unsubscribe = listenToChats();
    } else {
      for (let i = 0; i < subscriptions.length; i++) {
        const unsubscribe = subscriptions[i];
        unsubscribe();
        setDisplayedMessages([]);
      }
      setActiveChat(null);
    }
    return () => {
      unsubscribe();
    };
  }, [activeStrains]);

  useEffect(() => {
    document.title = "Firstwhile";
    const info = JSON.parse(localStorage.getItem("info"));
    if (info != null) {
      setInfo(info);
      changeInfoObject(info, setInfo);
    }
  }, []);

  useEffect(() => {
    let localInfo = JSON.parse(localStorage.getItem("info"));
    if (localInfo != null) {
      if (localInfo.loggedIn) {
        fillStorage(localInfo.uid);
      } else {
        clearOnLogOut();
      }
    } else {
      clearOnLogOut();
    }
  }, [info]);

  return (
    <div className="App" onMouseUp={() => setDragCursor(null)}>
      <ContextMenu />
      <HoverBox />
      <DragCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainPage />} />
          <Route path="/create_flags" element={<MakeFlagsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
