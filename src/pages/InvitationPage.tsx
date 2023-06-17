import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { invitationApi } from "@/api/invitation";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { invitationOrganizationAction } from "@/redux/organizationSlice";
import { selectAuth } from "@/redux/userSlice";

const InvitationPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isUserLogin = useAppSelector(selectAuth);
  const { type, invitationToken } = useParams();

  useEffect(() => {
    if (!isUserLogin || !invitationToken || !type) {
      return navigate("/login");
    }

    if (type === "organizations") {
      dispatch(invitationOrganizationAction(invitationToken)).finally(() => {
        navigate("/");
      });
      return;
    }

    invitationApi({ type, invitationToken }).finally(() => {
      navigate("/");
    });
  }, [invitationToken]);

  return <></>;
};

export default InvitationPage;
