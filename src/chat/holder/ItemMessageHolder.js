import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { animated, config, useSpring } from "react-spring";
import { storage } from "../../firebase/fireInit";

const ItemMessageHolder = ({ item, onItemClicked }) => {
  const [flip, setFlip] = useState(false);
  const props = useSpring({
    config: { duration: 1000 },
    from: { scale: 1.2 },
    to: { scale: 0.8 },
    reverse: flip,
    reset: true,
    onRest: () => {
      setFlip(!flip);
    },
  });
  const image = useRef();
  useEffect(() => {
    if (image.current != null) {
      getDownloadURL(ref(storage, item.imgUrl)).then((url) => {
        console.log("url is - ", url);
        image.current.setAttribute("src", url);
      });
    }
  }, [item]);
  return (
    <animated.div
      style={props}
      onClick={() => {
        onItemClicked(item);
      }}
    >
      <img ref={image} className="icon30" />
    </animated.div>
  );
};

export default ItemMessageHolder;
