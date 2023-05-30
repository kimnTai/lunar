import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useAppSelector } from "@/hooks/useAppSelector";

const SearchCardInput: React.FC = () => {
  const showWorkSpace = useAppSelector((state) => state.screen.showWorkSpace);
  return (
    <Input
      className={showWorkSpace ? "search" : "darkSearch"}
      placeholder="搜尋所有卡片"
      prefix={
        <SearchOutlined
          style={{
            color: showWorkSpace ? "var(--black23)" : "white",
          }}
        />
      }
      style={{}}
    />
  );
};

export default SearchCardInput;
