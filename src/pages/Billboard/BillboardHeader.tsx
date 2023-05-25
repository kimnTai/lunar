import React, { useState, useEffect } from "react";
import {
  BillboardHeaderProps,
  PopoverTitleProps,
  PopoverContentProps,
} from "@/interfaces/boards";
import {
  BillboardHeaderCss,
  BillboardHeaderBtn,
  PopoverTitleStyle,
  PopoverContentStyle,
} from "./style";
import { ColorIcon } from "@/components/Icons";
import {
  FilterOutlined,
  TeamOutlined,
  DashOutlined,
  CloseOutlined,
  UserOutlined,
  SettingOutlined,
  TagOutlined,
  InboxOutlined,
  UploadOutlined,
  LogoutOutlined,
  LeftOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Popover, Form, Select, Input, Space } from "antd";
import AddMember from "@/components/Modal/AddMember";
import ListButton from "@/components/ListButton";
import CloneBoardButton from "@/components/CloneBoardButton";
import { useAppSelector } from "@/hooks/useAppSelector";

interface Label {
  labelName: string;
  color: string;
}


const PopoverTitle: React.FC<PopoverTitleProps> = (props) => {
  const {
    isMenu,
    isUser,
    isSetting,
    isLabel,
    setIsMenu,
    setOpenPopover,
    setIsUser,
    setIsSetting,
    setIsLabel,
  } = props;
  const handleClick = () => {
    setOpenPopover(false);
    setIsUser(false);
    setIsSetting(false);
    setIsLabel(false);
    setIsMenu(true);
  };
  const previousClick = () => {
    setIsMenu(true);
    setIsUser(false);
    setIsSetting(false);
    setIsLabel(false);
  };

  return (
    <PopoverTitleStyle>
      {isMenu ? (
        <>
          選單
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
            onClick={handleClick}
          />
        </>
      ) : null}
      {isUser ? (
        <>
          查看看板管理員
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
            onClick={handleClick}
          />
          <Button
            size="small"
            type="text"
            style={{ position: "absolute", left: -2, top: 2 }}
            icon={
              <LeftOutlined
                style={{ color: "var(--gray66)", fontSize: "16px" }}
              />
            }
            onClick={previousClick}
          />
        </>
      ) : null}
      {isSetting ? (
        <>
          設定
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
            onClick={handleClick}
          />
          <Button
            size="small"
            type="text"
            style={{ position: "absolute", left: -2, top: 2 }}
            icon={
              <LeftOutlined
                style={{ color: "var(--gray66)", fontSize: "16px" }}
              />
            }
            onClick={previousClick}
          />
        </>
      ) : null}
      {isLabel ? (
        <>
          標籤
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
            onClick={handleClick}
          />
          <Button
            size="small"
            type="text"
            style={{ position: "absolute", left: -2, top: 2 }}
            icon={
              <LeftOutlined
                style={{ color: "var(--gray66)", fontSize: "16px" }}
              />
            }
            onClick={previousClick}
          />
        </>
      ) : null}
    </PopoverTitleStyle>
  );
};

