import { Suspense } from "react";
import { HashRouter } from "react-router-dom";
import Router from "@/router";
import SpinPage from "@/pages/SpinPage";

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<SpinPage />}>
        <Router />
      </Suspense>
    </HashRouter>
  );
}
