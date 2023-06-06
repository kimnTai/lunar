import { ListsProps } from "@/interfaces/lists";
import { SocketResultProps } from "@/interfaces/socket";

export function getSocketChange(
  cardList: ListsProps[],
  result: SocketResultProps
) {
  if (!result.listId) {
    if (cardList.filter((ele) => ele.id === result.id)?.length) {
      // column 互換
      cardList.filter((ele) => ele._id === result.id)[0].position =
        result.position;
      return JSON.parse(JSON.stringify(cardList));
    } else {
      // column 新增
      cardList.push({
        _id: result._id,
        name: result.name,
        position: result.position,
        boardId: result.boardId,
        card: [],
        id: result.id,
      });
      return JSON.parse(JSON.stringify(cardList));
    }
  }
  // column 內互換 與 column外互換
  const originColumn = cardList.filter(
    (ele) => ele.card.filter((cardEle) => cardEle.id === result.id)[0]
  )[0];
  const newData = {
    name: result.name,
    closed: result.closed,
    position: result.position,
    listId: result.listId,
    label: result.label,
    _id: result._id,
    member: result.member,
    createdAt: result.createdAt,
    updatedAt: result.createdAt,
    id: result.id,
    description: result.description,
    checklist: result.checklist,
    comment: result.comment,
    attachment: result.attachment,
    date: result.date,
  };
  if (!originColumn) {
    // 新增
    cardList.filter((ele) => ele.id === result.listId)[0].card.push(newData);
    return JSON.parse(JSON.stringify(cardList));
  }
  if (originColumn.id === result.listId) {
    // 同column 互換
    const useData = originColumn.card.filter((ele) => ele.id === result.id)[0];
    if (useData.position !== result.position) {
      useData.position = result.position;
      return JSON.parse(JSON.stringify(cardList));
    }
  }
  if (originColumn.id !== result.listId) {
    // 跨Column 互換
    const newColumn = cardList.filter((ele) => ele.id === result.listId)[0];
    originColumn.card = originColumn.card.filter((ele) => ele.id !== result.id);
    newColumn.card.push(newData);
    return JSON.parse(JSON.stringify(cardList));
  }
  return cardList;
}
