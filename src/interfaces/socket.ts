import { CardsProps } from "./cards";
import { ListsProps } from "./lists";

export type SocketResultProps = ListsProps | CardsProps;

export interface SocketMessageProps {
  type: "subscribe" | "unsubscribe";
  boardId: string;
}
