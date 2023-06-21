import React, { useState } from "react";
import { Button, Spin } from "antd";
import { useListsContext } from "@/context/ListsContext";
import { useAppDispatch } from "@/hooks";
import { closeListAllCardsAction } from "@/redux/listSlice";

const CloseCardContent: React.FC<{
  listId: string;
}> = ({ listId }) => {
  const dispatch = useAppDispatch();
  const { setPopoverState } = useListsContext();
  const [spinning, setSpinning] = useState(false);

  const onClick = async () => {
    setSpinning(true);
    try {
      await dispatch(closeListAllCardsAction(listId));
    } catch (error) {}
    setSpinning(false);
    setPopoverState("NONE");
  };

  return (
    <Spin spinning={spinning}>
      <p>
        {
          "將移除所有本看板中此列表上的卡片。如欲閱覽已封存的卡片並將卡片移回看板，請點選「選單」>「已封存的項目」。"
        }
      </p>
      <br></br>
      <Button
        danger
        type="primary"
        style={{
          width: "100%",
        }}
        onClick={onClick}
      >
        全部封存
      </Button>
    </Spin>
  );
};

export default CloseCardContent;
