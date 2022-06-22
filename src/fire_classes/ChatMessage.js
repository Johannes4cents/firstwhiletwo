import { dateToTimestamp, getRandomId } from "../misc/helperFuncs";

export default function ChatMessage(
  ressources,
  chats,
  msg,
  author,
  postedIn = "",
  attachedItems = [],
  spawnedItems = [],
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
    postedIn,
    timestamp,
  };
}
