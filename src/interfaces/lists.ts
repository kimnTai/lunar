import { CardsProps } from "./cards";

export interface ListsProps {
  _id: string;
  name: string;
  position: string;
  boardId: string;
  card: CardsProps[];
  id: string;
}
