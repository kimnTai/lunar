import React, { ReactNode, createContext, useContext, useState } from "react";

interface ListsContextProps {
  showAddCard: boolean;
  setShowAddCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListsContext = createContext<ListsContextProps | null>(null);

export const ListsProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [showAddCard, setShowAddCard] = useState(false);
  return (
    <ListsContext.Provider value={{ showAddCard, setShowAddCard }}>
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
