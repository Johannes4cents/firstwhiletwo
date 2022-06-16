import React, { useEffect, useState } from "react";
const useOnHover = ({
  item = null,
  active = null,
  identifier = null,
  imageSelected = null,
  imageUnselected = null,
  inclusionList = null,
}) => {
  const [hover, setHover] = useState(false);
  const [textColor, setTextColor] = useState("white");
  const [activeImage, setActiveImage] = useState(imageUnselected);

  useEffect(() => {
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
        setTextColor(active == item ? "orange" : hover ? "gold" : "white");
        setActiveImage(active == item ? imageSelected : imageUnselected);
      } else {
        setTextColor(
          active[identifier] == item[identifier]
            ? "orange"
            : hover
            ? "gold"
            : "white"
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
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  return {
    state: hover,
    divProps: {
      onMouseEnter: (e) => onMouseEnter(e),
      onMouseLeave: (e) => onMouseLeave(e),
    },
    textColor,
    activeImage,
  };
};

export default useOnHover;
