import React, { useState, useEffect } from "react";
import AddList from "@/components/AddList";
import { TrelloCard } from "@/components/TrelloCard";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { BillboardStyled } from "./style";
import BillboardHeader from "./BillboardHeader";
import { useNavigate, useParams } from "react-router";
import { useApi } from "@/hooks/useApiHook";
import { getBoardApi } from "@/api/boards";
import { Spin } from "antd";
import { ListsProps } from "@/interfaces/lists";
import {
  updateCardInColumn,
  updateCardDiffColumn,
  updateColumn,
  getSocketChange,
} from "@/utils/cardFunc";
import type { PropsFromRedux } from "@/router";
import { useAppSelector } from "@/hooks/useAppSelector";
import useWebSocket from "@/hooks/useWebSocket";
import { LoadingOutlined } from "@ant-design/icons";
import { getCardApi } from "@/api/cards";
import { UrlCardShareProps } from "@/interfaces/trelloCard";
import { CardModalProvider } from "@/context/CardModalContext";
import TrelloCardModal from "@/components/TrelloCard/Modal";
import { useLocation } from "react-router-dom";

const Billboard: React.FC<{
  setWorkSpace: PropsFromRedux["changeWorkSpace"];
}> = ({ setWorkSpace }) => {
  const location = useLocation();
  console.log(location);
  const workSpace = useAppSelector((state) => state.screen.showWorkSpace);
  const navigate = useNavigate();
  const [hasLoadBoard, setHasLoadBoard] = useState(false);
  const [cardList, setCardList] = useState<ListsProps[]>([]);
  const { boardId, cardId } = useParams();
  const [boardResult, getBoardloading, callGetBoardApi] = useApi(getBoardApi);
  const { data: socketEvent, sendMessage } = useWebSocket(
    boardId!,
    callGetBoardApi
  );
  const [openModal, setOpenModal] = useState<UrlCardShareProps>({
    listId: "",
    cardId: "",
    open: false,
  });

  useEffect(() => {
    if (socketEvent) {
      setCardList(getSocketChange(cardList, socketEvent)!);
      console.log(getSocketChange(cardList, socketEvent)!);
    }
  }, [socketEvent]);

  useEffect(() => {
    if (boardId && !hasLoadBoard) {
      (async () => {
        setHasLoadBoard(true);
        await callGetBoardApi(boardId);
      })();
    }
  }, [boardId]);

  useEffect(() => {
    if (workSpace) {
      setWorkSpace();
    }
  }, [workSpace]);
  useEffect(() => {
    if (boardResult?.result) {
      setCardList(boardResult.result.list);
      sendMessage({ type: "subscribe", boardId }); // socket
    }
    return () => sendMessage({ type: "unsubscribe", boardId });
  }, [boardResult?.result]);

  useEffect(() => {
    if (cardId && !openModal.open) {
      (async () =>
        await getCardApi(cardId).then((res) => {
          if (res.status === "success") {
            navigate(`/board/${res.result.boardId}`);
            setOpenModal({
              listId: res.result.listId,
              cardId,
              open: true,
            });
          }
        }))();
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
      const data = updateColumn(result, cardList) as ListsProps[];
      setCardList(data);

      return;
    }
    if (source.droppableId === destination.droppableId) {
      // List 中間互換
      const data = updateCardInColumn(result, cardList) as ListsProps[];
      setCardList(data);
      return;
    }
    // card 移動
    const data = updateCardDiffColumn(result, cardList) as ListsProps[];
    setCardList(data);
  };

  return (
    <>
      {getBoardloading ? (
        <Spin
          className="d-center"
          indicator={<LoadingOutlined spin style={{ fontSize: 96 }} />}
        />
      ) : (
        <>
          <BillboardHeader
            boardInviteLink={boardResult?.result.inviteLink || ""}
            name={boardResult?.result.name || ""}
            member={boardResult?.result.member || []}
            orgId={boardResult?.result.organizationId || ""}
            callGetBoardApi={callGetBoardApi}
            boardId={boardId || ""}
            image={boardResult?.result?.image || ""}
            permission={boardResult?.result?.permission || ""}
            closed={boardResult?.result?.closed || false}
          />
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
                  <AddList
                    cardList={cardList}
                    boardId={boardId || ""}
                    callGetBoardApi={callGetBoardApi}
                  />
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
