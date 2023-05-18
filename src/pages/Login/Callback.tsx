import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { PropsFromRedux } from "@/router";

const Callback: React.FC<{
  loginJwt: PropsFromRedux["loginJwt"];
  getOrganization: PropsFromRedux["getOrganization"];
}> = ({ loginJwt, getOrganization }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      (async () => {
        await loginJwt();
        await getOrganization();
      })();
    }
    navigate("/login");
  }, [token]);

  return <div></div>;
};

export default Callback;
