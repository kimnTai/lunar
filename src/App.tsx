import React from "react";
import { useState } from "react";
import { AppRouter } from "@/router";
import { connect } from "react-redux";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppRouter />
    </>
  );
}

const mapStateToProps = (state: any) => ({});
export default connect(mapStateToProps, {})(App);
