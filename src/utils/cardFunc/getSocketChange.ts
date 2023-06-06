import { ListsProps } from "@/interfaces/lists";
import { SocketResultProps } from "@/interfaces/socket";
import { cloneDeep } from "lodash";

export function getSocketChange(
  cardList: ListsProps[],
  result: SocketResultProps
) {
  if (!("listId" in result)) {
    const target = cardList.find((ele) => ele._id === result.id);

    if (target) {
      // column 互換
      target.position = result.position;
    } else {
      // column 新增
      cardList.push(result);
    }

    return cloneDeep(cardList);
  }

  // column 內互換 與 column外互換
  const originColumn = cardList.find((ele) =>
    ele.card.find((cardEle) => cardEle.id === result.id)
  );

  const newData = cloneDeep(result);
  // 新增
  if (!originColumn) {
    cardList.find((ele) => ele.id === result.listId)?.card.push(newData);
    return cloneDeep(cardList);
  }

  // 同column 互換
  if (originColumn.id === result.listId) {
    const useData = originColumn.card.find((ele) => ele.id === result.id);
    if (useData && useData.position !== result.position) {
      useData.position = result.position;

      return cloneDeep(cardList);
    }
  }

  // 跨Column 互換
  if (originColumn.id !== result.listId) {
    const newColumn = cardList.find((ele) => ele.id === result.listId);
    originColumn.card = originColumn.card.filter((ele) => ele.id !== result.id);
    newColumn?.card.push(newData);

    return cloneDeep(cardList);
  }
  return cardList;
}
