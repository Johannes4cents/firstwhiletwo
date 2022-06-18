import React, { useEffect, useState } from "react";
import { capitalize, makeMousePositionObj } from "../../misc/helperFuncs";

const typeObject = (type) => {
  const imgUrls = {
    creatures: "/images/loot/types/icon_creatures.png",
    items: "/images/loot/types/icon_items.png",
    spells: "/images/loot/types/icon_spells.png",
    events: "/images/loot/types/icon_events.png",
    buildings: "/images/loot/types/icon_buildings.png",
  };
  return {
    type: capitalize(type),
    imgUrl: imgUrls[type],
  };
};

// creatures items spells events buildings
const PickTypeButton = ({ onTypePicked, type }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({});
  const [pickedType, setPickedType] = useState(typeObject(type));

  useEffect(() => {
    setPickedType(typeObject(type));
  }, [type]);

  const typeList = [
    typeObject("creatures"),
    typeObject("items"),
    typeObject("spells"),
    typeObject("events"),
    typeObject("buildings"),
  ];

  const openModal = (e) => {
    setMousePosition(makeMousePositionObj(e));
    setModalOpen(true);
  };

  const onItemSelected = (type) => {
    setPickedType(typeObject(type));
    onTypePicked(type);
  };

  return (
    <div>
      <div
        className="divRowColored"
        style={{ width: "150px", margin: "5px" }}
        onClick={openModal}
      >
        <div className="textBoldWhite" style={{ textAlign: "center", flex: 1 }}>
          {pickedType.type}
        </div>
        <img className="icon25" src={pickedType.imgUrl} />
      </div>
      {modalOpen && (
        <PickTypeModal
          mousePosition={mousePosition}
          setModalOpen={setModalOpen}
          onTypePicked={onItemSelected}
          typeList={typeList}
        />
      )}
    </div>
  );
};

const PickTypeModal = ({
  mousePosition,
  setModalOpen,
  onTypePicked,
  typeList,
}) => {
  return (
    <div>
      <div className="overlayClear" onClick={() => setModalOpen(false)} />
      <div
        className="modalContent"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          zIndex: 1,
        }}
      >
        <div className="divColumn">
          {typeList.map((t) => {
            return (
              <TypeHolder
                key={t.type}
                type={t}
                onTypePicked={onTypePicked}
                setModalOpen={setModalOpen}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TypeHolder = ({ type, onTypePicked, setModalOpen }) => {
  const clickFunc = () => {
    onTypePicked(type.type.toLowerCase());
    setModalOpen(false);
  };
  return (
    <div
      className="divRowColored"
      style={{ width: "150px" }}
      onClick={clickFunc}
    >
      <div className="textBoldWhite" style={{ textAlign: "center", flex: 1 }}>
        {type.type}
      </div>
      <img className="icon25" src={type.imgUrl} />
    </div>
  );
};

export default PickTypeButton;
