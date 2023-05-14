import { CardsProps } from "@/interfaces/cards";
import ModalContent from "@/components/TrelloCard/Modal/ModalContent/index";
import ModalSidebar from "@/components/TrelloCard/Modal/ModalSidebar/index";
import { ModalLayoutStyled, ModalStyle } from "./style";

const ModalLayout: React.FC<{ cardData: CardsProps }> = ({ cardData }) => {
  return (
    <ModalLayoutStyled style={ModalStyle}>
      <ModalContent cardData={cardData} />
      <ModalSidebar />
    </ModalLayoutStyled>
  );
};

export default ModalLayout;
