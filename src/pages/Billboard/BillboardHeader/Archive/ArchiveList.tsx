import { Button, List } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/hooks";
import { ClosedItemsProps } from "@/interfaces/boards";
import { updateListAction } from "@/redux/listSlice";

const ArchiveList: React.FC<{
  data: ClosedItemsProps;
  setData: React.Dispatch<React.SetStateAction<ClosedItemsProps>>;
  setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  setState: React.Dispatch<React.SetStateAction<"CARD" | "LIST">>;
}> = ({ data, setSpinning, setData, setState }) => {
  const dispatch = useAppDispatch();

  const removeItem = (listId: string) => {
    setData((pre) => ({
      ...pre,
      closedList: pre.closedList.filter((value) => value._id !== listId),
    }));
  };

  const handleOpen = async (listId: string) => {
    setSpinning(true);
    await dispatch(
      updateListAction({
        listId: listId,
        closed: false,
      })
    );
    removeItem(listId);
    setSpinning(false);
  };

  return (
    <List
      bordered
      header={
        <div
          className="d-flex"
          style={{
            justifyContent: "space-between",
          }}
        >
          <p>列表</p>
          <Button size="small" onClick={() => setState("CARD")}>
            切換至卡片
          </Button>
        </div>
      }
      dataSource={data?.closedList}
      pagination={{
        onChange: (_page) => {},
        pageSize: 10,
      }}
      renderItem={(list) => (
        <List.Item
          actions={[
            <Button
              size="small"
              type="primary"
              icon={<UndoOutlined />}
              onClick={() => handleOpen(list._id)}
            >
              發送到看板
            </Button>,
          ]}
        >
          {list.name}
        </List.Item>
      )}
    />
  );
};

export default ArchiveList;
