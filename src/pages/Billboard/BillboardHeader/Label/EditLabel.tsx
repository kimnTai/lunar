import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { CloseOutlined } from "@ant-design/icons";
import {
  deleteLabelAction,
  selectLabelById,
  updateLabelAction,
} from "@/redux/boardSlice";
import { colorList } from "@/utils/constant";

const EditLabel: React.FC<{
  setState: React.Dispatch<React.SetStateAction<"NONE" | "CREATE" | "EDIT">>;
  labelId: string;
}> = ({ setState, labelId }) => {
  const dispatch = useAppDispatch();
  const label = useAppSelector(selectLabelById(labelId));

  const [form] = Form.useForm<{ editLabelName: string; labelColor: string }>();
  const editLabelName = Form.useWatch("editLabelName", form);
  const labelColor = Form.useWatch("labelColor", form);

  const [loading, setLoading] = useState(false);

  const onClickDelete = async () => {
    if (!label) {
      return;
    }
    setLoading(true);

    try {
      await dispatch(
        deleteLabelAction({
          boardId: label.boardId,
          labelId: label._id,
        })
      );
    } catch (error) {}

    setLoading(false);
    setState("NONE");
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
      <Form
        initialValues={{
          editLabelName: label?.name,
          labelColor: label?.color,
        }}
        form={form}
        onFinish={async (values) => {
          if (!label) {
            return;
          }
          setLoading(true);

          try {
            await dispatch(
              updateLabelAction({
                name: values.editLabelName,
                color: values.labelColor,
                boardId: label.boardId,
                labelId: label._id,
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
            {editLabelName}
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
              <div>
                {colorList?.map(({ color }, idx) => (
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
                    key={idx}
                    onClick={() => form.setFieldValue("labelColor", color)}
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
              loading={loading}
            >
              儲存
            </Button>
            <Button
              type="primary"
              danger
              style={{
                width: "40%",
                height: "32px",
                marginTop: "5px",
                borderRadius: "4px",
              }}
              loading={loading}
              onClick={() => onClickDelete()}
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
