import { AddCardLabelApi, DeleteCardLabelApi } from "@/api/cards";
import { newLabelApi } from "@/api/label";
import { useCardModalContext } from "@/context/CardModalContext";
import { useAppSelector } from "@/hooks/useAppSelector";
import { colorList } from "@/pages/Billboard/BillboardHeader/constant";
import { CloseOutlined, EditOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import { useParams } from "react-router";
import { LabelModalStyled } from "./style";

const LabelModal: React.FC<{
  setIsOpenLabel: Function;
  style?: any;
}> = ({ style, setIsOpenLabel }) => {
  const { boardId } = useParams();
  const currentBoard = useAppSelector((state) =>
    state.user.organization
      .flatMap(({ board }) => board)
      .find(({ id }) => id === boardId)
  );
  const { cardData, setCardData } = useCardModalContext();
  const selectedLabelArray = cardData?.label.map((label) => label._id);
  const [selectedColor, setSelectedColor] = useState(colorList[0].color);
  const [labelName, setLabelName] = useState("");
  const [isCreatingLabel, setIsCreatingLabel] = useState(false);
  const [createNewLabel, setCreateLabel] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleAddCardLabel = async (labelId: string) => {
    await AddCardLabelApi({
      cardId: cardData?._id!,
      labelId,
    }).then((result) => {
      setCardData(result.result);
    });
  };

  const handleRemoveCardLabel = async (labelId: string) => {
    await DeleteCardLabelApi({
      cardId: cardData?._id!,
      labelId,
    }).then((result) => {
      setCardData(result.result);
    });
  };

  const handleCheckboxChange = async (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      handleAddCardLabel(e.target.value);
    } else {
      handleRemoveCardLabel(e.target.value);
    }
  };

  const handleCreateNewLabel = async () => {
    setIsCreatingLabel(true);
    if (boardId) {
      await newLabelApi({
        name: labelName,
        color: selectedColor,
        boardId: boardId,
      }).finally(() => {
        setIsCreatingLabel(false);
        setCreateLabel(false);
      });
    }
  };

  return (
    <LabelModalStyled style={{ ...style }}>
      {createNewLabel ? (
        <Card
          title="標籤"
          extra={
            <Button
              className="ant-back"
              icon={<LeftOutlined style={{ fontSize: "12px" }} />}
              onClick={() => setCreateLabel(false)}
            />
          }
          size={"small"}
        >
          <div className="label-card-header">
            <div
              className="label-card-label"
              style={{
                backgroundColor: `${selectedColor}`,
              }}
            >
              {labelName}
            </div>
          </div>
          <Form layout="vertical" onFinish={handleCreateNewLabel}>
            <Form.Item
              label="標題"
              rules={[{ required: true, message: "請輸入標籤名稱!" }]}
            >
              <Input
                placeholder="輸入標籤名稱"
                onChange={(e) => setLabelName(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="選一個顏色" className="colored-label-list">
              {colorList?.map((color, idx) => (
                <Button
                  className="colored-label"
                  type="text"
                  style={{
                    backgroundColor: color.color,
                  }}
                  key={idx}
                  onClick={() => setSelectedColor(color.color)}
                />
              ))}
            </Form.Item>
            {/* <Button block type="primary" icon={<CloseOutlined />}>
            移除顏色
          </Button> */}
            <Button
              htmlType="submit"
              type="primary"
              block
              loading={isCreatingLabel}
            >
              建立
            </Button>
          </Form>
        </Card>
      ) : (
        <Card
          title="標籤"
          extra={
            <Button
              className="ant-close"
              icon={<CloseOutlined style={{ fontSize: "12px" }} />}
              onClick={() => setIsOpenLabel(false)}
            />
          }
          size={"small"}
          style={{ width: "auto" }}
        >
          <Input placeholder="搜尋標籤" onChange={handleInputChange} />
          <Col style={{ margin: "16px 0" }}>
            {currentBoard?.label.map((label) => (
              <Row
                align={"middle"}
                key={label._id}
                style={{ gap: "8px", margin: "4px 0" }}
              >
                <Checkbox
                  checked={selectedLabelArray?.includes(label._id)}
                  onChange={handleCheckboxChange}
                  value={label._id}
                />
                <Button
                  className="labelBtn"
                  type="primary"
                  style={{ backgroundColor: label.color }}
                >
                  {label.name}
                </Button>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  style={{
                    width: "32px",
                    height: "32px",
                    color: "var(--gray66)",
                  }}
                />
              </Row>
            ))}
          </Col>
          <Button
            block
            type="primary"
            style={{ backgroundColor: "var(--grayd4)", boxShadow: "none" }}
            onClick={() => setCreateLabel(true)}
          >
            建立新標籤
          </Button>
        </Card>
      )}
    </LabelModalStyled>
  );
};

export default LabelModal;
