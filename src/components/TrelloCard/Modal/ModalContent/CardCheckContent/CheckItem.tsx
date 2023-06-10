import React, { useLayoutEffect, useState } from "react";
import { Button, Checkbox, Col, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DeleteOutlined } from "@ant-design/icons";
import { CheckItemProps } from "@/interfaces/checklists";
import { deleteCheckItemApi, updateCheckItemApi } from "@/api/cards";
import { useCardModalContext } from "@/context/CardModalContext";
import { CheckItemStyled } from "./CheckListStyle";
// TODO: 刪除
const CheckItem: React.FC<{ itemData: CheckItemProps }> = ({
  itemData: { _id: itemId, checklistId, name, completed },
}) => {
  const { cardData, setCardData } = useCardModalContext();
  const { id: cardId = "", checklist: checkLists = [] } = cardData ?? {};

  const [isEditItemName, setIsEditItemName] = useState(false);
  const [itemNameField, setItemNameField] = useState(name);
  const [isNotSaveItemNameField, setIsNotSaveItemNameField] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);

  const handleCompletedChange = async (isChecked: boolean) => {
    try {
      const { result } = await updateCheckItemApi({
        cardId: cardId,
        checklistId: checklistId,
        checkItemId: itemId,
        completed: isChecked,
      });

      // 更新來源資料與畫面 (可優化：API成功才更新畫面，在使用者操作後畫面會延遲變化)
      setCardData({
        ...cardData!,
        checklist: checkLists.map((list) => {
          if (list.id === result.checklistId) {
            return {
              ...list,
              checkItem: list.checkItem.map((item) => {
                if (item._id === itemId) {
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
    if (itemNameField.trim() !== name) {
      setIsNotSaveItemNameField(true);
    } else {
      setIsNotSaveItemNameField(false);
    }
  };

  const handleSaveItemName = async () => {
    if (itemNameField.trim() === "") {
      return;
    }

    try {
      const { result } = await updateCheckItemApi({
        cardId: cardId,
        checklistId: checklistId,
        checkItemId: itemId,
        name: itemNameField,
      });

      // 更新畫面與來源資料狀態
      setCardData({
        ...cardData!,
        checklist: checkLists.map((list) => {
          if (list.id === result.checklistId) {
            return {
              ...list,
              checkItem: list.checkItem.map((item) => {
                if (item._id === itemId) {
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
    } finally {
      setIsEditItemName(false);
    }
  };
  //#endregion

  const handleDeleteItem = async (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    try {
      const { result } = await deleteCheckItemApi({
        cardId: cardId,
        checklistId: checklistId,
        checkItemId: itemId,
      });

      setCardData({
        ...cardData!,
        checklist: checkLists.map((list) => {
          if (list._id === result.checklistId) {
            return {
              ...list,
              checkItem: list.checkItem.filter((item) => item._id !== itemId),
            };
          } else {
            return list;
          }
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 在畫面渲染前先去執行狀態更新
  useLayoutEffect(() => {
    handleItemNameIsNotSave();
  }, [isEditItemName, itemNameField]);

  return (
    <CheckItemStyled gutter={[16, 8]}>
      <Col span={24}>
        <Row gutter={[16, 8]} align="middle">
          <Col flex="none">
            <Checkbox
              checked={completed}
              onChange={(e) => {
                handleCompletedChange(e.target.checked);
              }}
            />
          </Col>
          <Col flex="auto">
            <Row align="middle">
              <Col
                span={24}
                onMouseOver={() => setIsShowDelete(true)}
                onMouseLeave={() => setIsShowDelete(false)}
              >
                <div
                  className={isEditItemName ? "isHidden" : "isShow"}
                  onClick={() => {
                    setIsEditItemName(true);
                  }}
                >
                  {name}
                  {isShowDelete && (
                    <span className="deleteIcon">
                      <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={(event) => handleDeleteItem(event)}
                      />
                    </span>
                  )}
                </div>
                <div
                  className={
                    isNotSaveItemNameField && !isEditItemName
                      ? "isShow"
                      : "isHidden"
                  }
                >
                  <Space>
                    <span>你在這個項目有未儲存的編輯內容。</span>
                    <Button size="small" type="link">
                      <span
                        onClick={() => setIsEditItemName(true)}
                        className="underline"
                      >
                        檢視編輯
                      </span>
                    </Button>
                    |
                    <Button size="small" type="link">
                      <span
                        onClick={() => setItemNameField(name)}
                        className="underline"
                      >
                        放棄
                      </span>
                    </Button>
                  </Space>
                </div>
              </Col>
            </Row>
            <div className={isEditItemName ? "isShow" : "isHidden"}>
              <TextArea
                value={itemNameField}
                onChange={(e) => setItemNameField(e.target.value)}
                placeholder="填寫待辦項目"
              />
              <Space>
                <Button
                  type="primary"
                  size="small"
                  onClick={handleSaveItemName}
                >
                  儲存
                </Button>
                <Button size="small" onClick={() => setIsEditItemName(false)}>
                  取消
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </Col>
    </CheckItemStyled>
  );
};

export default CheckItem;
