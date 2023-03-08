import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomeCss = styled.div``;

export const Home: React.FC = () => {
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  return <HomeCss>i am Home</HomeCss>;
};
