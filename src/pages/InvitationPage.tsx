import { invitationApi } from "@/api/invitation";
import { useAppSelector } from "@/hooks";
import { selectAuth } from "@/redux/userSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InvitationPage: React.FC = () => {
  const isUserLogin = useAppSelector(selectAuth);
  const { type, invitationToken } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLogin || !invitationToken || !type) {
      return navigate("/login");
    }

    invitationApi({ type, invitationToken }).finally(() => {
      navigate("/");
    });
  }, [invitationToken]);

  return <></>;
};

export default InvitationPage;
