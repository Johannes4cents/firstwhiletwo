import React, { useEffect, useState } from "react";
import CheckBox from "../misc/elements/CheckBox";
import HoverMenu from "../misc/elements/HoverMenu";
import { checkMsTimeDiff, dateToTimestamp } from "../misc/helperFuncs";
import useMousePosition from "./useMousePosition";
const useOnHover = ({
  item = null,
  active = null,
  identifier = null,
  imageSelected = null,
  imageUnselected = null,
  inclusionList = null,
  selectedTextColor = null,
  unselectedTextColor = null,
  hoverColor = null,
  nonHoverColor = "white",
  hoverBgColor = "#5f5f5f",
  normalBgColor = "#4f4f4f",
  checkboxSize = "icon20",
  hoverElement = null,
  hoverTimer = 2000,
  hoverOptions = {
    direction: "horizontal",
    options: [],
    size: "icon20",
    inside: false,
  },
  hoverChange = true,
}) => {
  const [hover, setHover] = useState(false);
  const [textColor, setTextColor] = useState("white");
  const [activeImage, setActiveImage] = useState(imageUnselected);
  const [bgColor, setBgColor] = useState("#4f4f4f");
  const [hoverStarted, setHoverStarted] = useState(null);
  const [showHoverMenu, setShowHoverMenu] = useState(false);
  const [showHover, setShowHover] = useState(false);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const interval = setInterval(() => {
      setHoverStarted((state) => {
        if (state) {
          let timePassed = checkMsTimeDiff(state);
          if (timePassed > hoverTimer) setShowHover(true);
        }
        return state;
      });
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (hoverBgColor) {
      setBgColor(hover ? hoverBgColor : normalBgColor);
    }

    if (inclusionList) {
      var included = false;
      if (identifier) {
        included = inclusionList
          .map((i) => i[identifier])
          .includes(item[identifier]);
      } else included = inclusionList.includes(item);

      setTextColor(included ? "orange" : hover ? "gold" : "white");
      setActiveImage(included ? imageSelected : imageUnselected);
    } else {
      if (!identifier) {
        setTextColor(
          active == item
            ? selectedTextColor ?? "orange"
            : hover
            ? hoverColor ?? "gold"
            : unselectedTextColor ?? "white"
        );
        setActiveImage(active == item ? imageSelected : imageUnselected);
      } else {
        setTextColor(
          active[identifier] == item[identifier]
            ? selectedTextColor ?? "orange"
            : hover
            ? hoverColor ?? "gold"
            : unselectedTextColor ?? "white"
        );
        setActiveImage(
          active[identifier] == item[identifier]
            ? imageSelected
            : imageUnselected
        );
      }
    }
  }, [active, hover, inclusionList, item]);

  const onMouseEnter = () => {
    if (hoverChange) {
      setHoverStarted(dateToTimestamp(new Date()).msTime);
      setHover(true);
      setShowHoverMenu(true);
    }
  };

  const onMouseLeave = () => {
    if (hoverChange) {
      setHover(false);
      setHoverStarted(null);
      setShowHover(false);
      setShowHoverMenu(false);
    }
  };

  return {
    state: hover,
    divProps: {
      onMouseEnter: (e) => onMouseEnter(e),
      onMouseLeave: (e) => onMouseLeave(e),
    },
    textColor,
    setShowHover,
    activeImage,
    bgColor,
    checkbox: (
      <CheckBox
        item={item}
        includeList={inclusionList}
        identifier={identifier}
        otherItem={active}
        size={checkboxSize}
      />
    ),
    infoBox: (
      <div
        className="modalContent"
        onClick={() => {
          setShowHover(false);
        }}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          pointerEvents: "none",
          backgroundColor: "#ffffff00",
        }}
      >
        {showHover && hoverElement}
      </div>
    ),
    hoverMenu: (
      <div style={{ position: "relative" }}>
        {showHoverMenu && (
          <HoverMenu
            options={hoverOptions.options}
            direction={hoverOptions.direction}
            size={hoverOptions.size}
            setShowHoverMenu={setShowHoverMenu}
            inside={hoverOptions.inside}
          />
        )}
      </div>
    ),
  };
};

export default useOnHover;
