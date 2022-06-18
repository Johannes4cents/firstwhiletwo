import React from "react";
import { fireItemAttributes } from "./fireItemAttributes";
import { specialAttributes } from "./specialAttributes";
import AttributHolder from "./AttributHolder";

const AdminLootAttributesBar = ({ attributes, setAttributes, fireItem }) => {
  const clickOnAttribute = (attribute, payload, update = false) => {
    const newAttribute = { id: attribute.id, payload };
    if (!update) {
      const attributeIds = attributes.map((o) => o.id);
      if (attributeIds.includes(attribute.id))
        setAttributes(attributes.filter((o) => o.id != attribute.id));
      else setAttributes([...attributes, newAttribute]);
    } else {
      const filterList = attributes.filter((o) => o.id != attribute.id);
      setAttributes([...filterList, newAttribute]);
    }
  };
  return (
    <div
      className="divColumColored"
      style={{ width: "400px", height: "100%", borderLeft: "2px solid white" }}
    >
      <div
        className="textBoldWhite"
        style={{ textAlign: "center", width: "100%", marginBottom: "10px" }}
      >
        Attributes
      </div>
      <div
        className="divColumn"
        style={{ maxHeight: "450px", overflow: "auto" }}
      >
        {fireItemAttributes.map((a) => {
          return (
            <AttributHolder
              fireItem={fireItem}
              attributes={attributes}
              key={a.id}
              attribute={a}
              onItemClicked={clickOnAttribute}
              multiChoice={true}
              picked={attributes.map((o) => o.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

const AdminLootSpecialAttributesBar = ({
  attributes,
  setAttributes,
  fireItem,
}) => {
  const clickOnAttribute = (attribute, payload, update = false) => {
    const newAttribute = { id: attribute.id, payload };
    if (!update) {
      const attributeIds = attributes.map((o) => o.id);
      if (attributeIds.includes(attribute.id))
        setAttributes(attributes.filter((o) => o.id != attribute.id));
      else setAttributes([...attributes, newAttribute]);
    } else {
      const filterList = attributes.filter((o) => o.id != attribute.id);
      setAttributes([...filterList, newAttribute]);
    }
  };
  return (
    <div
      className="divColumColored"
      style={{ width: "420px", height: "100%", borderLeft: "2px solid white" }}
    >
      <div
        className="textBoldWhite"
        style={{ textAlign: "center", width: "100%", marginBottom: "10px" }}
      >
        Special Attributes
      </div>
      <div
        className="divColumn"
        style={{ maxHeight: "450px", overflow: "auto" }}
      >
        {specialAttributes.map((a) => {
          return (
            <AttributHolder
              fireItem={fireItem}
              attributes={attributes}
              key={a.id}
              attribute={a}
              onItemClicked={clickOnAttribute}
              multiChoice={true}
              picked={attributes.map((o) => o.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminLootAttributesBar;
export { AdminLootSpecialAttributesBar };
