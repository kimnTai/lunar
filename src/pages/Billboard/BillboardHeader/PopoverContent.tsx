import { PopoverContentProps } from "@/interfaces/boards";
import LabelContent from "./Label/LabelContent";
import MenuContent from "./MenuContent";
import SettingContent from "./SettingContent";
import UserContent from "./UserContent";
import { PopoverContentStyle } from "./style";

const PopoverContent: React.FC<PopoverContentProps> = ({
  headerState,
  setHeaderState,
}) => {
  return (
    <PopoverContentStyle>
      {headerState === "MENU" && (
        <MenuContent setHeaderState={setHeaderState} />
      )}
      {headerState === "USER" && <UserContent />}
      {headerState === "SETTING" && <SettingContent />}
      {headerState === "LABEL" && <LabelContent />}
    </PopoverContentStyle>
  );
};

export default PopoverContent;
