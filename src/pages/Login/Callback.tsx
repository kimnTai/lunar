import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const token = searchParams.get("token");
    if (!token) {
      return;
    }

    const userData = ["_id", "name", "email", "avatar"].reduce((pre, key) => {
      return {
        ...pre,
        [key]: searchParams.get(key),
      };
    }, {});

    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/login");
  });

  return <div></div>;
}
