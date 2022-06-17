import React, { useEffect } from "react";
import chatStore from "../stores/chatStore";
import readStore from "../stores/readStore";
import useTryStringForLoot from "./useTryStringForLoot";

const useScanChatMessages = () => {
  const { currentMessages } = chatStore();
  const scanString = useTryStringForLoot();
  const {
    scannedMessages,
    addScanArrays,
    scanArrays,
    scanningArrays,
    setScanningArrays,
  } = readStore();
  useEffect(() => {
    const messageArrays = [];
    const newAddedMessages = [];
    for (let i = 0; i < currentMessages.length; i++) {
      let msg = currentMessages[i];
      if (!scannedMessages.map((m) => m.message).includes(msg.id)) {
        messageArrays.push({
          msg: msg.id,
          array: msg.content.split(" ").map((s) => s.toLowerCase()),
          scanned: false,
        });
        newAddedMessages.push(msg.id);
      }
    }
    addScanArrays(messageArrays);
  }, [currentMessages]);

  useEffect(() => {
    if (!scanningArrays) {
    }
  }, [scanArrays]);
};

export default useScanChatMessages;
