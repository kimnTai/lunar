import { useState } from "react";
import { Button, Form, Select } from "antd";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { CloseOutlined } from "@ant-design/icons";
import { updateBoardApi } from "@/api/boards";
import { useNavigate } from "react-router";
import {
  getOrganizationByIdAction,
  selectOrganization,
} from "@/redux/organizationSlice";
import { BoardsProps } from "@/interfaces/boards";

const SettingContent: React.FC<{ board?: BoardsProps }> = ({ board }) => {
  const [isShowChangeWorkSpace, setIsShowChangeWorkSpace] = useState(false);
  const [isShowChangePeople, setIsShowChangePeople] = useState(false);
  const [people, setPeople] = useState("成員");

  const userOrganization = useAppSelector(selectOrganization);
  const orgName = userOrganization.find(
    (ele) => ele._id === board?.organizationId
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ChangeWorkSpaceClick = () => {
    setIsShowChangeWorkSpace(true);
  };

  const CommentPurviewClick = () => {
    setIsShowChangePeople(true);
  };

  const PeopleClick = (e: any) => {
    let str = e.currentTarget.innerText.split("\n\n")[0];
    setPeople(str);
    setIsShowChangePeople(false);
  };

  const onFinish = (values: any) => {
    if (!board) {
      return;
    }
    const changeData = {
      name: board?.name,
      organizationId: values.orgID,
      permission: board?.permission,
      closed: closed,
      image: board?.image,
      boardId: board?._id,
    };
    console.log(changeData);
    updateBoardApi({
      name: board.name,
      organizationId: values.orgID,
      permission: board.permission,
      closed: closed,
      image: board.image,
      boardId: board._id,
    }).then((res) => {
      console.log(res);
      dispatch(getOrganizationByIdAction(values.orgID));
      navigate(`/workspace/${values.orgID}/home`);
    });
  };

  return (
    <>
      <div className="top-border">
        <Button
          type="text"
          onClick={ChangeWorkSpaceClick}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "0 12px",
            height: "64px",
            lineHeight: "32px",
          }}
        >
          變更工作區...
          <p
            style={{
              fontSize: "12px",
              marginTop: "-10px",
              marginLeft: "2px",
              color: "gray",
            }}
          >
            {orgName?.name}
          </p>
        </Button>
      </div>
      <div className="top-border">
        <Button
          type="text"
          onClick={CommentPurviewClick}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "0 12px",
            height: "64px",
            lineHeight: "32px",
          }}
        >
          評論權限...
          <p
            style={{
              fontSize: "12px",
              marginTop: "-10px",
              marginLeft: "2px",
              color: "gray",
            }}
          >
            {people}
          </p>
        </Button>
      </div>
      {isShowChangeWorkSpace ? (
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
              onClick={() => setIsShowChangeWorkSpace(false)}
            />
          </div>
          <div className="">
            <div style={{ position: "relative" }}>
              <Form
                // form={form}
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
                  >
                    {userOrganization &&
                      userOrganization?.map((ele, idx) => (
                        <Select.Option value={ele._id} key={idx}>
                          {ele.name}
                        </Select.Option>
                      ))}
                  </Select>
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
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      ) : null}
      {isShowChangePeople ? (
        <div className="peopleView">
          <div className="peopleTitle">
            <p>評論權限</p>
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
              onClick={() => setIsShowChangePeople(false)}
            />
          </div>
          <div className="peopleContent">
            <Button
              type="text"
              onClick={PeopleClick}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0 12px",
                height: "64px",
                lineHeight: "32px",
              }}
            >
              Disabled
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginLeft: "2px",
                  color: "gray",
                }}
              >
                沒有人可以發表評論
              </p>
            </Button>
            <Button
              type="text"
              onClick={PeopleClick}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0 12px",
                height: "64px",
                lineHeight: "32px",
              }}
            >
              成員
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginLeft: "2px",
                  color: "gray",
                }}
              >
                管理員及成員可以發表評論
              </p>
            </Button>
            <Button
              type="text"
              onClick={PeopleClick}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0 12px",
                height: "64px",
                lineHeight: "32px",
              }}
            >
              工作區成員
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginLeft: "2px",
                  color: "gray",
                }}
              >
                此工作區的所有成員皆可發表評論
              </p>
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SettingContent;
