import { dateToTimestamp, getRandomId } from "../misc/helperFuncs";

export default function ChatMessage(
  ressources = ["cash"],
  chats,
  msg = "",
  author,
  postedIn = "",
  attachedItems = [],
  spawnedItems = [],
  attachedMedia = [],
  imgUrls = [],
  id
) {
  const timestamp = dateToTimestamp(new Date());
  const rId = timestamp.msTime + getRandomId();
  return {
    ressources,
    chats,
    msg,
    author,
    id: id ?? rId,
    attachedItems,
    spawnedItems,
    attachedMedia,
    imgUrls,
    postedIn,
    timestamp,
  };
}
