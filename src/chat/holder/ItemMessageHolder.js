import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { animated, config, useSpring } from "react-spring";
import { storage } from "../../firebase/fireInit";
import { getConnectedStringFromMessage } from "../../scanTexts/handleLoot";
import listsStore from "../../stores/listsStore";
import userStore from "../../stores/userStore";

const ItemMessageHolder = ({ item, onItemClicked, message }) => {
  const animDiv = useRef();
  const [itemClicked, setItemClicked] = useState(false);
  const [flip, setFlip] = useState(false);
  const { info } = userStore();
  const { addLoot } = listsStore();
  const props = useSpring({
    config: { duration: itemClicked ? 100 : 1000 },
    from: { scale: 1.2 },
    to: { scale: !itemClicked ? 0.8 : 0 },
    reverse: !itemClicked ? flip : false,
    onRest: () => {
      if (itemClicked) addLootToStuff();
      setFlip(!flip);
    },
  });

  const addLootToStuff = () => {
    console.log("item is - ", item);
    item.connectedString = getConnectedStringFromMessage(
      info.language,
      message
    );
    addLoot(info.uid, item.toObj());
  };

  const onClick = () => {
    let audio = new Audio("/audio/sound_pick_up.mp3");
    audio.play();
    setItemClicked(true);
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
