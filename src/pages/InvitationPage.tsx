import { invitationApi } from "@/api/invitation";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InvitationPage: React.FC = () => {
  const isUserLogin = useAppSelector((state) => state.auth.login);
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
