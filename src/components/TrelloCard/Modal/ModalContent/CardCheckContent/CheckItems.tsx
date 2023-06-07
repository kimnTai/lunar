import React, { useLayoutEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button, Checkbox, Col, Progress, Row, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import TextArea from "antd/es/input/TextArea";
import { updateCheckItemApi } from "@/api/cards";
import { useCardModalContext } from "@/context/CardModalContext";
import { CheckItemsStyled } from "./CheckListStyle";

const CheckItems: React.FC<{ checklistIndex: number }> = ({
  checklistIndex = 0,
}) => {
  const { cardData, setCardData } = useCardModalContext();
  const { id = "", checklist = [] } = cardData ?? {};

  const [nameIsEditList, setNameIsEditList] = useState(
    new Array(checklist[checklistIndex].checkItem.length).fill(false)
  );

  const [itemsNameList, setItemNameList] = useState(
    checklist[checklistIndex].checkItem.map((item) => item.name)
  );

  const [itemsNameIsNotSaveList, setItemNameIsNotSaveList] = useState(
    new Array(checklist[checklistIndex].checkItem.length).fill(false)
  );

  const getProgressPercent = () => {
    const listItemsTotal = checklist[checklistIndex].checkItem.length;
    const listItemsCompleted = checklist[checklistIndex].checkItem.filter(
      (item) => item.completed
    ).length;

    return Math.round((listItemsCompleted / listItemsTotal) * 100);
  };

  const handleCompletedChange = async (
    checkItemId: string,
    e: CheckboxChangeEvent
  ) => {
    try {
      const { result } = await updateCheckItemApi({
        cardId: id,
        checklistId: checklist[checklistIndex].id,
        checkItemId: checkItemId,
        completed: e.target.checked,
      });

      // 更新來源資料與畫面 (可優化：API成功才更新畫面，在使用者操作後畫面會延遲變化)
      setCardData({
        ...cardData!,
        checklist: checklist.map((list) => {
          if (list.id === result.checklistId) {
            return {
              ...list,
              checkItem: list.checkItem.map((item) => {
                if (item._id === checkItemId) {
                  return result;
                }
                return item;
              }),
            };
          }
          return list;
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  //#region checkItem name

  // 判斷是否有未儲存的編輯內容
  const handleItemNameIsNotSave = () => {
    const newItemNameIsNotSaveList = [...itemsNameIsNotSaveList];
    itemsNameList.forEach((itemName, index) => {
      if (itemName.trim() !== checklist[checklistIndex].checkItem[index].name) {
        newItemNameIsNotSaveList[index] = true;
      } else {
        newItemNameIsNotSaveList[index] = false;
      }
    });
    setItemNameIsNotSaveList(newItemNameIsNotSaveList);
  };

  // 取消未儲存的待辦項目名稱
  const cleanNotSaveItemName = (itemIndex: number) => {
    const newItemNameList = [...itemsNameList];
    newItemNameList[itemIndex] =
      checklist[checklistIndex].checkItem[itemIndex].name;
    setItemNameList(newItemNameList);
  };

  const handleItemNameIsEdit = (itemIndex: number, isEdit: boolean) => {
    const newItemNameIsEditList = nameIsEditList.map((_item) => (_item = false));

    if (isEdit) {
      newItemNameIsEditList[itemIndex] = true;
    }

    setNameIsEditList(newItemNameIsEditList);
  };

  const handleItemNameChange = (
    itemIndex: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newItemNameList = itemsNameList.map((itemName) => itemName);
    newItemNameList[itemIndex] = e.target.value;
    setItemNameList(newItemNameList);
  };

  const handleSaveItemName = async (itemIndex: number, checkItemId: string) => {
    if (itemsNameList[itemIndex].trim() === "") {
      return;
    }

    try {
      const { result } = await updateCheckItemApi({
        cardId: id,
        checklistId: checklist[checklistIndex].id,
        checkItemId: checkItemId,
        name: itemsNameList[itemIndex],
      });
      handleItemNameIsEdit(itemIndex, false);
      // 更新畫面與來源資料狀態
      setCardData({
        ...cardData!,
        checklist: checklist.map((list) => {
          if (list.id === result.checklistId) {
            return {
              ...list,
              checkItem: list.checkItem.map((item) => {
                if (item._id === checkItemId) {
                  return result;
                }
                return item;
              }),
            };
          }
          return list;
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };
  //#endregion

  // 在畫面渲染前先去執行狀態更新
  useLayoutEffect(() => {
    handleItemNameIsNotSave();
  }, [nameIsEditList, itemsNameList]);

  return (
    <CheckItemsStyled>
      <Progress percent={getProgressPercent()} />
      {checklist[checklistIndex].checkItem
        .sort((a, b) => +a.position - +b.position)
        .map(({ _id, completed, name }, index) => (
          <Draggable key={_id} draggableId={_id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  padding: `4px 8px`,
                  margin: `0 0 8px 0`,
                  background: (() => {
                    if (completed) {
                      return "#9F9F9F";
                    }
                    if (snapshot.isDragging) {
                      return "#83E3FF";
                    }
                    return "#D6F3FF";
                  })(),
                }}
              >
                <Row gutter={[16, 8]}>
                  <Col span={24}>
                    <Row gutter={[16, 8]}>
                      <Col flex="none">
                        <Checkbox
                          checked={completed}
                          onChange={(e) => {
                            handleCompletedChange(_id, e);
                          }}
                        />
                      </Col>
                      <Col flex="auto">
                        <div
                          className={
                            nameIsEditList[index] ? "isHidden" : "isShow"
                          }
                          onClick={() => {
                            handleItemNameIsEdit(index, true);
                          }}
                        >
                          {name}
                        </div>
                        <div
                          className={
                            itemsNameIsNotSaveList[index] &&
                            !nameIsEditList[index]
                              ? "isShow"
                              : "isHidden"
                          }
                        >
                          <Space>
                            <span>你在這個項目有未儲存的編輯內容。</span>
                            <Button size="small" type="link">
                              <span
                                onClick={() =>
                                  handleItemNameIsEdit(index, true)
                                }
                                className="underline"
                              >
                                檢視編輯
                              </span>
                            </Button>
                            |
                            <Button size="small" type="link">
                              <span
                                onClick={() => cleanNotSaveItemName(index)}
                                className="underline"
                              >
                                放棄
                              </span>
                            </Button>
                          </Space>
                        </div>
                        <div
                          className={
                            nameIsEditList[index] ? "isShow" : "isHidden"
                          }
                        >
                          <TextArea
                            value={itemsNameList[index]}
                            onChange={(e) => handleItemNameChange(index, e)}
                            placeholder="填寫待辦項目"
                          />
                          <Space>
                            <Button
                              type="primary"
                              size="small"
                              onClick={() => handleSaveItemName(index, _id)}
                            >
                              儲存
                            </Button>
                            <Button
                              size="small"
                              onClick={() => handleItemNameIsEdit(index, false)}
                            >
                              取消
                            </Button>
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            )}
          </Draggable>
        ))}
    </CheckItemsStyled>
  );
};

export default CheckItems;
