import { BoardsProps } from "./boards";
import { CardsProps } from "./cards";

export interface SearchLunarMemberProps {
  query: string;
  organizationId?: string;
}

export interface SearchCardsProps {
  query: string;
}

export interface SearchCardsResultProps {
  card: CardsProps;
  board: Omit<BoardsProps, "list" | "label">;
}
