import React, { useState } from "react";
import { DeleteOrgModalCss } from "./style";
import { Button, Form, Input } from "antd";
import { deleteOrganizationApi } from "@/api/organization";
import { OrganizationProps } from "@/interfaces/organization";
import { useNavigate } from "react-router-dom";
import { getOrganizationsAction } from "@/redux/organizationSlice";
import { useAppDispatch } from "@/hooks";

const DeleteOrganization: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  organizationId?: string;
  userOrganization?: OrganizationProps;
}> = ({ open, setOpen, organizationId, userOrganization }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setIsButtonDisabled(value !== userOrganization?.name);
  };

  const onCancel = () => {
    setOpen(false);
  };

  const [buttonLoading, setButtonLoading] = useState(false);
  const onFinish = async () => {
    if (!organizationId) {
      return;
    }
    setButtonLoading(true);

    deleteOrganizationApi({
      organizationId: organizationId,
    })
      .then(() => dispatch(getOrganizationsAction()))
      .finally(() => {
        navigate(`/`);
        onCancel();
        setButtonLoading(false);
      });
  };
  return (
    <DeleteOrgModalCss
      title={<p style={{ textAlign: "center" }}>要刪除此工作區嗎？</p>}
      width={332}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <p
          style={{
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          輸入要刪除的工作區名稱「{userOrganization?.name}」
        </p>
        <div className="delete-org-reminder">
          <span
            style={{
              fontWeight: "700",
              fontSize: "12px",
              lineHeight: "24px",
              color: "var(--gray9f)",
            }}
          >
            須知事項：
          </span>
          <ul className="reminder-list">
            <li> 此為永久性動作，將無法復原。</li>
            <li> 此工作區所有的看板都將被關閉。</li>
            <li> 板主可以重新開啟看板。</li>
            <li> 看板成員將無法與關閉的看板互動。</li>
          </ul>
        </div>
        <Form.Item label="輸入工作區名稱以刪除：" name="name">
          <Input type="text" onChange={handleInputChange}></Input>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={buttonLoading}
          style={{
            width: "100%",
            height: "34px",
            textAlign: "center",
            margin: "8px 0px",
          }}
          block
          danger
          disabled={isButtonDisabled}
        >
          刪除工作區
        </Button>
      </Form>
    </DeleteOrgModalCss>
  );
};

export default DeleteOrganization;
