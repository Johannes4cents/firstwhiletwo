import React from "react";
import AdminTriggerWordCatsListBar from "./AdminTriggerWordCatsListBar";
import AdminTriggerWordListBar from "./AdminTriggerWordListBar";

const AdminTriggerWordsPage = () => {
  return (
    <div
      className="divRow"
      style={{
        width: "100%",
        height: "500px",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <AdminTriggerWordCatsListBar />
      <div style={{ width: "130px" }} />
      <AdminTriggerWordListBar />
    </div>
  );
};

export default AdminTriggerWordsPage;
