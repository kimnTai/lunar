import React, { useState } from "react";
import styled from "styled-components";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Form, Row, Col } from "antd";

const AddCardCss = styled(Form)<{ add: boolean }>`
  background-color: ${(props) => (props.add ? "white" : "#ffffff3d")};
  width: 276px;
  transition: all 0.3s ease;

  cursor: pointer;
  border-radius: 3px;
  .addCard {
    color: white;
    padding: 6px 4px;
  }
`;

const AddCard: React.FC = () => {
  const [add, setAdd] = useState(false);
  const handleClick = () => {
    setAdd(!add);
  };
  const formRef = useRef(null);
  console.log(formRef);
  return (
    <AddCardCss add={add}>
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
          }}
        >
          <Input
            type="text"
            name="name"
            placeholder="為列表輸入標題..."
            autoComplete="off"
          />
          <div
            style={{
              marginTop: "5px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button htmlType="submit" type="primary">
              新增列表
            </Button>
            <Button
              type="primary"
              icon={<CloseOutlined />}
              onClick={handleClick}
              style={{ marginLeft: "5px" }}
            />
          </div>
        </Col>
      </Row>
    </AddCardCss>
  );
};

export default AddCard;
function useRef(arg0: null) {
  throw new Error("Function not implemented.");
}
