import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef } from "react";
import { storage } from "../firebase/fireInit";
import chatStore from "../stores/chatStore";
import miscStore from "../stores/miscStore";
import userStore from "../stores/userStore";

const AttachedItemField = () => {
  const imageRef = useRef();
  const { attachedItem, setAttachedItem, setMsgRessources } = chatStore();
  const { setAttachedItemHeight } = miscStore();
  const { info } = userStore();
  const fieldDiv = useRef();

  useEffect(() => {
    if (imageRef && attachedItem) {
      getDownloadURL(ref(storage, attachedItem.imgUrl)).then((url) => {
        imageRef.current.setAttribute("src", url);
      });
    }
  }, [imageRef, attachedItem]);

  useEffect(() => {
    if (fieldDiv != null) {
      if (attachedItem) setAttachedItemHeight(fieldDiv.current.offsetHeight);
      else setAttachedItemHeight(0);
    } else setAttachedItemHeight(0);

    if (attachedItem != null)
      setMsgRessources(attachedItem.upvotes.map((r) => r.id));
  }, [attachedItem, fieldDiv]);

  const genericExplanation = {
    items: "unlocks the item for use",
    spells: "casts the spell affecting the turf",
    creatures: "",
    buildings: "",
    events: "",
  };

  const RessourcesArray = () => {
    return (
      <div
        className="divRow"
        style={{
          textAlign: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {(attachedItem.upvotes ?? []).map((u) => {
          return (
            <div className="divRow" key={u.id}>
              <div className="textBoldWhite">{u.payload}</div>
              <img
                src={`/images/ressources/res_${u.id}.png`}
                className="icon20"
              />
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div
      ref={fieldDiv}
      className="divRow"
      style={{
        width: "100%",
        marginTop: "5px",
        minHeight: "35px",
        backgroundColor: "grey",
        borderRadius: "1rem/1rem",
      }}
    >
      <div
        className="divColumn"
        style={{ height: "100%", justifyContent: "center" }}
      >
        <img
          src="/images/icons/icon_cancel.png"
          className="icon20"
          onClick={() => setAttachedItem(null)}
        />
      </div>
      <ItemFieldPart
        description={"Effect"}
        flex={1}
        bottomElement={
          <div
            className="textWhite"
            style={{ fontStyle: "italic", fontSize: "12px" }}
          >
            {attachedItem.effectExplanation ??
              genericExplanation[attachedItem.type]}
          </div>
        }
      />
      <div
        className="divRow"
        style={{ flex: 1, justifyContent: "space-around" }}
      >
        <div className="divRow" style={{ flex: 1, justifyContent: "center" }}>
          <img ref={imageRef} className="icon30" />
          <div
            style={{
              color: "lightgray",
              marginLeft: "5px",
              fontFamily: "Roboto-Bold",
            }}
          >
            {attachedItem.name[info.language ?? "english"]}
          </div>
        </div>
      </div>

      <ItemFieldPart
        description={"required String"}
        flex={1}
        bottomElement={
          <div className="textWhite">{attachedItem.connectedString}</div>
        }
      />

      <ItemFieldPart
        description={"required upvotes"}
        bottomElement={<RessourcesArray />}
      />
    </div>
  );
};

const ItemFieldPart = ({ description, bottomElement, flex, width }) => {
  return (
    <div
      className="divColumn"
      style={{ marginRight: "15px", alignSelf: "baseline", flex, width }}
    >
      <div
        style={{
          color: "darkgray",
          fontFamily: "Roboto-Regular",
          fontSize: "12px",
        }}
      >
        {description}
      </div>
      <div
        className="divRow"
        style={{
          textAlign: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {bottomElement}
      </div>
    </div>
  );
};

export default AttachedItemField;
