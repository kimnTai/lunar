import { useListsContext } from "@/context/ListsContext";
import ActionContent from "./ActionContent";
import CloneContent from "./CloneContent";
import CloseCardContent from "./CloseCardContent";
import MoveContent from "./MoveContent";
import MoveListCardContent from "./MoveListCardContent";

const PopoverContent: React.FC<{
  listId: string;
}> = ({ listId }) => {
  const { popoverState } = useListsContext();
  return (
    <>
      {popoverState === "ACTION" && <ActionContent listId={listId} />}
      {popoverState === "CLOSED_CARD" && <CloseCardContent listId={listId} />}
      {popoverState === "MOVE_CARD" && <MoveListCardContent listId={listId} />}
      {popoverState === "MOVE" && <MoveContent listId={listId} />}
      {popoverState === "CLONE" && <CloneContent listId={listId} />}
    </>
  );
};

export default PopoverContent;
