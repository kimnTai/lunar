import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputRef, Space } from "antd";
import {
  deleteLabelApi,
  getLabelApi,
  newLabelApi,
  updateLabelApi,
} from "@/api/label";
import { useApi } from "@/hooks/useApiHook";
import { LabelsProps } from "@/interfaces/labels";
import { colorList } from "@/utils/constant";
import { useAppDispatch } from "@/hooks";
import { getBoardByIdAction } from "@/redux/boardSlice";

const LabelContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const [form] = Form.useForm();
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
      labelCallApi(boardId);
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
      if (boardId) {
        (async () => {
          await labelCallApi(boardId);
        })();
      }
      if (labelResult?.result) {
        const filteredList = labelResult?.result.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (t) => t.name === item.name && t.color === item.color
            )
        );
        setLabelList(filteredList);
      }
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
  const onCreateLabelFinish = () => {
    if (!boardId) {
      return;
    }
    setLoading(true);
    newLabelApi({
      name: inputName,
      color: inputColor,
      boardId: boardId,
    })
      .then((res) => {
        if (res.status === "success") {
          dispatch(getBoardByIdAction(boardId));
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
  const onEditLabelFinish = () => {
    if (!boardId) {
      return;
    }
    if (isStoreLabel) {
      setStoreLoading(true);

      updateLabelApi({
        name: inputName,
        color: inputColor,
        boardId: boardId,
        labelId: labelID,
      })
        .then((res) => {
          if (res.status === "success") {
            labelCallApi(boardId);
            dispatch(getBoardByIdAction(boardId));
          }
        })
        .finally(() => {
          setStoreLoading(false);
          setIsEditLabel(false);
        });
    }
    if (isDeleteLabel) {
      setDeleteLoading(true);

      deleteLabelApi({
        boardId: boardId,
        labelId: labelID,
      })
        .then((res) => {
          console.log("==res==", res);
          if (res.status === "success") {
            labelCallApi(boardId);
            dispatch(getBoardByIdAction(boardId));
          }
        })
        .finally(() => {
          setDeleteLoading(false);
          setIsEditLabel(false);
        });
    }
  };

  return (
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
                onClick={() => editLabelHandler(ele.name, ele.color, ele._id)}
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
  );
};

export default LabelContent;
