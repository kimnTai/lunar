import React from "react";
import { MemberModalCss } from "./style";
import { Button, Form } from "antd";
import { OrganizationMemberProps } from "@/interfaces/organization";
import { deleteOrganizationMemberApi } from "@/api/organization";
import { useApi } from "@/hooks/useApiHook";
import { PropsFromRedux } from "@/router";

const RemoveMember: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  organizationId: string;
  getOrganization: PropsFromRedux["getOrganization"];
  selectedMember: OrganizationMemberProps | null;
}> = ({ open, setOpen, organizationId, getOrganization, selectedMember }) => {
  const userId = selectedMember?.userId._id;

  const onCancel = () => {
    setOpen(false);
  };

  const [_result, loading, callApi] = useApi(deleteOrganizationMemberApi);

  const onFinish = async () => {
    await callApi({
      organizationId,
      memberId: userId || "",
    });
    await getOrganization();

    onCancel();
  };
  return (
    <MemberModalCss
      title={<p style={{ textAlign: "center" }}>移除或停用成員</p>}
      width={332}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        // form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="exit">
          <Button
            type="text"
            htmlType="submit"
            loading={loading}
            style={{
              width: "100%",
              height: "80px",
              textAlign: "left",
              margin: "8px 0px",
            }}
            block
          >
            <p
              style={{
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              {selectedMember?.role === "manager"
                ? "離開工作區"
                : "從工作區中移除"}
            </p>
            移除所有對此工作區的存取動作。
          </Button>
        </Form.Item>
      </Form>
    </MemberModalCss>
  );
};
export default RemoveMember;