const PopoverContent: React.FC<PopoverContentProps> = (props) => {
  const {
    name,
    member,
    orgId,
    cardList,
    isUser,
    isMenu,
    isSetting,
    isLabel,
    setIsUser,
    setIsMenu,
    setIsSetting,
    setIsLabel,
  } = props;
  const [isShowChangeWorkSpace, setIsShowChangeWorkSpace] = useState(false);
  const [isShowChangePeople, setIsShowChangePeople] = useState(false);
  const [people, setPeople] = useState("成員");
  const { Option } = Select;
  const [form] = Form.useForm();
  const userOrganization = useAppSelector((state) => state.user.organization);
  const orgName = userOrganization.find((ele) => ele._id === orgId);
  const boardManager = member?.filter((ele) => ele.role === "manager");
  const [labelList, setLabelList] = useState<Label[]>([]);
  const list: Label[] = [];

  useEffect(() => {
    cardList?.map((ele) => {
      ele.card.map((ele) => {
        ele.label.map((ele) => {
          const newData: Label = {
            labelName: ele.name,
            color: ele.color,
          };
          list.push(newData);
        });
      });
    });
    const filteredList = list.filter((item, index, self) =>
      index === self.findIndex((t) => t.labelName === item.labelName && t.color === item.color)
    );
    setLabelList(filteredList);
  }, [cardList]);


  const click = (e: any) => {
    console.log(e.target.innerText);
    switch (e.target.innerText) {
      case "查看看板管理員":
        setIsMenu(false);
        setIsUser(true);
        break;
      case "設定":
        setIsMenu(false);
        setIsSetting(true);
        break;
      case "標籤":
        setIsMenu(false);
        setIsLabel(true);
        break;

      default:
        break;
    }
  };

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
    console.log(values);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }

  return (
    <PopoverContentStyle>
      {isMenu ? (
        <>
          <div className="top-border listBtn">
            <ListButton
              icon={
                <UserOutlined
                  style={{ fontSize: "20px", marginRight: "12px" }}
                />
              }
              text="查看看板管理員"
              onClick={click}
            />
            <ListButton
              icon={
                <SettingOutlined
                  style={{ fontSize: "20px", marginRight: "12px" }}
                />
              }
              text="設定"
              onClick={click}
            />
            <ListButton
              icon={
                <TagOutlined
                  style={{ fontSize: "20px", marginRight: "12px" }}
                />
              }
              text="標籤"
              onClick={click}
            />
            <ListButton
              icon={
                <InboxOutlined
                  style={{ fontSize: "20px", marginRight: "12px" }}
                />
              }
              text="已封存的項目"
              onClick={click}
            />
          </div>
          <div className="top-border listBtn">
            <CloneBoardButton />
            <ListButton
              icon={
                <UploadOutlined
                  style={{ fontSize: "20px", marginRight: "12px" }}
                />
              }
              text="分享"
              onClick={click}
            />
          </div>
          <div className="top-border" style={{ paddingBottom: 0 }}>
            <ListButton
              icon={
                <LogoutOutlined
                  style={{ fontSize: "20px", marginRight: "12px" }}
                />
              }
              text="退出看板"
              danger={true}
            />
          </div>
        </>
      ) : null}
      {isUser ? (
        <div className="top-border" style={{ paddingBottom: 0 }}>
          {boardManager?.map((ele, idx) => (

            <div style={{ display: "flex" }} key={idx}>
              <Avatar src={ele.userId.avatar} key={idx} />
              <p style={{ marginTop: "5px", marginLeft: "5px" }}>
                {ele.userId.name}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      {isSetting ? (
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
                    form={form}
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
                        {userOrganization && userOrganization?.map((ele, idx) => (
                          <Option value={ele._id} key={idx}>
                            {ele.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item>
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
      ) : null}
      {isLabel ? (
        <div className="top-border">
          <Input placeholder="搜尋標籤..." onChange={handleInputChange}/>
          <Space style={{ display: "flex" }}>
            <Space.Compact direction="vertical" style={{ width: 200 }}>
              {labelList?.map((ele, idx) => (
                <div style={{ display: "flex", justifyContent: "center" }} key={idx}>
                  <Button
                    className="labelBtn"
                    type="primary"
                    style={{
                      color: "white",
                      backgroundColor: ele.color,
                      border: "1px solid white",
                      borderRadius: "4px",
                      width: "100%",
                      height: "34px",
                      padding: "0 12px",
                      marginTop: "10px",
                    }}
                    key={idx}
                  >
                    {ele.labelName}
                  </Button>
                  <Button
                    type="text"
                    icon={
                      <EditOutlined />
                    }
                    style={{ width: "32px", height: "32px", padding: 0, marginTop: "10px", color: "var(--gray66)" }}
                  />
                </div>
              ))}
            </Space.Compact>
          </Space>
          <Button
              className="createLabelBtn"
              type="primary"
              style={{
                // color: "#666666",
                width: "100%",
                height: "32px",
                marginTop: "13px",
                borderRadius: "4px",
                marginBottom: "-5px",
              }}
            >
              建立新標籤
            </Button>
        </div>
      ) : null}
    </PopoverContentStyle>
  );
};

const BillboardHeader: React.FC<BillboardHeaderProps> = ({
  name,
  member,
  boardInviteLink,
  orgId,
  cardList,
}) => {
  const [openInvite, setOpenInvite] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [isMenu, setIsMenu] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isLabel, setIsLabel] = useState(false);

  return (
    <BillboardHeaderCss className="d-space">
      <div className="left-head">
        <ColorIcon
          color={"white"}
          text={name.at(0) || ""}
          size={"24px"}
          fontSize={"14px"}
          background={""}
        />
        <p style={{ marginLeft: "16px" }}>{name}</p>
      </div>
      <div className="right-head">
        <Avatar.Group>
          {member &&
            member?.map((ele, idx) => (
              <Avatar src={ele.userId.avatar} key={idx} />
            ))}
        </Avatar.Group>
        <BillboardHeaderBtn
          icon={<FilterOutlined style={{ fontSize: "16px" }} />}
        >
          篩選
        </BillboardHeaderBtn>
        <BillboardHeaderBtn
          icon={<TeamOutlined style={{ fontSize: "16px" }} />}
          onClick={() => setOpenInvite(true)}
        >
          邀請成員
        </BillboardHeaderBtn>
        <Popover
          placement="bottomRight"
          arrow={false}
          title={
            <PopoverTitle
              isMenu={isMenu}
              isUser={isUser}
              isSetting={isSetting}
              isLabel={isLabel}
              setIsMenu={setIsMenu}
              setOpenPopover={setOpenPopover}
              setIsUser={setIsUser}
              setIsSetting={setIsSetting}
              setIsLabel={setIsLabel}
            />
          }
          content={
            <PopoverContent
              name={name}
              member={member}
              orgId={orgId}
              cardList={cardList}
              isUser={isUser}
              isMenu={isMenu}
              isSetting={isSetting}
              isLabel={isLabel}
              setIsUser={setIsUser}
              setIsMenu={setIsMenu}
              setIsSetting={setIsSetting}
              setIsLabel={setIsLabel}
            />
          }
          trigger="click"
          open={openPopover}
          onOpenChange={(e) => {
            setOpenPopover(e);
          }}
        >
          <Button
            type="link"
            style={{ width: "32px", height: "32px", padding: 0 }}
          >
            <DashOutlined style={{ color: "white", fontSize: "16px" }} />
          </Button>
        </Popover>
      </div>
      <AddMember
        open={openInvite}
        setOpen={setOpenInvite}
        member={member}
        boardInviteLink={boardInviteLink}
      />
    </BillboardHeaderCss>
  );
};

export default BillboardHeader;
