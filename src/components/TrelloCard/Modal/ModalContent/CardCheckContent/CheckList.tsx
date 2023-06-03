import { useState } from "react";
import { Button, Col, Row, Space, Popover } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useCardModalContext } from "@/context/CardModalContext";
import { deleteChecklistApi, newCheckItemApi } from "@/api/cards";
import { nextPosition } from "@/utils/cardFunc";
import CheckItems from "./CheckItems";
import { SectionHeaderStyled } from "../style";
import { CheckListStyled } from "./CheckListStyle";

const CheckList: React.FC = () => {
  const { cardData, setCardData } = useCardModalContext();
  const { id = "", checklist = [] } = cardData ?? {};

  const [checkItemsIsEdit, setCheckItemsIsEdit] = useState(
    new Array(checklist.length).fill(false)
  );

  const [checkItemsTitle, setCheckItemsTitle] = useState(
    new Array(checklist.length).fill("")
  );

  const [openDeleteConfirmList, setIsOpenDeleteConfirm] = useState(
    new Array(checklist.length).fill(false)
  );

  // 多個 CheckList 新增 Item 時每次只顯示一個新增欄位
  const handleCheckItemsIsEdit = (index: number, isCheck: boolean) => {
    const newCheckList = checkItemsIsEdit.map((item) => (item = false));

    if (isCheck) {
      newCheckList[index] = true;
    }
    setCheckItemsIsEdit(newCheckList);
  };

  // 更新 checkItem title 或在新增 checkItem 後清空
  const handleCheckItemsTitleChange = (
    index: number,
    e?: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newCheckItemsTitles = [...checkItemsTitle];
    newCheckItemsTitles[index] = e?.target.value || "";
    setCheckItemsTitle(newCheckItemsTitles);
  };

  const handleAddCheckItem = async (index: number) => {
    try {
      const { result } = await newCheckItemApi({
        cardId: id,
        checklistId: checklist[index].id,
        name: checkItemsTitle[index],
        position: nextPosition(checklist[index].checkItem).toString(),
      });

      handleCheckItemsTitleChange(index);
      handleCheckItemsIsEdit(index, false);
      // 更新畫面
      setCardData({
        ...cardData!,
        checklist: checklist.map((list) => {
          if (list.id === checklist[index].id) {
            list.checkItem.push(result);
          }
          return list;
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDeleteConfirm = (isOpen: boolean, listIndex?: number) => {
    // 只開啟一個刪除確認視窗
    const newOpenDeleteConfirmList = openDeleteConfirmList.map(() => false);

    if (isOpen && listIndex !== undefined) {
      newOpenDeleteConfirmList[listIndex] = true;
    }

    setIsOpenDeleteConfirm(newOpenDeleteConfirmList);
  };

  const handleDeleteChecklist = async (listIndex: number) => {
    try {
      await deleteChecklistApi({
        cardId: id,
        checklistId: checklist[listIndex].id,
      });

      setCardData({
        ...cardData!,
        checklist: checklist.filter(
          (list) => list.id !== checklist[listIndex].id
        ),
      });
      handleOpenDeleteConfirm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {checklist
        .sort((a, b) => +a.position - +b.position)
        .map(({ _id, name }, index) => (
          <Draggable key={_id} draggableId={_id} index={index}>
            {(provided, _snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                }}
              >
                <SectionHeaderStyled
                  justify="space-between"
                  align="middle"
                  gutter={8}
                >
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
                              <ExclamationCircleOutlined
                                style={{ color: "red" }}
                              />
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
                          <Button
                            block
                            danger
                            onClick={() => handleDeleteChecklist(index)}
                          >
                            刪除
                          </Button>
                        </Col>
                        <Col span={24}>
                          <Button
                            block
                            type="text"
                            onClick={() => handleOpenDeleteConfirm(false)}
                          >
                            取消
                          </Button>
                        </Col>
                      </Row>
                    }
                    open={openDeleteConfirmList[index]}
                  >
                    <Button
                      onClick={() => handleOpenDeleteConfirm(true, index)}
                    >
                      刪除
                    </Button>
                  </Popover>
                </SectionHeaderStyled>

                <Droppable
                  droppableId={_id}
                  type={"QUOTE"}
                  ignoreContainerClipping={undefined}
                  isDropDisabled={undefined}
                  isCombineEnabled={false}
                  renderClone={undefined}
                >
                  {(dropProvided, _dropSnapshot) => (
                    <div
                      ref={dropProvided.innerRef}
                      style={{ minHeight: "1px" }}
                    >
                      <CheckListStyled>
                        <CheckItems checklistIndex={index} />
                        <>
                          <Row
                            gutter={[16, 8]}
                            className={
                              checkItemsIsEdit[index] ? "isShow" : "isHidden"
                            }
                          >
                            <Col span={24}>
                              <TextArea
                                value={checkItemsTitle[index]}
                                onChange={(e) =>
                                  handleCheckItemsTitleChange(index, e)
                                }
                                placeholder="填寫代辦清單..."
                              />
                            </Col>
                            <Col span={24}>
                              <Space>
                                <Button
                                  type="primary"
                                  onClick={() => handleAddCheckItem(index)}
                                >
                                  新增
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleCheckItemsIsEdit(index, false)
                                  }
                                >
                                  取消
                                </Button>
                              </Space>
                            </Col>
                          </Row>
                          <Row
                            gutter={[16, 8]}
                            className={
                              checkItemsIsEdit[index] ? "isHidden" : "isShow"
                            }
                          >
                            <Col
                              span={24}
                              onClick={() =>
                                handleCheckItemsIsEdit(index, true)
                              }
                            >
                              <Space size={16}>
                                <PlusOutlined />
                                <span className="addCheckList">
                                  新增待辦清單
                                </span>
                              </Space>
                            </Col>
                          </Row>
                        </>
                      </CheckListStyled>
                      {dropProvided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )}
          </Draggable>
        ))}
    </>
  );
};

export default CheckList;
