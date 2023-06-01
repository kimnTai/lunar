import { useNavigate } from "react-router";
import { DropdownBtn } from "@/components/DropdownBtn";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { changeWorkSpaceAction } from "@/redux/actions/ScreenAction";

const DropdownBtnGroup: React.FC = () => {
  const showWorkSpace = useAppSelector((state) => state.screen.showWorkSpace);
  const organization = useAppSelector((state) => state.user.organization);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        display: showWorkSpace ? "none" : "flex",
      }}
    >
      <DropdownBtn
        items={organization.map(({ _id, name }) => ({
          key: _id,
          label: (
            <a
              onClick={() => {
                navigate(`/workspace/${_id}/home`);
                changeWorkSpaceAction()(dispatch);
              }}
            >
              {name}
            </a>
          ),
        }))}
        title={"工作區"}
      />
      <DropdownBtn
        items={[
          {
            label: "Submit and continue",
            key: "1",
          },
        ]}
        title={"最近的"}
      />
    </div>
  );
};

export default DropdownBtnGroup;
