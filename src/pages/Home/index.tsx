import { Navigate } from "react-router";

export default function Home() {
  if (import.meta.env.PROD) {
    window.location.href = "https://lunar-sigma.vercel.app/";
    return null;
  }

  return <Navigate to="/login" />;
}
