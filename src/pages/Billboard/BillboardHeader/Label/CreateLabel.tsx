import { useState } from "react";
import { Button, Form, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { newLabelAction, selectBoard } from "@/redux/boardSlice";
import { colorList } from "@/utils/constant";

const CreateLabel: React.FC<{
  setState: React.Dispatch<React.SetStateAction<"NONE" | "CREATE" | "EDIT">>;
}> = ({ setState }) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);

  const [form] = Form.useForm<{ labelName: string; labelColor: string }>();
  const labelName = Form.useWatch("labelName", form);
  const labelColor = Form.useWatch("labelColor", form);

  const [loading, setLoading] = useState(false);

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
      <Form
        form={form}
        initialValues={{
          labelName: "",
          labelColor: "#DFE1E6",
        }}
        onFinish={async (values) => {
          setLoading(true);

          try {
            await dispatch(
              newLabelAction({
                name: values.labelName,
                color: values.labelColor,
                boardId: board._id,
              })
            );
          } catch (error) {}

          setLoading(false);
          setState("NONE");
        }}
      >
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
              backgroundColor: `${labelColor}`,
              left: "10%",
              top: "30%",
              textAlign: "center",
              lineHeight: "40px",
              fontSize: "16px",
              borderRadius: "4px",
            }}
          >
            {labelName}
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
          <Form.Item name="labelColor">
            <div>
              {colorList?.map(({ color }, index) => (
                <Button
                  type="text"
                  style={{
                    color: "white",
                    backgroundColor: color,
                    border: "1px solid white",
                    borderRadius: "4px",
                    width: "31%",
                    height: "36px",
                    marginTop: "8px",
                    marginRight: "5.2px",
                  }}
                  key={index}
                  onClick={() => {
                    form.setFieldValue("labelColor", color);
                  }}
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
            </div>
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
            disabled={labelColor === "#DFE1E6"}
            onClick={() => form.setFieldValue("labelColor", "#DFE1E6")}
          >
            移除顏色
          </Button>
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
  );
};

export default CreateLabel;
