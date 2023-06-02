import { useState } from "react";
import { Button, Col, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ChecklistProps } from "@/interfaces/checklists";
import { useCardModalContext } from "@/context/CardModalContext";
import { newCheckItemApi } from "@/api/cards";
import { nextPosition } from "@/utils/cardFunc";
import CheckItems from "./CheckItems";
import { SectionHeaderStyled } from "../style";
import { CheckListStyled } from "./CheckListStyle";

const CheckList: React.FC<{ checkList?: ChecklistProps[] }> = ({
  checkList = [],
}) => {
  const { cardData, setCardData } = useCardModalContext();
  const { id = "", checklist = [] } = cardData ?? {};

  const [checkItemsIsEdit, setCheckItemsIsEdit] = useState(
    new Array(checkList.length).fill(false)
  );

  const [checkItemsTitle, setCheckItemsTitle] = useState(
    new Array(checkList.length).fill("")
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
        position: nextPosition(checkList[index].checkItem).toString(),
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

  return (
    <>
      {checkList
        .sort((a, b) => +a.position - +b.position)
        .map(({ _id, name, checkItem }, index) => (
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
                <SectionHeaderStyled align="middle" gutter={8}>
                  <Col flex="none">
                    <h3>{name}</h3>
                  </Col>
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
                        <CheckItems checkItem={checkItem} />
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
