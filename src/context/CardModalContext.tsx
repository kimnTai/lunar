import React, { ReactNode, createContext, useEffect, useState } from "react";
import { CardsProps } from "@/interfaces/cards";

interface CardModalProviderProps {
  children: ReactNode;
}

export interface CardModalContextValue {
  cardData: CardsProps | null;
  setCardData: React.Dispatch<React.SetStateAction<CardsProps | null>>;
}

const CardModalContext = createContext<CardModalContextValue | null>(null);

export const CardModalProvider: React.FC<CardModalProviderProps> = ({
  children,
}) => {
  const [cardData, setCardData] = useState<CardsProps | null>(null);

  return (
    <CardModalContext.Provider value={{ cardData, setCardData }}>
      {children}
    </CardModalContext.Provider>
  );
};

export const useCardModalContext = () => {
  return React.useContext(CardModalContext) as CardModalContextValue;
};
