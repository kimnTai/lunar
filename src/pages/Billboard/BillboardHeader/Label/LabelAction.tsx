import { useState } from "react";
import { Button, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  deleteLabelAction,
  newLabelAction,
  selectBoard,
  selectLabelById,
  updateLabelAction,
} from "@/redux/boardSlice";
import { colorList } from "@/utils/constant";
import {
  ColorBlockButtonStyled,
  LabelActionSubmitBtnStyled,
  LabelColorClearBtnStyled,
  LabelInputStyled,
  LabelActionFormStyled,
} from "./style";

const LabelAction: React.FC<{
  labelId?: string;
  setState: React.Dispatch<React.SetStateAction<"NONE" | "CREATE" | "EDIT">>;
}> = ({ labelId, setState }) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const label = useAppSelector(selectLabelById(labelId));
  const [form] = Form.useForm<{ labelName: string; labelColor: string }>();
  const labelName = Form.useWatch("labelName", form);
  const labelColor = Form.useWatch("labelColor", form);

  const [loading, setLoading] = useState(false);
  const handleOnFinish = async (values: {
    labelName: string;
    labelColor: string;
  }) => {
    setLoading(true);

    try {
      labelId && label
        ? await dispatch(
            updateLabelAction({
              name: values.labelName,
              color: values.labelColor,
              boardId: label.boardId,
              labelId: label._id,
            })
          )
        : await dispatch(
            newLabelAction({
              name: values.labelName,
              color: values.labelColor,
              boardId: board._id,
            })
          );
    } catch (error) {}

    setLoading(false);
    onCancel();
  };
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
    onCancel();
  };
  const onCancel = () => {
    setState("NONE");
  };
  return (
    <div className="createLabelView" style={{ zIndex: 2060 }}>
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
        initialValues={
          labelId
            ? { labelName: label?.name, labelColor: label?.color }
            : { labelName: "", labelColor: "#DFE1E6" }
        }
        onFinish={handleOnFinish}
      >
        <LabelActionFormStyled labelColor={labelColor}>
          <div>{labelName}</div>
        </LabelActionFormStyled>
        <div style={{ padding: "0 12px" }}>
          <p className="label">標題</p>
          <Form.Item
            name="labelName"
            rules={[{ required: true, message: "請輸入標籤名稱!" }]}
          >
            <LabelInputStyled placeholder="輸入標籤名稱" />
          </Form.Item>
          <p className="label" style={{ marginTop: "-12px" }}>
            選一個顏色
          </p>
          <Form.Item name="labelColor">
            <div>
              {colorList?.map(({ color }) => (
                <ColorBlockButtonStyled
                  type="text"
                  color={color}
                  key={color}
                  onClick={() => {
                    form.setFieldValue("labelColor", color);
                  }}
                >
                  <div className="hoverBtn" />
                </ColorBlockButtonStyled>
              ))}
            </div>
          </Form.Item>
          <LabelColorClearBtnStyled
            className="createLabelBtn"
            type="primary"
            icon={<CloseOutlined />}
            disabled={labelColor === "#DFE1E6"}
            onClick={() => form.setFieldValue("labelColor", "#DFE1E6")}
          >
            移除顏色
          </LabelColorClearBtnStyled>
          <div
            className="top-border"
            style={
              labelId
                ? { display: "flex", justifyContent: "space-between" }
                : undefined
            }
          >
            <LabelActionSubmitBtnStyled
              htmlType="submit"
              width={labelId ? "40%" : "50%"}
              loading={loading}
            >
              {labelId ? "儲存" : "建立"}
            </LabelActionSubmitBtnStyled>
            {labelId && (
              <LabelActionSubmitBtnStyled
                width={"40%"}
                danger
                loading={loading}
                onClick={() => onClickDelete()}
              >
                刪除
              </LabelActionSubmitBtnStyled>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LabelAction;
