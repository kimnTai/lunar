import { useEffect, useState } from "react";
import { Spin } from "antd";
import { getBoardClosedItemsApi } from "@/api/boards";
import { useAppSelector } from "@/hooks";
import { ClosedItemsProps } from "@/interfaces/boards";
import { selectBoard } from "@/redux/boardSlice";
import ArchiveCard from "./ArchiveCard";
import ArchiveList from "./ArchiveList";

const ArchiveContent: React.FC = () => {
  const board = useAppSelector(selectBoard);
  const [data, setData] = useState<ClosedItemsProps>({
    closedList: [],
    closedCard: [],
  });
  const [spinning, setSpinning] = useState(false);
  const [state, setState] = useState<"CARD" | "LIST">("CARD");

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
    <Spin spinning={spinning}>
      {state === "CARD" && (
        <ArchiveCard
          data={data}
          setData={setData}
          setSpinning={setSpinning}
          setState={setState}
        />
      )}
      {state === "LIST" && (
        <ArchiveList
          data={data}
          setData={setData}
          setSpinning={setSpinning}
          setState={setState}
        />
      )}
    </Spin>
  );
};

export default ArchiveContent;
