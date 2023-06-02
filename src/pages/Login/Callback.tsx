import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { loginJwtAction } from "@/redux/userSlice";
import { getOrganizationsAction } from "@/redux/organizationSlice";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

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
