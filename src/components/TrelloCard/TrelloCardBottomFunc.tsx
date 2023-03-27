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
        icon={<PlusOutlined />}
        className="add-title"
        onClick={() => setShowAddCard(true)}
      >
        新增卡片
      </Button>
      <Tooltip placement="bottom" title={"從範本建立"} arrow={false}>
        <Button type="text" icon={<FileTextOutlined />} className="sample" />
      </Tooltip>
    </TrelloCardBottomFuncStyled>
  );
};

export default TrelloCardBottomFunc;
