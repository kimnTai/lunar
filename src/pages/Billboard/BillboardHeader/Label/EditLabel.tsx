import { useState } from "react";
import { useParams } from "react-router";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { deleteLabelAction, updateLabelAction } from "@/redux/boardSlice";
import { colorList } from "@/utils/constant";
import { useAppDispatch } from "@/hooks";

const EditLabel: React.FC<{
  setState: Function;
  labelID: string;
  form: any;
  inputColor: string;
  inputName: string;
  setInputName: any;
  inputRef: any;
  checkColorHandler: (color: any) => void;
  clearColorHandler: () => void;
}> = ({
  setState,
  labelID,
  form,
  inputColor,
  inputName,
  setInputName,
  inputRef,
  checkColorHandler,
  clearColorHandler,
}) => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const [isStoreLabel, setIsStoreLabel] = useState(false);
  const [storeLoading, setStoreLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isDeleteLabel, setIsDeleteLabel] = useState(false);
  // 編輯標籤
  const onEditLabelFinish = () => {
    if (!boardId) {
      return;
    }
    if (isStoreLabel) {
      setStoreLoading(true);

      dispatch(
        updateLabelAction({
          name: inputName,
          color: inputColor,
          boardId: boardId,
          labelId: labelID,
        })
      ).finally(() => {
        setStoreLoading(false);
        setState("NONE");
      });
    }
    if (isDeleteLabel) {
      setDeleteLoading(true);

      dispatch(
        deleteLabelAction({
          boardId: boardId,
          labelId: labelID,
        })
      ).finally(() => {
        setDeleteLoading(false);
        setState("NONE");
      });
    }
  };

  return (
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
          onClick={() => setState("NONE")}
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
  );
};

export default EditLabel;
