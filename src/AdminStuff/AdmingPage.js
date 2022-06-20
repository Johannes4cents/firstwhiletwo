import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions, useStore } from "easy-peasy";

import AdminHandleGlobalWords from "./AdminHandleGlobalWords";
import AdminSingleClickOptionsBar from "./AdminSingleClickOptionsBar";
import AdminHandleActiveStorySps from "./AdminHandleActiveStorySps";
import AdminHandleCustom from "./AdminHandleCustom";
import AdminCreateFireItems from "./AdminLootStuff/AdminCreateFireItems";

const AdmingPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { info } = useStoreState((store) => store);
  const { setInfo, setLoggedIn } = useStoreActions((store) => store);
  const [expandedWords, setExpandedWords] = useState(false);
  const [expandedSps, setExpandedSps] = useState(false);
  const [expandedCustom, setExpandedCustom] = useState(false);
  const [expandedLoot, setExpandedLoot] = useState(false);

  useEffect(() => {
    if (info != null) {
      if (info.admin) setIsAdmin(true);
      else setIsAdmin(false);
    } else setIsAdmin(false);
  }, [info]);

  return (
    <div
      style={{
        marginTop: "20px",
        width: "100%",
        alignItems: "baseline",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isAdmin && (
        <div
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AdminSingleClickOptionsBar
            setInfo={setInfo}
            setLoggedIn={setLoggedIn}
          />
          <div className="divRow">
            <img
              className="icon25"
              src={
                expandedWords
                  ? "/images/drawable/icon_word.png"
                  : "/images/drawable/icon_word_unselected.png"
              }
              onClick={() => setExpandedWords(!expandedWords)}
            />
            <img
              className="icon25"
              style={{ marginLeft: "20px" }}
              src={
                expandedSps
                  ? "/images/drawable/icon_snippet_parts.png"
                  : "/images/drawable/icon_snippet_parts_unselected.png"
              }
              onClick={() => setExpandedSps(!expandedSps)}
            />

            <img
              className="icon25"
              style={{ marginLeft: "20px" }}
              src={
                expandedCustom
                  ? "/images/icons/icon_custom.png"
                  : "/images/icons/icon_custom_unselected.png"
              }
              onClick={() => setExpandedCustom(!expandedCustom)}
            />
            <img
              className="icon25"
              style={{ marginLeft: "20px" }}
              src={
                expandedLoot
                  ? "/images/icons/icon_loot.png"
                  : "/images/icons/icon_loot_unselected.png"
              }
              onClick={() => setExpandedLoot(!expandedLoot)}
            />
          </div>
          <div className="divRow" style={{ alignItems: "baseline" }}>
            {expandedWords && <AdminHandleGlobalWords />}
            {expandedSps && <AdminHandleActiveStorySps />}
            {expandedCustom && <AdminHandleCustom />}
            {expandedLoot && <AdminCreateFireItems />}
          </div>
        </div>
      )}
      {!isAdmin && <div style={{ fontSize: "40px" }}>You are not an admin</div>}
    </div>
  );
};

export default AdmingPage;
