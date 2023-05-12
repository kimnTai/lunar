import { Button, Tooltip } from "antd";
import { PlusOutlined, FileTextOutlined } from "@ant-design/icons";
import { TrelloCardBottomFuncProps } from "@/interfaces/trelloCard";
import { TrelloCardBottomFuncStyled } from "./style";

const TrelloCardBottomFunc: React.FC<TrelloCardBottomFuncProps> = ({
  showAddCard,
  setShowAddCard,
}) => {
  return (
    <TrelloCardBottomFuncStyled show={showAddCard.toString()}>
      <Button
        type="text"
        icon={<PlusOutlined style={{ color: "white" }} />}
        className="add-title"
        onClick={() => setShowAddCard(true)}
        style={{
          color: "white",
          backgroundColor: "var(--black23)",
          height: "100%",
        }}
      >
        新增卡片
      </Button>
    </TrelloCardBottomFuncStyled>
  );
};

export default TrelloCardBottomFunc;
