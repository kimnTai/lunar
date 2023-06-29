import React, { useState } from "react";
import { Button, Col, Form, Space } from "antd";
import TextEditor from "@/components/TextEditor";
import { useAppDispatch } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { updateCardAction } from "@/redux/cardSlice";
import { SectionContentStyled, SectionHeaderStyled } from "./style";

const CardDescription: React.FC = () => {
  const dispatch = useAppDispatch();
  const cardData = useParamCard();

  const [openTextEditor, setOpenTextEditor] = useState(false);
  // 編輯中的內容
  const [descriptionField, setDescriptionField] = useState(
    cardData?.description ?? ""
  );

  const [form] = Form.useForm();

  const onSubmit = async (values: string) => {
    if (!cardData) {
      return;
    }
    form.resetFields();

    try {
      await dispatch(
        updateCardAction({
          cardId: cardData._id,
          description: values,
        })
      );
    } catch (error) {
      console.error(error);
    }
    setOpenTextEditor(false);
  };

  const isDescriptionEmpty = () => {
    if (!cardData) {
      return false;
    }
    // 刪除所有 HTML 標籤，僅留下文本內容
    const regex = /(<([^>]+)>)/gi;
    const textString = cardData.description.replace(regex, "");
    return textString === "" ? true : false;
  };

  return (
    <>
      <SectionHeaderStyled align="middle" gutter={8}>
        <Col flex="none">
          <h3>描述</h3>
        </Col>
      </SectionHeaderStyled>
      <SectionContentStyled>
        {openTextEditor ? (
          <Form
            layout="vertical"
            form={form}
            onFinish={() => onSubmit(descriptionField)}
            name="control-textEditor"
          >
            <Form.Item>
              <TextEditor
                value={descriptionField}
                placeholder="請輸入內容"
                onChange={setDescriptionField}
                onBlur={() => onSubmit(descriptionField)}
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button htmlType="submit" type="primary">
                  儲存
                </Button>
                <Button
                  onClick={() => {
                    setOpenTextEditor(false);
                    if (cardData?.description) {
                      setDescriptionField(cardData?.description);
                    }
                  }}
                >
                  取消
                </Button>
              </Space>
            </Form.Item>
          </Form>
        ) : isDescriptionEmpty() ? (
          <div
            onClick={() => setOpenTextEditor(true)}
            className="descriptionEmpty"
          >
            新增更詳細的描述...
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: descriptionField }}
            onClick={() => setOpenTextEditor(true)}
            className="descriptionDisplay"
          ></div>
        )}
      </SectionContentStyled>
    </>
  );
};

export default CardDescription;
