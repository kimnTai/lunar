import { useListsContext } from "@/context/ListsContext";
import ActionContent from "./ActionContent";
import ClosedContent from "./ClosedContent";

const PopoverContent: React.FC<{
  listId: string;
}> = ({ listId }) => {
  const { popoverState } = useListsContext();
  return (
    <>
      {popoverState === "ACTION" && <ActionContent listId={listId} />}
      {popoverState === "CLOSED" && <ClosedContent listId={listId} />}
    </>
  );
};

export default PopoverContent;
