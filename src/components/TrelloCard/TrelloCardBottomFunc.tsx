import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useListsContext } from "@/context/ListsContext";
import { TrelloCardBottomFuncStyled } from "./style";

const TrelloCardBottomFunc: React.FC = () => {
  const { showAddCard, setShowAddCard } = useListsContext();
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
