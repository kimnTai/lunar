import { invitationApi } from "@/api/invitation";
import { useApi } from "@/hooks/useApiHook";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Invitation: React.FC<{ login: boolean }> = ({ login }) => {
  const navigate = useNavigate();
  const { type, invitationToken } = useParams();
  const [_result, _loading, callApi] = useApi(invitationApi);

  useEffect(() => {
    if (login || !invitationToken || !type) {
      return navigate("/login");
    }

    callApi({ type, invitationToken }).finally(() => {
      navigate("/");
    });
  }, [invitationToken]);

  return <></>;
};

export default Invitation;
