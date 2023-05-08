import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Form, Row, Col } from "antd";
import type { InputRef } from "antd";
import { useDispatch } from "react-redux";
import CONSTANTS from "@/redux/constants";

const AddListCss = styled(Form)<{ useadd: string }>`
  height: ${(props) => (props.useadd === "true" ? "80px" : "32px")};
  width: 276px;
  cursor: pointer;
  border-radius: 3px;
  .addCard {
    color: white;
    padding: 6px 4px;
  }
`;

const AddList: React.FC = () => {
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
  const onFinish = () => {
    dispatch({
      type: CONSTANTS.CREATE_CARD_LIST,
      payload: text,
    });

    setAdd(false);
  };
  useEffect(() => {
    if (add) inputRef.current!.focus({ cursor: "start" });
  }, [add]);
  return (
    <AddListCss
      useadd={add.toString()}
      style={{ backgroundColor: add ? "white" : "#ffffff3d" }}
      onBlur={() => setAdd(false)}
      onMouseDown={handleMouseDown}
      onFinish={onFinish}
    >
      <Row>
        <a
          onClick={handleClick}
          className="addCard"
          style={{ display: add ? "none" : "block", width: "100%" }}
        >
          <Col flex="auto">
            <PlusOutlined style={{ fontSize: "16px", marginRight: "2px" }} />
            新增其他列表
          </Col>
        </a>
        <Col
          style={{
            display: add ? "block" : "none",
            padding: "5px",
            width: "100%",
            transition: "all 10s ease",
          }}
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <Input
              type="text"
              name="title"
              placeholder="為列表輸入標題..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoComplete="off"
              ref={inputRef}
            />
          </Form.Item>
          <Form.Item
            style={{
              marginTop: "5px",
              display: "flex",
              justifyContent: "center",
              marginBottom: 0,
            }}
          >
            <Button htmlType="submit" type="primary">
              新增列表
            </Button>
            <Button
              type="primary"
              icon={<CloseOutlined />}
              onClick={() => {
                setAdd(false);
              }}
              style={{ marginLeft: "5px" }}
            />
          </Form.Item>
        </Col>
      </Row>
    </AddListCss>
  );
};

export default AddList;
