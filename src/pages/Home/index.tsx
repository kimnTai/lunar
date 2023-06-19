import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import HomeContent from "./HomeContent";

export default function Home() {
  useEffect(() => {
    if (import.meta.env.PROD) {
      window.location.href = `https://lunar-sigma.vercel.app/`;
    }
  }, []);

  return import.meta.env.PROD ? (
    <></>
  ) : (
    <>
      <Header />
      <HomeContent />
      <Footer />
    </>
  );
}
