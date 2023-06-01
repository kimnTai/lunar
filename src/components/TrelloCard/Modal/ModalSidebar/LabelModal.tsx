import { AddCardLabelApi, DeleteCardLabelApi } from "@/api/cards";
import { useCardModalContext } from "@/context/CardModalContext";
import { useAppSelector } from "@/hooks/useAppSelector";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Input, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
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

  return (
    <LabelModalStyled style={{ ...style }}>
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
        >
          建立新標籤
        </Button>
      </Card>
    </LabelModalStyled>
  );
};

export default LabelModal;
