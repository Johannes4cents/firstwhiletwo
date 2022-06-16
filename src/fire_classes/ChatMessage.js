import { dateToTimestamp, getRandomId } from "../misc/helperFuncs";

export default function ChatMessage(
  chats,
  msg,
  author,
  id,
  upvotes = 0,
  downvotes = 0,
  attachedItems = null
) {
  const timestamp = dateToTimestamp(new Date());
  return {
    chats,
    msg,
    author,
    id: id ?? timestamp.msTime + getRandomId(),
    upvotes,
    downvotes,
    attachedItems,
    timestamp,
  };
}
