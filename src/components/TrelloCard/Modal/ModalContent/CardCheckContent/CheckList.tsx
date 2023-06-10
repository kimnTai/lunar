import { useState } from "react";
import { Button, Col, Row, Space, Popover } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ChecklistProps } from "@/interfaces/checklists";
import { useCardModalContext } from "@/context/CardModalContext";
import { deleteChecklistApi, newCheckItemApi } from "@/api/cards";
import { nextPosition } from "@/utils/cardFunc";
import CheckItems from "./CheckItems";
import { SectionHeaderStyled } from "../style";
import { CheckListStyled } from "./CheckListStyle";

const CheckList: React.FC<{
  listData: ChecklistProps;
  listIndex: number; // TODO: 重構完刪除
}> = ({ listData: { _id: listId, name, checkItem, cardId }, listIndex }) => {
  const { cardData, setCardData } = useCardModalContext();
  const { checklist: checkLists = [] } = cardData ?? {};

  const [isNewCheckItemEdit, setIsNewCheckItemEdit] = useState(false);
  const [newCheckItemTitle, setNewCheckItemTitle] = useState("");
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);

  const handleAddCheckItem = async () => {
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
      setIsNewCheckItemEdit(false);
    }
  };

  const handleDeleteChecklist = async () => {
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
      setIsOpenDeleteConfirm(false);
    }
  };

  return (
    <>
      <SectionHeaderStyled justify="space-between" align="middle" gutter={8}>
        <Col flex="none">
          <h3>{name}</h3>
        </Col>
        <Popover
          overlayStyle={{ width: "300px" }}
          trigger="click"
          title={
            <>
              <Row justify="center" gutter={[16, 8]}>
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
            <Row gutter={[16, 8]}>
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
                <Button block danger onClick={handleDeleteChecklist}>
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
          <Button onClick={() => setIsOpenDeleteConfirm(true)}>刪除</Button>
        </Popover>
      </SectionHeaderStyled>

      <CheckListStyled>
        <CheckItems checklistIndex={listIndex} />
        <>
          <Row
            gutter={[16, 8]}
            className={isNewCheckItemEdit ? "isShow" : "isHidden"}
          >
            <Col span={24}>
              <TextArea
                value={newCheckItemTitle}
                onChange={(e) => setNewCheckItemTitle(e.target.value)}
                placeholder="填寫代辦清單..."
              />
            </Col>
            <Col span={24}>
              <Space>
                <Button type="primary" onClick={handleAddCheckItem}>
                  新增
                </Button>
                <Button onClick={() => setIsNewCheckItemEdit(false)}>
                  取消
                </Button>
              </Space>
            </Col>
          </Row>
          <Row
            gutter={[16, 8]}
            className={isNewCheckItemEdit ? "isHidden" : "isShow"}
          >
            <Col span={24} onClick={() => setIsNewCheckItemEdit(true)}>
              <Space size={16}>
                <PlusOutlined />
                <span className="addCheckList">新增待辦清單</span>
              </Space>
            </Col>
          </Row>
        </>
      </CheckListStyled>
    </>
  );
};

export default CheckList;
