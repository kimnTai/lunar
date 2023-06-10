import { AddCardLabelApi, DeleteCardLabelApi } from "@/api/cards";
import {
  deleteLabelApi,
  getLabelApi,
  newLabelApi,
  updateLabelApi,
} from "@/api/label";
import { useCardModalContext } from "@/context/CardModalContext";
import { useApi } from "@/hooks/useApiHook";
import { LabelsProps } from "@/interfaces/labels";
import { colorList } from "@/utils/constant";
import { CloseOutlined, EditOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Form, Input, Row, Spin } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CSSProperties, useEffect, useState } from "react";
import { useParams } from "react-router";
import { LabelModalStyled } from "./style";

const LabelModal: React.FC<{
  setIsOpenLabel: Function;
  style?: CSSProperties;
}> = ({ style, setIsOpenLabel }) => {
  const { boardId } = useParams();
  const { cardData, setCardData } = useCardModalContext();
  const selectedLabelArray = cardData?.label.map((label) => label._id);
  const [selectedColor, setSelectedColor] = useState(colorList[0].color);
  const [labelName, setLabelName] = useState("");
  const [isCreatingLabel, setIsCreatingLabel] = useState(false);
  const [createNewLabel, setCreateLabel] = useState(false);
  const [labelResult, labelLoading, labelCallApi] = useApi(getLabelApi);
  const [targetLabel, setTargetLabel] = useState<LabelsProps>();
  const [isUpdateLabel, setIsUpdateLabel] = useState(false);
  const [isDeleteLabel, setIsDeleteLabel] = useState(false);

  useEffect(() => {
    if (boardId) {
      labelCallApi(boardId);
    }
  }, []);

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
      try {
        await newLabelApi({
          name: labelName,
          color: selectedColor,
          boardId: boardId,
        });

        await labelCallApi(boardId);
      } catch (error) {
      } finally {
        setIsCreatingLabel(false);
        setCreateLabel(false);
      }
    }
  };

  const handleEditLabel = (labelId: string) => {
    setTargetLabel(
      labelResult?.result.find((label) => {
        return label._id === labelId;
      })
    );

    setCreateLabel(true);
  };

  const handleUpdateLabel = async () => {
    setIsUpdateLabel(true);
    if (boardId && targetLabel) {
      try {
        await updateLabelApi({
          name: targetLabel.name,
          color: targetLabel.color,
          boardId: boardId,
          labelId: targetLabel?._id,
        });

        await labelCallApi(boardId);
      } finally {
        setIsUpdateLabel(false);
        setCreateLabel(false);
      }
    }
  };

  const handleDeleteLabel = async () => {
    setIsDeleteLabel(true);
    if (boardId && targetLabel) {
      try {
        await deleteLabelApi({
          boardId,
          labelId: targetLabel._id,
        });

        await labelCallApi(boardId);
      } finally {
        setIsDeleteLabel(false);
        setCreateLabel(false);
      }
    }
  };

  const handleLabelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (targetLabel) {
      const newLabel: LabelsProps = { ...targetLabel };
      newLabel.name = e.target.value;
      targetLabel ? setTargetLabel(newLabel) : setLabelName(e.target.value);
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
      {createNewLabel ? (
        <Card
          title="標籤"
          extra={
            <Button
              className="ant-back"
              icon={<LeftOutlined style={{ fontSize: "12px" }} />}
              onClick={() => {
                setCreateLabel(false);
                setTargetLabel(undefined);
              }}
            />
          }
          size={"small"}
        >
          <div className="label-card-header">
            <div
              className="label-card-label"
              style={{
                backgroundColor: `${
                  targetLabel ? targetLabel.color : selectedColor
                }`,
              }}
            >
              {targetLabel ? targetLabel.name : labelName}
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
                defaultValue={targetLabel && targetLabel.name}
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
            {targetLabel ? (
              <>
                <Button
                  type="primary"
                  loading={isUpdateLabel}
                  block
                  onClick={handleUpdateLabel}
                >
                  儲存
                </Button>
                <Button
                  type="link"
                  loading={isDeleteLabel}
                  block
                  style={{ color: "red" }}
                  onClick={handleDeleteLabel}
                >
                  刪除
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                block
                loading={isCreatingLabel}
                onClick={handleCreateNewLabel}
              >
                建立
              </Button>
            )}
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
            {labelLoading ? (
              <Spin />
            ) : (
              labelResult?.result.map((label) => (
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
              ))
            )}
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
