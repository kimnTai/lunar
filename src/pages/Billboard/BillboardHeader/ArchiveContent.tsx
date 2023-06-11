import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { getBoardClosedItemsApi } from "@/api/boards";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { ClosedItemsProps } from "@/interfaces/boards";
import { selectBoard } from "@/redux/boardSlice";
import { deleteCardAction, moveCardAction } from "@/redux/cardSlice";
import { updateListAction } from "@/redux/listSlice";

const ArchiveContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const [data, setData] = useState<ClosedItemsProps>();
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setSpinning(true);

    getBoardClosedItemsApi(board._id)
      .then(({ result }) => {
        setData(result);
      })
      .finally(() => {
        setSpinning(false);
      });
  }, []);

  return (
    <Spin
      spinning={spinning}
      className="top-border"
      style={{ paddingBottom: 0 }}
    >
      <>
        <p>卡片</p>
        {data?.closedCard.map(({ name, _id }) => (
          <div key={_id}>
            {name}
            <Button
              type="primary"
              onClick={async () => {
                setSpinning(true);
                try {
                  await dispatch(
                    moveCardAction({
                      cardId: _id,
                      closed: false,
                    })
                  );
                  setData({
                    ...data,
                    closedCard: data.closedCard.filter(
                      (item) => item._id !== _id
                    ),
                  });
                } catch (error) {}
                setSpinning(false);
              }}
            >
              發送到看板
            </Button>
            <Button
              danger
              type="primary"
              onClick={async () => {
                setSpinning(true);
                try {
                  await dispatch(deleteCardAction(_id));
                  setData({
                    ...data,
                    closedCard: data.closedCard.filter(
                      (item) => item._id !== _id
                    ),
                  });
                } catch (error) {}
                setSpinning(false);
              }}
            >
              刪除
            </Button>
          </div>
        ))}
      </>
      <br />
      <>
        <p>列表</p>
        {data?.closedList.map(({ name, _id }) => (
          <div key={_id}>
            {name}
            <Button
              type="primary"
              onClick={async () => {
                setSpinning(true);
                try {
                  await dispatch(
                    updateListAction({
                      listId: _id,
                      closed: false,
                    })
                  );
                  setData({
                    ...data,
                    closedList: data.closedList.filter(
                      (item) => item._id !== _id
                    ),
                  });
                } catch (error) {}
                setSpinning(false);
              }}
            >
              發送到看板
            </Button>
          </div>
        ))}
      </>
    </Spin>
  );
};

export default ArchiveContent;
