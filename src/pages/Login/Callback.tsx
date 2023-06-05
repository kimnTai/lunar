import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { loginJwtAction } from "@/redux/userSlice";
import Cookie from "@/utils/cookie";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      Cookie.set("lunar-token", token);

      dispatch(loginJwtAction()).finally(() => {
        navigate("/login");
      });
    }
  }, [token]);

  return <></>;
};

export default Callback;
