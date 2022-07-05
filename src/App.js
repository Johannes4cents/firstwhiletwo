import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import ContextMenu from "./contextMenu/ContextMenu";
import DragCursor from "./contextMenu/DragCursor";
import HoverBox from "./contextMenu/HoverBox";
import useClearOnLogOut from "./startup/useClearOnLogOut";
import miscStore from "./stores/miscStore";
import userStore from "./stores/userStore";
import MainPage from "./sections/main/MainPage";
import useFillStatesOnEnter from "./startup/useFillStatesOnEnter";
import useListenToActiveStrains from "./hooks/useListenToActiveStrains";
import listsStore from "./stores/listsStore";
import chatStore from "./stores/chatStore";
import useCheckArraysForResTrigger from "./scanTexts/useCheckArraysForResTrigger";
import useScanChatMessages from "./scanTexts/useScanChatMessages";
import triggerStore from "./stores/triggerStore";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import useHandleUpdating from "./hooks/useHandleUpdating";
import ClickedImageContainer from "./misc/elements/ClickedImageContainer";

function App() {
  const { info, setInfo } = userStore();
  const { setDragCursor } = miscStore();
  const { activeStrains } = listsStore();
  const { loginTrigger } = triggerStore();
  const { displayedMessages } = chatStore();
  const { setActiveChat, setDisplayedMessages } = chatStore();
  const [subscriptions, setSubscriptions] = useState([]);
  const fillStorage = useFillStatesOnEnter();
  const clearOnLogOut = useClearOnLogOut();
  const handleUpdating = useHandleUpdating();

  const listenToChats = useListenToActiveStrains(
    subscriptions,
    setSubscriptions
  );

  useCheckArraysForResTrigger();
  useScanChatMessages();

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
    }
  }, []);

  useEffect(() => {
    let localInfo = JSON.parse(localStorage.getItem("info"));
    console.log("localInfo - ", localInfo);
    if (localInfo != null) {
      fillStorage(localInfo.uid);
    } else {
      clearOnLogOut();
    }
  }, [triggerStore]);

  return (
    <div className="App" onMouseUp={() => setDragCursor(null)}>
      <ClickedImageContainer />
      <ToastContainer />
      <ContextMenu />
      <HoverBox />
      <DragCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
