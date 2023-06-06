import { useAppDispatch } from "@/hooks";
import { deleteBoardAction } from "@/redux/boardSlice";
import { Button, ButtonProps } from "antd";
import { useState } from "react";

const WorkSpaceCardContent: React.FC<
  ButtonProps & {
    boardId: string;
  }
> = ({ boardId }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        type="text"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        分享看板
      </Button>
      <Button
        danger
        type="text"
        loading={loading}
        onClick={(e) => {
          e.stopPropagation();
          setLoading(true);

          dispatch(deleteBoardAction(boardId)).finally(() => {
            setLoading(false);
          });
        }}
      >
        刪除看板
      </Button>
      <div style={{ color: "red" }}></div>
    </>
  );
};

export default WorkSpaceCardContent;
