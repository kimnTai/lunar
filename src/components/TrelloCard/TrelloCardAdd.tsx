import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { EllipsisOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Form, Row, Col, Card } from "antd";
import type { InputRef } from "antd";
import { useDispatch } from "react-redux";
import { ADD_CARD } from "@/redux/constants";

const TrelloCardAddCss = styled(Card)<{ useadd: string }>`
  /* height: ${(props) => (props.useadd === "true" ? "80px" : "32px")}; */
  width: 100%;
  cursor: pointer;
  border-radius: 3px;
  .addCard {
    color: black;
    padding: 6px 4px;
  }
`;

const TrelloCardAdd: React.FC<{
  showAddCard: boolean;
  newTitle: string;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;
}> = ({ showAddCard, newTitle, setNewTitle }) => {
  const [add, setAdd] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleMouseDown = (e: any) => {
    e.preventDefault();
  };
  const handleClick = () => {
    setAdd(!add);
    setText("");
  };

  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    if (add) inputRef.current!.focus({ cursor: "start" });
  }, [add]);
  return (
    <TrelloCardAddCss useadd={showAddCard.toString()}>
      <input type="text" />
    </TrelloCardAddCss>
  );
};

export default TrelloCardAdd;
