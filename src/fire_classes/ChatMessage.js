import { dateToTimestamp, getRandomId } from "../misc/helperFuncs";

export default function ChatMessage(
  ressources,
  chats,
  msg,
  author,
  id,
  attachedItems = [],
  spawnedItems = []
) {
  const timestamp = dateToTimestamp(new Date());
  const rId = timestamp.msTime + getRandomId();
  return {
    ressources: ressources.map((r, i) => {
      return { ressource: r, index: i };
    }),
    upvotesFirst: 0,
    downvotesFirst: 0,
    upvotesSecond: 0,
    downvotesSecond: 0,
    upvotesThird: 0,
    downvotesThird: 0,
    chats,
    msg,
    author,
    id: id ?? rId,
    attachedItems,
    spawnedItems,
    timestamp,
  };
}
