import { ListsProps } from "@/interfaces/lists";
import { SocketResultProps } from "@/interfaces/socket";
import { cloneDeep } from "lodash";

export function getSocketChange(
  cardList: ListsProps[],
  result: SocketResultProps
) {
  // 列表
  if ("card" in result) {
    const list = result;
    const target = cardList.filter(({ _id }) => _id !== list._id);
    // 不是封存才把 result 放進去
    if (!list.closed) {
      target.push(list);
    }

    return cloneDeep(target);
  }

  // 卡片
  if ("listId" in result) {
    const card = result;
    cardList.forEach((list) => {
      list.card = list.card.filter(({ _id }) => _id !== card._id);
    });

    cardList
      .filter(({ _id }) => _id === card.listId)
      .forEach((list) => {
        // 不是封存才把 result 放進去
        if (!card.closed) {
          list.card.push(card);
        }
      });

    return cloneDeep(cardList);
  }

  return cardList;
}
