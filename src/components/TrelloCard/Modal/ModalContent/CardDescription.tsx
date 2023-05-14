import React, { useState } from "react";
import { Button, Form, Col, Space } from "antd";
import { CardsProps } from "@/interfaces/cards";
import { updateCardApi } from "@/api/cards";
import TextEditor from "@/components/TextEditor";
import { SectionHeaderStyled, SectionContentStyled } from "./style";

const CardDescription: React.FC<{ cardData: CardsProps }> = ({ cardData }) => {
  const { id, description } = cardData;

  const [openTextEditor, setOpenTextEditor] = useState(false);
  const [descriptionField, setDescriptionField] = useState(description); // 編輯中的內容
  const [descriptionSaved, setDescriptionSaved] = useState(descriptionField); // 最新的儲存內容

  const [form] = Form.useForm();

  const onSubmit = async (_values: string) => {
    form.resetFields();

    try {
      const { result } = await updateCardApi({
        cardId: id,
        description: _values,
      });
      setDescriptionSaved(result.description);
    } catch (error) {
      console.error(error);
    }
    setOpenTextEditor(false);
  };

  const isDescriptionEmpty = () => {
    // 刪除所有 HTML 標籤，僅留下文本內容
    const regex = /(<([^>]+)>)/gi;
    const textString = descriptionSaved.replace(regex, "");
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
                    setDescriptionField(descriptionSaved);
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
