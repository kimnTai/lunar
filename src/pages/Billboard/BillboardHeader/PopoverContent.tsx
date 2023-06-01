import { PopoverContentProps } from "@/interfaces/boards";
import { useEffect, useRef, useState } from "react";
import { Avatar, Button, Form, Select, Input, Space, InputRef } from "antd";
import { useAppSelector } from "@/hooks/useAppSelector";
import { LabelsProps } from "@/interfaces/labels";
import {
  newLabelApi,
  updateLabelApi,
  deleteLabelApi,
  getLabelApi,
} from "@/api/label";
import { PopoverContentStyle } from "./style";
import ListButton from "@/components/ListButton";
import {
  CloseOutlined,
  EditOutlined,
  InboxOutlined,
  LogoutOutlined,
  SettingOutlined,
  TagOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CloneBoardButton from "@/components/CloneBoardButton";
import { useApi } from "@/hooks/useApiHook";
import { colorList} from './constant'

const PopoverContent: React.FC<PopoverContentProps> = (props) => {
  const {
    member,
    orgId,
    isUser,
    isMenu,
    isSetting,
    isLabel,
    setIsUser,
    setIsMenu,
    setIsSetting,
    setIsLabel,
    callGetBoardApi,
    boardId,
  } = props;
  const [isShowChangeWorkSpace, setIsShowChangeWorkSpace] = useState(false);
  const [isShowChangePeople, setIsShowChangePeople] = useState(false);
  const [people, setPeople] = useState("成員");
  const { Option } = Select;
  const [form] = Form.useForm();
  const userOrganization = useAppSelector((state) => state.user.organization);
  const orgName = userOrganization.find((ele) => ele._id === orgId);
  const boardManager = member?.filter((ele) => ele.role === "manager");
  const [labelList, setLabelList] = useState<LabelsProps[]>([]);
  const [isCreateLabel, setIsCreateLabel] = useState(false);
  const [isEditLabel, setIsEditLabel] = useState(false);
  const [isStoreLabel, setIsStoreLabel] = useState(false);
  const [isDeleteLabel, setIsDeleteLabel] = useState(false);
  const [inputColor, setInputColor] = useState("#ffb6c1");
  const [inputName, setInputName] = useState("");
  const [loading, setLoading] = useState(false);
  const [storeLoading, setStoreLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [labelID, setLabelID] = useState("");
  const [labelResult, _labelLoading, labelCallApi] = useApi(getLabelApi);

  useEffect(() => {
    if (boardId) {
      (async () => {
        await labelCallApi(boardId);
      })();
    }
  }, [boardId]);

  useEffect(() => {
    if (labelResult?.result) {
      const filteredList = labelResult?.result.filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) => t.name === item.name && t.color === item.color)
      );
      setLabelList(filteredList);
    }
  }, [labelResult?.result]);

  const click = (e: any) => {
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
    if (e.target.value !== "") {
      const found = labelList.filter((item) =>
        item.name.includes(e.target.value)
      );
      if (found.length > 0) {
        setLabelList(found);
      } else if (found.length === 0) {
        setLabelList([]);
      }
    } else if (e.target.value === "") {
      setLabelList(labelList);
    }
  };

  const checkColorHandler = (color: any) => {
    setInputColor(color);
  };

  const clearColorHandler = () => {
    if (inputColor !== "#DFE1E6") {
      setInputColor("#DFE1E6");
    }
  };

  // 建立標籤
  const onCreateLabelFinish = async () => {
    setLoading(true);
    await newLabelApi({
      name: inputName,
      color: inputColor,
      boardId: boardId,
    })
      .then((res) => {
        if (res.status === "success") {
          callGetBoardApi(boardId);
        }
      })
      .finally(() => setLoading(false));
  };

  const editLabelHandler = (name: any, color: any, id: any) => {
    setIsEditLabel(true);
    setInputName(name);
    setInputColor(color);
    setLabelID(id);
    form.setFieldsValue({ editLabelName: name });
  };

  useEffect(() => {
    if (isEditLabel) {
      inputRef.current!.focus();
    }
  }, [isEditLabel]);

  // 編輯標籤
  const onEditLabelFinish = async () => {
    if (isStoreLabel) {
      setStoreLoading(true);
      await updateLabelApi({
        name: inputName,
        color: inputColor,
        boardId: boardId,
        labelId: labelID,
      })
        .then((res) => {
          console.log("==res==", res);
          if (res.status === "success") {
            labelCallApi(boardId);
            callGetBoardApi(boardId);
          }
        })
        .finally(() => {
          setStoreLoading(false);
          setIsEditLabel(false);
        });
    }
    if (isDeleteLabel) {
      setDeleteLoading(true);
      await deleteLabelApi({
        boardId: boardId,
        labelId: labelID,
      })
        .then((res) => {
          console.log("==res==", res);
          if (res.status === "success") {
            labelCallApi(boardId);
            callGetBoardApi(boardId);
          }
        })
        .finally(() => {
          setDeleteLoading(false);
          setIsEditLabel(false);
        });
    }
  };

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
                            <Option value={ele._id} key={idx}>
                              {ele.name}
                            </Option>
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
      ) : null}
      {isLabel ? (
        <div className="top-border">
          <Input
            allowClear
            placeholder="搜尋標籤..."
            onChange={handleInputChange}
          />
          <Space style={{ display: "flex" }}>
            <Space.Compact direction="vertical" style={{ width: 200 }}>
              {labelList?.map((ele, idx) => (
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  key={idx}
                >
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
                    {ele.name}
                  </Button>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    style={{
                      width: "32px",
                      height: "32px",
                      padding: 0,
                      marginTop: "10px",
                      color: "var(--gray66)",
                    }}
                    onClick={() =>
                      editLabelHandler(ele.name, ele.color, ele._id)
                    }
                  />
                </div>
              ))}
            </Space.Compact>
          </Space>
          <Button
            className="createLabelBtn"
            type="primary"
            style={{
              width: "100%",
              height: "32px",
              marginTop: "13px",
              borderRadius: "4px",
              marginBottom: "-5px",
            }}
            onClick={() => setIsCreateLabel(true)}
          >
            建立新標籤
          </Button>
          {isCreateLabel ? (
            <div className="createLabelView">
              <div className="peopleTitle">
                <p>標籤</p>
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
                  onClick={() => setIsCreateLabel(false)}
                />
              </div>
              <Form onFinish={onCreateLabelFinish}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "101px",
                    backgroundColor: "var(--ds-surface-sunken, #F4F5F7)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "80%",
                      height: "40%",
                      backgroundColor: `${inputColor}`,
                      left: "10%",
                      top: "30%",
                      textAlign: "center",
                      lineHeight: "40px",
                      fontSize: "16px",
                      borderRadius: "4px",
                    }}
                  >
                    {inputName}
                  </div>
                </div>
                <div style={{ padding: "0 12px" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "16px",
                      marginTop: "12px",
                    }}
                  >
                    標題
                  </p>
                  <Form.Item
                    name="labelName"
                    rules={[{ required: true, message: "請輸入標籤名稱!" }]}
                  >
                    <Input
                      placeholder="輸入標籤名稱"
                      style={{
                        width: "100%",
                        height: "32px",
                        borderRadius: "4px",
                        marginTop: "8px",
                      }}
                      onChange={(e) => setInputName(e.target.value)}
                    />
                  </Form.Item>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "16px",
                      marginTop: "-12px",
                    }}
                  >
                    選一個顏色
                  </p>
                  <div>
                    <Form.Item name="labelColor">
                      {colorList?.map((ele, idx) => (
                        <Button
                          type="text"
                          style={{
                            color: "white",
                            backgroundColor: ele.color,
                            border: "1px solid white",
                            borderRadius: "4px",
                            width: "31%",
                            height: "36px",
                            marginTop: "8px",
                            marginRight: "5.2px",
                          }}
                          key={idx}
                          onClick={() => checkColorHandler(ele.color)}
                        >
                          <div
                            className="hoverBtn"
                            style={{
                              width: "100%",
                              height: "100%",
                              position: "absolute",
                              borderRadius: "4px",
                              left: 0,
                              top: 0,
                            }}
                          />
                        </Button>
                      ))}
                    </Form.Item>
                    <Button
                      className="createLabelBtn"
                      type="primary"
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "4px",
                        width: "100%",
                        height: "38px",
                        marginTop: "-15px",
                      }}
                      icon={<CloseOutlined />}
                      disabled={inputColor === "#DFE1E6"}
                      onClick={clearColorHandler}
                    >
                      移除顏色
                    </Button>
                  </div>
                  <div className="top-border" style={{ marginTop: "10px" }}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      style={{
                        width: "50%",
                        height: "32px",
                        marginTop: "5px",
                        borderRadius: "4px",
                      }}
                      loading={loading}
                    >
                      建立
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          ) : null}
          {isEditLabel ? (
            <div className="createLabelView">
              <div className="peopleTitle">
                <p>標籤</p>
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
                  onClick={() => setIsEditLabel(false)}
                />
              </div>
              <Form form={form} onFinish={onEditLabelFinish}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "101px",
                    backgroundColor: "var(--ds-surface-sunken, #F4F5F7)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "80%",
                      height: "40%",
                      backgroundColor: `${inputColor}`,
                      left: "10%",
                      top: "30%",
                      textAlign: "center",
                      lineHeight: "40px",
                      fontSize: "16px",
                      borderRadius: "4px",
                    }}
                  >
                    {inputName}
                  </div>
                </div>
                <div style={{ padding: "0 12px" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "16px",
                      marginTop: "12px",
                    }}
                  >
                    標題
                  </p>
                  <Form.Item
                    name="editLabelName"
                    rules={[{ required: true, message: "請輸入標籤名稱!" }]}
                  >
                    <Input
                      placeholder="輸入標籤名稱"
                      style={{
                        width: "100%",
                        height: "32px",
                        borderRadius: "4px",
                        marginTop: "8px",
                      }}
                      onChange={(e) => setInputName(e.target.value)}
                      ref={inputRef}
                      // defaultValue={inputName}
                    />
                  </Form.Item>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "16px",
                      marginTop: "-12px",
                    }}
                  >
                    選一個顏色
                  </p>
                  <div>
                    <Form.Item name="labelColor">
                      {colorList?.map((ele, idx) => (
                        <Button
                          type="text"
                          style={{
                            color: "white",
                            backgroundColor: ele.color,
                            border: "1px solid white",
                            borderRadius: "4px",
                            width: "31%",
                            height: "36px",
                            marginTop: "8px",
                            marginRight: "5.2px",
                          }}
                          key={idx}
                          onClick={() => checkColorHandler(ele.color)}
                        >
                          <div
                            className="hoverBtn"
                            style={{
                              width: "100%",
                              height: "100%",
                              position: "absolute",
                              borderRadius: "4px",
                              left: 0,
                              top: 0,
                            }}
                          />
                        </Button>
                      ))}
                    </Form.Item>
                    <Button
                      className="createLabelBtn"
                      type="primary"
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "4px",
                        width: "100%",
                        height: "38px",
                        marginTop: "-15px",
                      }}
                      icon={<CloseOutlined />}
                      disabled={inputColor === "#DFE1E6"}
                      onClick={clearColorHandler}
                    >
                      移除顏色
                    </Button>
                  </div>
                  <div
                    className="top-border"
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      htmlType="submit"
                      type="primary"
                      style={{
                        width: "40%",
                        height: "32px",
                        marginTop: "5px",
                        borderRadius: "4px",
                      }}
                      loading={storeLoading}
                      onClick={() => setIsStoreLabel(true)}
                    >
                      儲存
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      danger
                      style={{
                        width: "40%",
                        height: "32px",
                        marginTop: "5px",
                        borderRadius: "4px",
                      }}
                      loading={deleteLoading}
                      onClick={() => setIsDeleteLabel(true)}
                    >
                      刪除
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          ) : null}
        </div>
      ) : null}
    </PopoverContentStyle>
  );
};

export default PopoverContent;
