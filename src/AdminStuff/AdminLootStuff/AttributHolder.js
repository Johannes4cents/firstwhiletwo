import { useEffect, useState } from "react";

const AttributHolder = ({
  fireItem,
  attribute,
  onItemClicked,
  multiChoice = false,
  picked = [],
}) => {
  const [effectPayloadOne, setEffectPayloadOne] = useState("");
  const [effectPayloadTwo, setEffectPayloadTwo] = useState("");
  const [effectPayloadThree, setEffectPayloadThree] = useState("");
  const [effectPayloadFour, setEffectPayloadFour] = useState("");
  const [spawnChance, setSpawnChance] = useState(1000);
  const [firstLoadSafety, setFirstLoadSafety] = useState(true);

  useEffect(() => {
    if (attribute.spawnChance != null) {
      setSpawnChance(attribute.spawnChance);
    }
  }, []);

  useEffect(() => {
    setFirstLoadSafety(true);
    if (fireItem != null) {
      const foundAttribute = fireItem.attributes.find(
        (obj) => obj.id == attribute.id
      );
      if (foundAttribute != null) {
        setEffectPayloadFour(foundAttribute.payload.four);
        setEffectPayloadOne(foundAttribute.payload.one);
        setEffectPayloadThree(foundAttribute.payload.three);
        setEffectPayloadTwo(foundAttribute.payload.two);

        if (foundAttribute.dropChance != null)
          setSpawnChance(foundAttribute.spawnChance);
      } else {
        setEffectPayloadFour("");
        setEffectPayloadOne("");
        setEffectPayloadTwo("");
        setEffectPayloadThree("");
      }
    }
  }, [fireItem]);

  const clickItem = () => {
    onItemClicked(attribute, {
      one: effectPayloadOne,
      two: effectPayloadTwo,
      three: effectPayloadThree,
      four: effectPayloadFour,
      chance: spawnChance,
    });
  };

  useEffect(() => {
    if (!firstLoadSafety) {
      onItemClicked(
        attribute,
        {
          one: effectPayloadOne,
          two: effectPayloadTwo,
          three: effectPayloadThree,
          four: effectPayloadFour,
          chance: spawnChance,
        },
        true
      );
    } else setFirstLoadSafety(false);
  }, [
    effectPayloadOne,
    effectPayloadTwo,
    effectPayloadThree,
    effectPayloadFour,
    spawnChance,
  ]);

  return (
    <div
      className="divRowColored"
      style={{
        width: "100%",
        borderBottom: "1px solid white",
        marginTop: "5px",
      }}
    >
      {multiChoice && (
        <img
          className="icon20"
          onClick={clickItem}
          src={
            picked.includes(attribute.id)
              ? "/images/drawable/checked_box.png"
              : "/images/drawable/checkbox_unchecked.png"
          }
        />
      )}
      <div
        onClick={clickItem}
        className="textWhite"
        style={{ width: "200px", textAlign: "center" }}
      >
        {attribute.name}
      </div>
      <div style={{ flex: 1 }} />
      {attribute.payloads > 0 && (
        <input
          value={effectPayloadOne}
          style={{ width: "30px", textAlign: "center" }}
          onChange={(e) => setEffectPayloadOne(e.target.value)}
        />
      )}
      {attribute.payloads > 1 && (
        <input
          value={effectPayloadTwo}
          style={{ width: "30px", textAlign: "center" }}
          onChange={(e) => setEffectPayloadTwo(e.target.value)}
        />
      )}
      {attribute.payloads > 2 && (
        <input
          value={effectPayloadThree}
          style={{ width: "30px", textAlign: "center" }}
          onChange={(e) => setEffectPayloadThree(e.target.value)}
        />
      )}
      {attribute.payloads > 3 && (
        <input
          value={effectPayloadFour}
          style={{ width: "30px", textAlign: "center" }}
          onChange={(e) => setEffectPayloadFour(e.target.value)}
        />
      )}
      <div
        className="divRow"
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "30px",
        }}
      >
        <img
          src={attribute.imgUrl}
          className="icon20"
          style={{ marginRight: "4px", width: "25px" }}
        />
      </div>
      {spawnChance < 1000 && (
        <input
          value={spawnChance}
          type="number"
          style={{ width: "40px", textAlign: "center" }}
          onChange={(e) => setSpawnChance(e.target.value)}
        />
      )}
    </div>
  );
};

export default AttributHolder;
