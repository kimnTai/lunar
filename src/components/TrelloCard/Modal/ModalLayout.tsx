import ModalContent from "@/components/TrelloCard/Modal/ModalContent/index";
import ModalSidebar from "@/components/TrelloCard/Modal/ModalSidebar/index";
import { ModalLayoutStyled, ModalStyle } from "./style";

const ModalLayout: React.FC = () => {
  return (
    <ModalLayoutStyled style={ModalStyle}>
      <ModalContent />
      <ModalSidebar />
    </ModalLayoutStyled>
  );
};

export default ModalLayout;
