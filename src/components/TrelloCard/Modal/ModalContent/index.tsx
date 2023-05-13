import React, { useState } from "react";
import { FormOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import TextEditor from "@/components/TextEditor";
import { ModalStyle, ModalContentStyled } from "./style";

const ModalContent: React.FC = () => {
  const [openTextEditor, setOpenTextEditor] = useState(false);
  const [text, setText] = useState("<p>還沒有資料暫時使用</p>");
  const [form] = Form.useForm();
  const onSubmit = (_values: string) => {
    form.resetFields();
    setOpenTextEditor(false);
  };

  return (
    <ModalContentStyled style={ModalStyle}>
      <div className="contentHeader">
        <FormOutlined />
        <h3 style={{ marginLeft: "10px" }}>描述</h3>
        <Button
          type={"text"}
          onClick={() => setOpenTextEditor(true)}
          style={{
            backgroundColor: "var(--modal-button-neutral)",
            marginLeft: "8px",
          }}
        >
          編輯
        </Button>
      </div>
      <div style={{ marginLeft: "40px" }}></div>
      {openTextEditor ? (
        <Form
          layout="vertical"
          form={form}
          onFinish={() => onSubmit(text)}
          name="control-textEditor"
        >
          <Form.Item>
            <TextEditor value={text} placeholder={""} onChange={setText} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              儲存
            </Button>
            <Button onClick={() => setOpenTextEditor(false)}>取消</Button>
          </Form.Item>
        </Form>
      ) : (
        <p dangerouslySetInnerHTML={{ __html: text }}></p>
      )}
    </ModalContentStyled>
  );
};

export default ModalContent;
