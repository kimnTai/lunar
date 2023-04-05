import React, { useState } from "react";
import {
  ModalContentStyled,
  ModalLayoutStyled,
  ModalSidebarStyled,
} from "./style";
import {
  UserOutlined,
  ContainerOutlined,
  CopyOutlined,
  ShareAltOutlined,
  ArrowRightOutlined,
  WalletOutlined,
  PaperClipOutlined,
  ClockCircleOutlined,
  CheckSquareOutlined,
  TagOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Divider, Form } from "antd";
import TextEditor from "@/components/TextEditor";

const ModalStyle: React.CSSProperties = {
  backgroundColor: "var(--modal-background-color)",
  color: "var(--modal-color)",
};

const ModalSidebar: React.FC = () => {
  const SidebarBox: React.FC<{
    title: string;
    className?: string;
    data: any[];
  }> = ({ title, data, className }) => {
    return (
      <div className={className}>
        <h3>{title}</h3>
        <div className="action-list">
          {data.map((ele, idx) => (
            <a href="" className="button-link" key={idx}>
              <span style={{ marginRight: "6px" }}>{ele.icon}</span>
              <span>{ele.label}</span>
            </a>
          ))}
        </div>
      </div>
    );
  };
  return (
    <ModalSidebarStyled style={ModalStyle}>
      <SidebarBox
        title={"建議"}
        data={[{ label: "加入", value: "add", icon: <UserOutlined /> }]}
      />
      <SidebarBox
        className={"mid"}
        title={"新增至卡片"}
        data={[
          { label: "成員", value: "member", icon: <UserOutlined /> },
          { label: "標籤", value: "member", icon: <TagOutlined /> },
          { label: "代辦清單", value: "member", icon: <CheckSquareOutlined /> },
          { label: "日期", value: "member", icon: <ClockCircleOutlined /> },
          { label: "附件", value: "member", icon: <PaperClipOutlined /> },
          { label: "封面", value: "member", icon: <WalletOutlined /> },
        ]}
      />
      <SidebarBox
        className={"mid"}
        title={"動作"}
        data={[
          { label: "移動", value: "move", icon: <ArrowRightOutlined /> },
          { label: "複製", value: "copy", icon: <CopyOutlined /> },
        ]}
      />
      <Divider style={{ margin: "8px 0" }} />
      <a href="" className="button-link">
        <span style={{ marginRight: "6px" }}>
          <ContainerOutlined />
        </span>
        <span>封存</span>
      </a>
      <a href="" className="button-link">
        <span style={{ marginRight: "6px" }}>
          <ShareAltOutlined />
        </span>
        <span>分享</span>
      </a>
    </ModalSidebarStyled>
  );
};

const ModalContent: React.FC = () => {
  const [openTextEditor, setOpenTextEditor] = useState(false);
  const [text, setText] = useState("<p>還沒有資料暫時使用</p>");
  const [form] = Form.useForm();
  const onSubmit = (values: string) => {
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

const ModalLayout = () => {
  return (
    <ModalLayoutStyled style={ModalStyle}>
      <ModalContent />
      <ModalSidebar />
    </ModalLayoutStyled>
  );
};

export default ModalLayout;
