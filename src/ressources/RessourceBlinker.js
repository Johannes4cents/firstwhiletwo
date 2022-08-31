import React, { useState } from "react";
import { useEffect } from "react";
import { animated, useSpring, useTransition } from "react-spring";
import userStore from "../stores/userStore";

const RessourceBlinker = () => {
  const { lastRessource, setLastRessource } = userStore();
  const [fadeOut, setFadeOut] = useState(false);
  const [{ size }, api] = useSpring(() => ({ size: 100 }));

  useEffect(() => {
    console.log("lastResource - ", lastRessource);
    api.start({ from: { size: 0 }, to: { size: 100 } });
    setTimeout(() => {
      api.start({ from: { size: 100 }, to: { size: 0 } });
    }, 500);
  }, [lastRessource]);

  return (
    <div
      className="divRow"
      style={{ width: "200px", justifyContent: "center" }}
    >
      {lastRessource && (
        <div className="divRow" style={{ position: "relative" }}>
          <animated.img
            style={{ transform: size.to((x) => `scale(${x}%)`) }}
            className="image62"
            src={`/images/ressources/res_${lastRessource}.png`}
          />
          <animated.img
            style={{
              transform: size.to((x) => `scale(${x}%)`),
              position: "absolute",
              bottom: "0px",
              right: "5px",
            }}
            className="icon20"
            src={`/images/icons/icon_plus.png`}
          />
        </div>
      )}
    </div>
  );
};

export default RessourceBlinker;
