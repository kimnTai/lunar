import React, { useState } from "react";
import styled from "styled-components";
import AddCard from "@/components/AddCard";

const HomeCss = styled.div``;

export const Home: React.FC = () => {
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  return (
    <HomeCss>
      <AddCard />
    </HomeCss>
  );
};
