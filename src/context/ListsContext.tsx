import React, { ReactNode, createContext, useContext, useState } from "react";
import { ListsHeaderState } from "@/interfaces/lists";

interface ListsContextProps {
  showAddCard: boolean;
  setShowAddCard: React.Dispatch<React.SetStateAction<boolean>>;
  popoverState: ListsHeaderState;
  setPopoverState: React.Dispatch<React.SetStateAction<ListsHeaderState>>;
}

const ListsContext = createContext<ListsContextProps | null>(null);

export const ListsProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [popoverState, setPopoverState] = useState<ListsHeaderState>("NONE");
  return (
    <ListsContext.Provider
      value={{ showAddCard, setShowAddCard, popoverState, setPopoverState }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useListsContext = () => {
  const context = useContext(ListsContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
