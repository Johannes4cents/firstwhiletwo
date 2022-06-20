import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { animated, config, useSpring } from "react-spring";
import { storage } from "../../firebase/fireInit";
import listsStore from "../../stores/listsStore";
import userStore from "../../stores/userStore";

const ItemMessageHolder = ({ item, onItemClicked }) => {
  const animDiv = useRef();
  const [flip, setFlip] = useState(false);
  const { info } = userStore();
  const { addLoot } = listsStore();
  const props = useSpring({
    config: { duration: 1000 },
    from: { scale: 1.2 },
    to: { scale: 0.8 },
    reverse: flip,
    reset: true,
    onRest: () => {
      console.log("onRest triggered");
      setFlip(!flip);
    },
    onChange: () => {
      console.log("onChange triggered");
    },
    onPause: () => {
      console.log("onPause triggered");
    },
    onProps: () => {
      console.log("onProps triggered");
    },
    onResume: () => {
      console.log("onResume triggered");
    },
    onStart: () => {
      console.log("onStart triggered");
    },
  });

  const clickProps = useSpring({
    config: { duration: 4500 },
    from: { scale: 1 },
    to: { scale: 0 },
  });

  const onClick = () => {
    animDiv.current.setAttribute("style", clickProps);
    addLoot(info.uid, item.toObj());
  };
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
      ref={animDiv}
      style={{ scale: props.scale }}
      onClick={() => {
        onClick();
      }}
    >
      <img ref={image} className="icon30" />
    </animated.div>
  );
};

export default ItemMessageHolder;
