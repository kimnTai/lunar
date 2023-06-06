import React, { useState, useEffect } from "react";
import AddList from "@/components/AddList";
import { TrelloCard } from "@/components/TrelloCard";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { BillboardStyled } from "./style";
import BillboardHeader from "./BillboardHeader";
import { useNavigate, useParams } from "react-router";
import { getBoardByIdAction, selectBoard } from "@/redux/boardSlice";
import { Spin } from "antd";
import { ListsProps } from "@/interfaces/lists";
import {
  updateCardInColumn,
  updateCardDiffColumn,
  updateColumn,
  getSocketChange,
} from "@/utils/cardFunc";
import { useAppSelector, useAppDispatch } from "@/hooks";
import useWebSocket from "@/hooks/useWebSocket";
import { LoadingOutlined } from "@ant-design/icons";
import { getCardApi } from "@/api/cards";
import { UrlCardShareProps } from "@/interfaces/trelloCard";
import { CardModalProvider } from "@/context/CardModalContext";
import TrelloCardModal from "@/components/TrelloCard/Modal";
import { changeWorkSpace, selectShowWorkSpace } from "@/redux/screenSlice";

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
    listId: "",
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
      getCardApi(cardId).then((res) => {
        if (res.status === "success") {
          navigate(`/board/${res.result.boardId}`);
          setOpenModal({
            listId: res.result.listId,
            cardId,
            open: true,
          });
        }
      });
    }
  }, [cardId]);
  const onDragEnd = (result: DropResult) => {
    const source = result.source;
    const destination = result.destination;
    // 未移動
    if (
      (source.index === destination?.index &&
        source.droppableId === destination.droppableId) ||
      !destination
    ) {
      return;
    }
    // Column 互換
    if (result.type === "COLUMN") {
      const data = updateColumn(result, cardList);
      setCardList(data);

      return;
    }
    if (source.droppableId === destination.droppableId) {
      // List 中間互換
      const data = updateCardInColumn(result, cardList);
      setCardList(data);
      return;
    }
    // card 移動
    const data = updateCardDiffColumn(result, cardList);
    setCardList(data);
  };

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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="board"
              type="COLUMN"
              direction="horizontal"
              ignoreContainerClipping={false}
              isCombineEnabled={false}
            >
              {(provided) => (
                <BillboardStyled
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cardList
                    .sort((a, b) => Number(a.position) - Number(b.position))
                    .map((ele, index) => (
                      <TrelloCard
                        key={ele.id}
                        index={index}
                        quotes={ele}
                        isScrollable={true}
                        isCombineEnabled={false}
                        useClone={undefined}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                      />
                    ))}
                  {provided.placeholder}
                  <AddList />
                </BillboardStyled>
              )}
            </Droppable>
          </DragDropContext>
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
