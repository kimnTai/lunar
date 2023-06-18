import React, { useLayoutEffect, useState } from "react";
import { Button, Checkbox, Col, Input, Row, Space } from "antd";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { CheckItemProps } from "@/interfaces/checklists";
import { useAppDispatch } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import {
  deleteCheckItemAction,
  updateCheckItemAction,
} from "@/redux/cardSlice";
import { CheckItemStyled } from "./CheckListStyle";

const CheckItem: React.FC<{ itemData: CheckItemProps }> = ({
  itemData: { _id: itemId, checklistId, name, completed },
}) => {
  const dispatch = useAppDispatch();
  const cardData = useParamCard();

  const [isEditItemName, setIsEditItemName] = useState(false);
  const [itemNameField, setItemNameField] = useState(name);
  const [isNotSaveItemNameField, setIsNotSaveItemNameField] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isItemNameSubmitting, setIsItemNameSubmitting] = useState(false);
  const [isDeleteItemSubmitting, setIsDeleteItemSubmitting] = useState(false);
  const [isCompletedSubmitting, setIsCompletedSubmitting] = useState(false);

  const handleCompletedChange = async (isChecked: boolean) => {
    setIsCompletedSubmitting(true);

    try {
      await dispatch(
        updateCheckItemAction({
          cardId: cardData?._id || "",
          checklistId: checklistId,
          checkItemId: itemId,
          completed: isChecked,
        })
      );

      // 更新來源資料與畫面 (可優化：API成功才更新畫面，在使用者操作後畫面會延遲變化)
    } catch (error) {
      console.error(error);
    } finally {
      setIsCompletedSubmitting(false);
    }
  };

  //#region checkItem name
  // 判斷是否有未儲存的編輯內容
  const handleItemNameIsNotSave = () => {
    if (itemNameField !== name) {
      setIsNotSaveItemNameField(true);
    } else {
      setIsNotSaveItemNameField(false);
    }
  };

  const handleSaveItemName = async () => {
    if (itemNameField.trim() === "") {
      return;
    }
    setIsItemNameSubmitting(true);

    try {
      await dispatch(
        updateCheckItemAction({
          cardId: cardData?._id || "",
          checklistId: checklistId,
          checkItemId: itemId,
          name: itemNameField,
        })
      );

      // 更新畫面與來源資料狀態
    } catch (error) {
      console.error(error);
    } finally {
      setIsItemNameSubmitting(false);
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
    setIsDeleteItemSubmitting(true);

    try {
      await dispatch(
        deleteCheckItemAction({
          cardId: cardData?._id || "",
          checklistId: checklistId,
          checkItemId: itemId,
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteItemSubmitting(false);
    }
  };

  // 在畫面渲染前先去執行狀態更新
  useLayoutEffect(() => {
    handleItemNameIsNotSave();
  }, [isEditItemName, itemNameField]);

  return (
    <CheckItemStyled gutter={0} align="top">
      {/* Checkbox */}
      <Col flex="none">
        {!isCompletedSubmitting ? (
          <Checkbox
            className="checkbox"
            checked={completed}
            onChange={(e) => {
              handleCompletedChange(e.target.checked);
            }}
          />
        ) : (
          <LoadingOutlined className="checkboxLoading" />
        )}
      </Col>
      {/**/}
      <Col flex="auto">
        {/* 項目名稱 */}
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
              <div className={`itemName ${completed ? "lineThrough" : ""}`}>
                {name}
              </div>
              {/* 刪除按鈕 */}
              {isShowDelete && (
                <span className="deleteIcon">
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={(event) => handleDeleteItem(event)}
                    loading={isDeleteItemSubmitting}
                  />
                </span>
              )}
            </div>
            {/* 未儲存提示 */}
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
        {/* 編輯欄位 */}
        <Row>
          <Col span={24} className={isEditItemName ? "isShow" : "isHidden"}>
            <Row gutter={[16, 4]}>
              <Col span={24}>
                <Input.TextArea
                  value={itemNameField}
                  onChange={(e) => setItemNameField(e.target.value)}
                  onPressEnter={(event) => {
                    event.preventDefault();
                    handleSaveItemName();
                  }}
                  placeholder="填寫待辦項目"
                />
              </Col>
              <Col span={24}>
                <Space>
                  <Button
                    type="primary"
                    size="small"
                    onClick={handleSaveItemName}
                    loading={isItemNameSubmitting}
                  >
                    儲存
                  </Button>
                  <Button size="small" onClick={() => setIsEditItemName(false)}>
                    取消
                  </Button>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </CheckItemStyled>
  );
};

export default CheckItem;
