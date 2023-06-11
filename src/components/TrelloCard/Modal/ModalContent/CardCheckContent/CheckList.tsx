import { useState } from "react";
import { Button, Col, Row, Space, Popover } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ChecklistProps } from "@/interfaces/checklists";
import { useCardModalContext } from "@/context/CardModalContext";
import {
  deleteChecklistApi,
  newCheckItemApi,
  updateChecklistApi,
} from "@/api/cards";
import { nextPosition } from "@/utils/cardFunc";
import CheckItems from "./CheckItems";
import { CheckItemStyled, CheckListStyled } from "./CheckListStyle";

const CheckList: React.FC<{
  listData: ChecklistProps;
}> = ({ listData: { _id: listId, name, checkItem, cardId } }) => {
  const { cardData, setCardData } = useCardModalContext();
  const { checklist: checkLists = [] } = cardData ?? {};

  const [isEditListName, setIsEditListName] = useState<boolean>(false);
  const [listNameField, setListNameField] = useState<string>(name);
  const [isNewCheckItemEdit, setIsNewCheckItemEdit] = useState(false);
  const [newCheckItemTitle, setNewCheckItemTitle] = useState("");
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);
  const [isListNameSubmitting, setIsListNameSubmitting] =
    useState<boolean>(false);
  const [isNewItemSubmitting, setIsNewItemSubmitting] =
    useState<boolean>(false);
  const [isDeleteListSubmitting, setIsDeleteListSubmitting] =
    useState<boolean>(false);

  const submitListName = async () => {
    if (!listNameField.trim()) return;
    setIsListNameSubmitting(true);

    try {
      const { result } = await updateChecklistApi({
        cardId: cardId,
        checklistId: listId,
        name: listNameField,
      });

      setCardData({
        ...cardData!,
        checklist: checkLists.map((list) => {
          if (list.id === listId) {
            return result;
          }
          return list;
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsListNameSubmitting(false);
      setIsEditListName(false);
    }
  };

  const handleAddCheckItem = async () => {
    if (!newCheckItemTitle.trim()) return;
    setIsNewItemSubmitting(true);

    try {
      const { result } = await newCheckItemApi({
        cardId: cardId,
        checklistId: listId,
        name: newCheckItemTitle,
        position: nextPosition(checkItem).toString(),
      });

      setNewCheckItemTitle("");
      // 更新畫面
      setCardData({
        ...cardData!,
        checklist: checkLists.map((list) => {
          if (list.id === listId) {
            list.checkItem.push(result);
          }
          return list;
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsNewItemSubmitting(false);
      setIsNewCheckItemEdit(false);
    }
  };

  const handleDeleteChecklist = async () => {
    setIsDeleteListSubmitting(true);
    try {
      await deleteChecklistApi({
        cardId: cardId,
        checklistId: listId,
      });

      setCardData({
        ...cardData!,
        checklist: checkLists.filter((list) => list.id !== listId),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteListSubmitting(false);
      setIsOpenDeleteConfirm(false);
    }
  };

  return (
    <CheckListStyled>
      {/* 清單標題*/}
      <Row
        justify="space-between"
        align="middle"
        gutter={0}
        className="listTitle"
      >
        <Col span={24}>
          <Row
            className={isEditListName ? "isHidden" : "isShow"}
            justify="space-between"
            align="middle"
            gutter={0}
          >
            <Col flex="auto">
              <div onClick={() => setIsEditListName(true)}>{name}</div>
            </Col>
            {/* 刪除待辦清單 */}
            <Col flex="none">
              <Popover
                overlayStyle={{ width: "300px" }}
                trigger="click"
                title={
                  <>
                    <Row justify="center" gutter={0}>
                      <Col flex="none">
                        <Space size={8}>
                          <ExclamationCircleOutlined style={{ color: "red" }} />
                          刪除待辦清單
                        </Space>
                      </Col>
                    </Row>
                  </>
                }
                content={
                  <Row gutter={0}>
                    <Col span={24}>
                      <br />
                      確定要刪除"{name}
                      "嗎？
                      <br />
                      (刪除待辦清單是永久性的，無法復原)
                      <br />
                      <br />
                    </Col>
                    <Col span={24}>
                      <Button
                        block
                        danger
                        onClick={handleDeleteChecklist}
                        loading={isDeleteListSubmitting}
                      >
                        刪除
                      </Button>
                    </Col>
                    <Col span={24}>
                      <Button
                        block
                        type="text"
                        onClick={() => setIsOpenDeleteConfirm(false)}
                      >
                        取消
                      </Button>
                    </Col>
                  </Row>
                }
                open={isOpenDeleteConfirm}
              >
                <Button onClick={() => setIsOpenDeleteConfirm(true)}>
                  刪除
                </Button>
              </Popover>
            </Col>
          </Row>
          <Row
            className={isEditListName ? "isShow" : "isHidden"}
            gutter={[16, 4]}
          >
            <Col span={24}>
              <TextArea
                value={listNameField}
                onChange={(e) => setListNameField(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    submitListName();
                  }
                }}
                placeholder="填寫待辦清單名稱..."
              />
            </Col>
            <Col span={24}>
              <Space>
                <Button
                  type="primary"
                  size="small"
                  onClick={submitListName}
                  loading={isListNameSubmitting}
                >
                  儲存
                </Button>
                <Button size="small" onClick={() => setIsEditListName(false)}>
                  取消
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
      <>
        {/* 待辦項目們 */}
        <CheckItems itemsData={checkItem} />
        {/* 新增待辦項目 */}
        <Row
          gutter={[16, 4]}
          className={`addCheckItem ${
            isNewCheckItemEdit ? "isShow" : "isHidden"
          }`}
        >
          <Col span={24}>
            <TextArea
              value={newCheckItemTitle}
              onChange={(e) => setNewCheckItemTitle(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleAddCheckItem();
                }
              }}
              placeholder="填寫待辦項目..."
              className="addCheckItemTextArea"
            />
          </Col>
          <Col span={24}>
            <Space>
              <Button
                type="primary"
                onClick={handleAddCheckItem}
                loading={isNewItemSubmitting}
              >
                新增
              </Button>
              <Button onClick={() => setIsNewCheckItemEdit(false)}>取消</Button>
            </Space>
          </Col>
        </Row>
        <CheckItemStyled
          gutter={0}
          className={isNewCheckItemEdit ? "isHidden" : "isShow"}
        >
          <Col span={24} onClick={() => setIsNewCheckItemEdit(true)}>
            <Space size={8}>
              <PlusOutlined />
              <span className="addCheckItem">新增待辦項目</span>
            </Space>
          </Col>
        </CheckItemStyled>
      </>
    </CheckListStyled>
  );
};

export default CheckList;
