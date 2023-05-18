import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Form, Row, Col, Spin } from "antd";
import type { InputRef } from "antd";
import { AddListProps } from "@/interfaces/lists";
import { newListApi } from "@/api/lists";
import { nextPosition } from "@/utils/cardFunc";

const AddListCss = styled(Form)<{ useadd: string }>`
  height: ${(props) => (props.useadd === "true" ? "88px" : "40px")};
  display: flex;
  background-color: ${(props) =>
    props.useadd === "true" ? "var(--gray66)" : "var(--black23)"};
  min-width: 280px;
  width: 280px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  .addCard {
    color: white;
    font-size: 16px;
    font-weight: 700;
  }
`;

const AddList: React.FC<AddListProps> = ({ cardList, boardId, callApi }) => {
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef<InputRef>(null);

  const handleMouseDown = (e: any) => {
    e.preventDefault();
  };
  const handleClick = () => {
    setAdd(!add);
    setText("");
  };
  const onFinish = async () => {
    setLoading(true);
    await newListApi({
      name: text,
      boardId: boardId,
      position: nextPosition(cardList).toString(),
    })
      .then((res) => {
        if (res.status === "success") {
          callApi(boardId);
        }
      })
      .catch(() => setLoading(false));
    setLoading(false);
    setAdd(false);
  };

  useEffect(() => {
    if (add) {
      inputRef.current!.focus({ cursor: "start" });
    }
  }, [add]);

  return (
    <>
      {loading ? (
        <div>
          <Spin />
        </div>
      ) : (
        <AddListCss
          useadd={add.toString()}
          onBlur={() => setAdd(false)}
          onMouseDown={handleMouseDown}
          onFinish={onFinish}
        >
          <Row>
            <a
              onClick={handleClick}
              className="addCard"
              style={{ display: add ? "none" : "block" }}
            >
              <Col flex="auto">
                <PlusOutlined
                  style={{ fontSize: "16px", marginRight: "2px" }}
                />
                新增列表
              </Col>
            </a>
            <Col
              style={{
                display: add ? "block" : "none",
                width: "100%",
                transition: "all 10s ease",
              }}
            >
              <Form.Item style={{ marginBottom: 0 }}>
                <Input
                  type="text"
                  name="title"
                  placeholder="輸入標題"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  autoComplete="off"
                  ref={inputRef}
                  style={{ width: "224px" }}
                />
                <Button
                  type="text"
                  icon={<CloseOutlined style={{ color: "white" }} />}
                  onClick={() => {
                    setAdd(false);
                  }}
                  style={{ marginLeft: "5px" }}
                />
              </Form.Item>
              <Form.Item
                style={{
                  marginTop: "8px",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 0,
                }}
              >
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ padding: "4px 12px" }}
                >
                  新增
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </AddListCss>
      )}
    </>
  );
};

export default AddList;
