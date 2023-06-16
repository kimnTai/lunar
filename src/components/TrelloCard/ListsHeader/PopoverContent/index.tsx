import { useListsContext } from "@/context/ListsContext";
import ActionContent from "./ActionContent";
import CloseCardContent from "./CloseCardContent";
import MoveListCardContent from "./MoveListCardContent";
import MoveContent from "./MoveContent";

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
    </>
  );
};

export default PopoverContent;
