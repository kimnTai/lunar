import { Button, Form, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectBoard, updateBoardAction } from "@/redux/boardSlice";
import {
  getOrganizationByIdAction,
  selectOrganization,
} from "@/redux/organizationSlice";
import { useState } from "react";

const EditWorkSpace: React.FC<{
  setState: React.Dispatch<
    React.SetStateAction<"NONE" | "WORKSPACE" | "PEOPLE">
  >;
}> = ({ setState }) => {
  const board = useAppSelector(selectBoard);
  const userOrganization = useAppSelector(selectOrganization);
  const orgName = userOrganization.find(
    ({ _id }) => _id === board?.organizationId
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { orgID: string; boardOrgName: never }) => {
    if (!board) {
      return;
    }
    setLoading(true);

    await dispatch(
      updateBoardAction({
        organizationId: values.orgID,
        permission: board.permission,
        boardId: board._id,
      })
    );
    await dispatch(getOrganizationByIdAction(values.orgID));
    setLoading(false);
    navigate(`/workspace/${values.orgID}/home`);
  };
  return (
    <div className="changeWorkSpaceView">
      <div className="peopleTitle">
        <p>變更工作區</p>
        <Button
          size="small"
          type="text"
          icon={
            <CloseOutlined
              style={{
                color: "var(--gray66)",
              }}
            />
          }
          style={{ position: "absolute", right: 3 }}
          onClick={() => setState("NONE")}
        />
      </div>
      <div className="">
        <div style={{ position: "relative" }}>
          <Form
            onFinish={onFinish}
            style={{
              maxWidth: 400,
              padding: "0 12px",
              width: "310px",
            }}
          >
            <Form.Item
              name="orgID"
              label="該看板隸屬於"
              style={{ marginTop: "-3px" }}
            >
              <Select
                placeholder={orgName?.name}
                allowClear
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "-60px",
                  width: "120%",
                  marginLeft: "-38px",
                }}
                options={userOrganization.map(({ _id, name }) => ({
                  value: _id,
                  label: name,
                }))}
              />
            </Form.Item>
            <Form.Item name="boardOrgName">
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  position: "absolute",
                  width: "80%",
                  top: "15px",
                  left: "-2px",
                }}
                loading={loading}
              >
                修改
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditWorkSpace;
