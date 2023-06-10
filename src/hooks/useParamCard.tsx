import { useParams } from "react-router";
import { useAppSelector } from ".";
import { selectCardById } from "@/redux/cardSlice";

export const useParamCard = () => {
  const { cardId } = useParams();
  const cardData = useAppSelector(selectCardById(cardId));

  return cardData;
};
