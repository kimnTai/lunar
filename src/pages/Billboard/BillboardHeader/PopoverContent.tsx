import { PopoverContentProps } from "@/interfaces/boards";
import LabelContent from "./Label/LabelContent";
import MenuContent from "./MenuContent";
import SettingContent from "./SettingContent";
import UserContent from "./UserContent";
import { PopoverContentStyle } from "./style";

const PopoverContent: React.FC<PopoverContentProps> = ({
  board,
  callGetBoardApi,
  headerState,
  setHeaderState,
}) => {
  return (
    <PopoverContentStyle>
      {headerState === "MENU" && (
        <MenuContent setHeaderState={setHeaderState} />
      )}
      {headerState === "USER" && <UserContent member={board?.member || []} />}
      {headerState === "SETTING" && <SettingContent board={board} />}
      {headerState === "LABEL" && (
        <LabelContent callGetBoardApi={callGetBoardApi} />
      )}
    </PopoverContentStyle>
  );
};

export default PopoverContent;
