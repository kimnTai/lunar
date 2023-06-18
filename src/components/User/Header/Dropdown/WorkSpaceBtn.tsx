import { useNavigate } from "react-router";
import { ColorIcon } from "@/components/Icons";
import { useAppSelector } from "@/hooks";
import { selectBoard } from "@/redux/boardSlice";
import { selectOrganization } from "@/redux/organizationSlice";
import DropdownBtn from "./DropdownBtn";

function WorkSpaceBtn() {
  const organization = useAppSelector(selectOrganization);
  const board = useAppSelector(selectBoard);

  const navigate = useNavigate();

  return (
    <DropdownBtn
      title={"工作區"}
      items={organization.map(({ _id, name }) => ({
        key: _id,
        label: `${name} ${board.organizationId === _id ? "(目前的)" : ""}`,
        icon: (
          <ColorIcon
            text={`${name.at(0)}`}
            color={"white"}
            size={"24px"}
            fontSize={"14px"}
            background={"var(--blue)"}
          />
        ),
        onClick: () => {
          navigate(`/workspace/${_id}/home`);
        },
      }))}
    />
  );
}

export default WorkSpaceBtn;
