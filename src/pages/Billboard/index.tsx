import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getCardApi } from "@/api/cards";
import TrelloCardModal from "@/components/TrelloCard/Modal";
import { CardModalProvider } from "@/context/CardModalContext";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useWebSocket from "@/hooks/useWebSocket";
import { ListsProps } from "@/interfaces/lists";
import { UrlCardShareProps } from "@/interfaces/trelloCard";
import { getBoardByIdAction, selectBoard } from "@/redux/boardSlice";
import { changeWorkSpace, selectShowWorkSpace } from "@/redux/screenSlice";
import { getSocketChange } from "@/utils/cardFunc";
import BillboardHeader from "./BillboardHeader";
import DnDContext from "./DnDContext";

const Billboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const workSpace = useAppSelector(selectShowWorkSpace);
  const navigate = useNavigate();
  const [cardList, setCardList] = useState<ListsProps[]>([]);
  const { boardId, cardId } = useParams();
  const board = useAppSelector(selectBoard);
  const [isBoardLoading, setBoardLoading] = useState(false);
  const { data: socketEvent, sendMessage } = useWebSocket(
    boardId!,
    async (_: string) => {}
  );
  const [openModal, setOpenModal] = useState<UrlCardShareProps>({
    cardId: "",
    open: false,
  });

  useEffect(() => {
    if (socketEvent) {
      setCardList(getSocketChange(cardList, socketEvent)!);
    }
  }, [socketEvent]);

  useEffect(() => {
    if (boardId) {
      setBoardLoading(true);

      dispatch(getBoardByIdAction(boardId)).finally(() => {
        setBoardLoading(false);
      });
    }
  }, [boardId]);

  useEffect(() => {
    if (workSpace) {
      dispatch(changeWorkSpace());
    }
  }, [workSpace]);
  useEffect(() => {
    if (board.list) {
      const cloneList = JSON.parse(JSON.stringify(board.list));
      setCardList(cloneList);
      sendMessage({ type: "subscribe", boardId }); // socket
    }
    return () => sendMessage({ type: "unsubscribe", boardId });
  }, [board.list]);

  useEffect(() => {
    if (cardId && !openModal.open) {
      getCardApi(cardId).then(({ result: { boardId } }) => {
        navigate(`/board/${boardId}/cards/${cardId}`);
        setOpenModal({
          cardId: cardId,
          open: true,
        });
      });
    }
  }, [cardId]);

  return (
    <>
      {isBoardLoading ? (
        <Spin
          className="d-center"
          indicator={<LoadingOutlined spin style={{ fontSize: 96 }} />}
        />
      ) : (
        <>
          <BillboardHeader />
          <DnDContext
            setCardList={setCardList}
            cardList={cardList}
            setOpenModal={setOpenModal}
          />
          <CardModalProvider>
            <TrelloCardModal
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </CardModalProvider>
        </>
      )}
    </>
  );
};

export default React.memo(Billboard);
