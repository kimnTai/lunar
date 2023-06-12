import { deleteLabelApi, newLabelApi, updateLabelApi } from "@/api/label";
import { LabelsProps } from "@/interfaces/labels";
import { colorList } from "@/utils/constant";
import { CloseOutlined, EditOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CSSProperties, useState } from "react";
import { useParams } from "react-router";
import { LabelModalStyled } from "./style";
import { useParamCard } from "@/hooks/useParamCard";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addCardLabelAction, deleteCardLabelAction } from "@/redux/cardSlice";
import { getBoardByIdAction, selectBoard } from "@/redux/boardSlice";

const LabelModal: React.FC<{
  setIsOpenLabel: React.Dispatch<React.SetStateAction<boolean>>;
  style?: CSSProperties;
}> = ({ style, setIsOpenLabel }) => {
  const { boardId } = useParams();
  const cardData = useParamCard();
  const dispatch = useAppDispatch();
  const selectedLabelArray = cardData?.label.map((label) => label._id);
  const [selectedColor, setSelectedColor] = useState(colorList[0].color);
  const [labelName, setLabelName] = useState("");
  const [isCreatingLabel, setIsCreatingLabel] = useState(false);
  const [isUpdatingLabel, setIsUpdatingLabel] = useState(false);
  const [createNewLabel, setCreateLabel] = useState(false);
  const [targetLabel, setTargetLabel] = useState<LabelsProps>();
  const [isEditLabel, setIsEditLabel] = useState(false);
  const [isDeletingLabel, setIsDeletingLabel] = useState(false);
  const board = useAppSelector(selectBoard);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleAddCardLabel = async (labelId: string) => {
    await dispatch(
      addCardLabelAction({
        cardId: cardData?._id!,
        labelId,
      })
    );
  };

  const handleRemoveCardLabel = async (labelId: string) => {
    await dispatch(
      deleteCardLabelAction({
        cardId: cardData?._id!,
        labelId,
      })
    );
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
      try {
        await newLabelApi({
          name: labelName,
          color: selectedColor,
          boardId: boardId,
        });
        dispatch(getBoardByIdAction(boardId));
      } catch (error) {
      } finally {
        setIsCreatingLabel(false);
        setCreateLabel(false);
      }
    }
  };

  const handleEditLabel = (labelId: string) => {
    setTargetLabel(
      board.label.find((label) => {
        return label._id === labelId;
      })
    );

    setIsEditLabel(true);
  };

  const handleUpdateLabel = async () => {
    setIsUpdatingLabel(true);
    if (boardId && targetLabel) {
      try {
        await updateLabelApi({
          name: targetLabel.name,
          color: targetLabel.color,
          boardId,
          labelId: targetLabel?._id,
        });

        dispatch(getBoardByIdAction(boardId));
      } finally {
        setIsUpdatingLabel(false);
        setIsEditLabel(false);
      }
    }
  };

  const handleDeleteLabel = async () => {
    setIsDeletingLabel(true);
    if (boardId && targetLabel) {
      try {
        await deleteLabelApi({
          boardId,
          labelId: targetLabel._id,
        });

        dispatch(getBoardByIdAction(boardId));
      } finally {
        setIsDeletingLabel(false);
        setIsEditLabel(false);
      }
    }
  };

  const handleLabelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (targetLabel) {
      const newLabel: LabelsProps = { ...targetLabel };
      newLabel.name = e.target.value;
      setTargetLabel(newLabel);
    }
  };

  const handleLabelColorChange = (color: string) => {
    if (targetLabel) {
      const newLabel: LabelsProps = { ...targetLabel };
      newLabel.color = color;
      targetLabel ? setTargetLabel(newLabel) : setSelectedColor(color);
    }
  };

  return (
    <LabelModalStyled style={{ ...style }}>
      {createNewLabel && (
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
          style={{ position: "absolute", zIndex: 20 }}
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
          <Form layout="vertical">
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

            <Button
              type="primary"
              block
              loading={isCreatingLabel}
              onClick={handleCreateNewLabel}
            >
              建立
            </Button>
          </Form>
        </Card>
      )}
      {isEditLabel && (
        <Card
          title="標籤"
          extra={
            <Button
              className="ant-back"
              icon={<LeftOutlined style={{ fontSize: "12px" }} />}
              onClick={() => {
                setIsEditLabel(false);
                setTargetLabel(undefined);
              }}
            />
          }
          size={"small"}
          style={{ position: "absolute", zIndex: 20 }}
        >
          <div className="label-card-header">
            <div
              className="label-card-label"
              style={{
                backgroundColor: `${targetLabel?.color}`,
              }}
            >
              {targetLabel?.name}
            </div>
          </div>
          <Form layout="vertical">
            <Form.Item
              label="標題"
              rules={[{ required: true, message: "請輸入標籤名稱!" }]}
            >
              <Input
                placeholder="輸入標籤名稱"
                onChange={(e) => handleLabelInputChange(e)}
                defaultValue={targetLabel?.name}
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
                  onClick={() => handleLabelColorChange(color.color)}
                />
              ))}
            </Form.Item>

            <Button
              type="primary"
              loading={isUpdatingLabel}
              block
              onClick={handleUpdateLabel}
            >
              儲存
            </Button>
            <Button
              type="link"
              loading={isDeletingLabel}
              block
              style={{ color: "red" }}
              onClick={handleDeleteLabel}
            >
              刪除
            </Button>
          </Form>
        </Card>
      )}
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
        {board.label.length !== 0 && (
          <Input
            placeholder="搜尋標籤"
            onChange={handleInputChange}
            style={{ margin: "16px 0" }}
          />
        )}

        <Col>
          {board.label.map((label) => (
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
                onClick={() => handleEditLabel(label._id)}
              />
            </Row>
          ))}
        </Col>
        <Button
          block
          type="primary"
          style={{
            backgroundColor: "var(--grayd4)",
            boxShadow: "none",
            marginTop: "16px",
          }}
          onClick={() => setCreateLabel(true)}
        >
          建立新標籤
        </Button>
      </Card>
    </LabelModalStyled>
  );
};

export default LabelModal;
