import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { loginJwtAction } from "@/redux/userSlice";
import { getOrganizationsAction } from "@/redux/organizationSlice";
import Cookie from "@/utils/cookie";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      Cookie.set("lunar-token", token);

      Promise.all([
        dispatch(loginJwtAction()),
        dispatch(getOrganizationsAction()),
      ]).finally(() => {
        navigate("/login");
      });
    }
  }, [token]);

  return <div></div>;
};

export default Callback;
