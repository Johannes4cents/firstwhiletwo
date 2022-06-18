import React, { useEffect } from "react";
import { newTrim } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import readStore from "../stores/readStore";
import userStore from "../stores/userStore";
import useScanStringsInArray from "./useScanStringsInArray";
import useTryStringForLoot from "./useTryStringForLoot";

const useScanChatMessages = () => {
  const { displayedMessages } = chatStore();
  const { info } = userStore();
  const scanArray = useScanStringsInArray(onScanFinnished);
  const {
    scannedMessages,
    addScanArrays,
    scanArrays,
    scanningArrays,
    setScanningArrays,
    scanArraysIndex,
    increaseScanArraysIndex,
    addScannedMessages,
  } = readStore();

  useEffect(() => {
    const messageArrays = [];
    const newAddedMessages = [];
    for (let i = 0; i < displayedMessages.length; i++) {
      let msg = displayedMessages[i];
      if (!scannedMessages.map((m) => m.message).includes(msg.id)) {
        messageArrays.push({
          msg: msg.id,
          array: newTrim(msg.msg)
            .split(" ")
            .filter(
              (s) => s.length > 0 && s.length < 25 && s != "px" && s != "solid"
            ),
          scanned: false,
        });
        newAddedMessages.push(msg.id);
      }
    }
    if (messageArrays.length > 0) {
      addScanArrays(info.uid, messageArrays);
      addScannedMessages(info.uid, newAddedMessages);
    }
  }, [displayedMessages]);

  function onScanFinnished() {
    if (scanArraysIndex < scanArrays.length) {
      setTimeout(() => {
        increaseScanArraysIndex();
      }, 200);
    } else {
      setScanningArrays(false);
    }
  }

  useEffect(() => {
    if (scanArraysIndex != 0) {
      let arrayObj = scanArrays[scanArraysIndex];
      if (arrayObj != null) {
        if (arrayObj.array.length > 0) scanArray(arrayObj);
        else increaseScanArraysIndex();
      } else setScanningArrays(false);
    }
  }, [scanArraysIndex]);

  useEffect(() => {
    if (
      !scanningArrays &&
      scanArrays.length > 0 &&
      scanArrays.length > scanArraysIndex
    ) {
      setScanningArrays(true);
      scanArray(scanArrays[scanArraysIndex]);
    }
  }, [scanArrays]);
};

export default useScanChatMessages;
