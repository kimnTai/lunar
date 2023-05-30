import React, { ReactNode, createContext, useState } from "react";
import { CardsProps } from "@/interfaces/cards";

interface CardModalProviderProps {
  children: ReactNode;
}

export enum PopoverType {
  DATE = "DATE",
  CHECKLIST = "CHECKLIST",
  NONE = "NONE",
}

export interface PopoverPositionProps {
  top: number;
  left?: number;
  right?: number;
}

interface PopoverProps {
  isShow: boolean;
  type: PopoverType;
  position: PopoverPositionProps | null;
}

export interface CardModalContextValue {
  cardData: CardsProps | null;
  setCardData: React.Dispatch<React.SetStateAction<CardsProps | null>>;
  PopoverType: typeof PopoverType;
  openPopover: PopoverProps;
  setOpenPopover: React.Dispatch<React.SetStateAction<PopoverProps>>;
  handleClosePopover: () => void;
}

const initPopover: PopoverProps = {
  isShow: false,
  type: PopoverType.NONE,
  position: null,
};

const CardModalContext = createContext<CardModalContextValue | null>(null);

export const CardModalProvider: React.FC<CardModalProviderProps> = ({
  children,
}) => {
  const [cardData, setCardData] = useState<CardsProps | null>(null);
  const [openPopover, setOpenPopover] = useState<PopoverProps>(initPopover);

  const handleClosePopover = () => {
    setOpenPopover(initPopover);
  };

  return (
    <CardModalContext.Provider
      value={{
        cardData,
        setCardData,
        openPopover,
        PopoverType,
        setOpenPopover,
        handleClosePopover,
      }}
    >
      {children}
    </CardModalContext.Provider>
  );
};

export const useCardModalContext = () => {
  return React.useContext(CardModalContext) as CardModalContextValue;
};
