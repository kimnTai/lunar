import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Spin, type InputRef } from "antd";
import { AddListProps } from "@/interfaces/lists";
import { nextPosition } from "@/utils/cardFunc";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectBoard } from "@/redux/boardSlice";
import { newListApiAction } from "@/redux/listSlice";

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
    padding: 4px 12px 4px 8px;
    width: 109px;
    height: 32px;
  }
  .addCard:hover {
    background-color: var(--black);
    border-radius: 8px;
  }
`;

const AddList: React.FC<AddListProps> = () => {
  const board = useAppSelector(selectBoard);
  const dispatch = useAppDispatch();

  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onFinish = async () => {
    setLoading(true);

    try {
      await dispatch(
        newListApiAction({
          name: text,
          boardId: board._id,
          position: `${nextPosition(board.list)}`,
        })
      );
    } catch (error) {}

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
          onMouseDown={(e) => e.preventDefault()}
          onFinish={onFinish}
        >
          <Row>
            <a
              onClick={() => {
                setAdd((pre) => !pre);
                setText("");
              }}
              className="addCard"
              style={{ display: add ? "none" : "block" }}
            >
              <Col flex="auto">
                <PlusOutlined
                  style={{
                    fontSize: "16px",
                    marginRight: "10px",
                  }}
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
                  disabled={text.length < 2}
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
