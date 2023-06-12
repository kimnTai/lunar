import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import TrelloCardModal from "@/components/TrelloCard/Modal";
import { CardModalProvider } from "@/context/CardModalContext";
import { WebSocketProvider } from "@/context/WebsocketContext";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getBoardByIdAction } from "@/redux/boardSlice";
import { changeWorkSpace, selectShowWorkSpace } from "@/redux/screenSlice";
import BillboardHeader from "./BillboardHeader";
import DnDContext from "./DnDContext";

const Billboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const workSpace = useAppSelector(selectShowWorkSpace);
  const [isBoardLoading, setBoardLoading] = useState(false);

  useEffect(() => {
    if (boardId) {
      setBoardLoading(true);

      dispatch(getBoardByIdAction(boardId)).finally(() => {
        setBoardLoading(false);
      });
    }

    if (workSpace) {
      dispatch(changeWorkSpace());
    }
  }, [boardId, workSpace]);

  return (
    <WebSocketProvider>
      {isBoardLoading ? (
        <Spin
          className="d-center"
          indicator={<LoadingOutlined spin style={{ fontSize: 96 }} />}
        />
      ) : (
        <>
          <BillboardHeader />
          <DnDContext />
          <CardModalProvider>
            <TrelloCardModal />
          </CardModalProvider>
        </>
      )}
    </WebSocketProvider>
  );
};

export default React.memo(Billboard);
