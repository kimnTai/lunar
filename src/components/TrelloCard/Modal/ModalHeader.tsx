import React from "react";
import { Row, Col, Image } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  InboxOutlined,
  UsergroupAddOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useCardModalContext } from "@/context/CardModalContext";
import { updateCardApi } from "@/api/cards";
import {
  ModalHeaderStyled,
  CardHeaderToolbarStyled,
  CardTitleStyled,
} from "./style";

const ModalHeader: React.FC<{ listName: string }> = (props) => {
  const { cardData } = useCardModalContext();
  const { id = "", name = "" } = cardData ?? {};
  const [isEdit, setIsEdit] = React.useState(false);
  const [titleFiled, setTitleFiled] = React.useState(name);

  // Title Enter Submit
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      submitTitleField();
    }
  };

  const submitTitleField = () => {
    if (titleFiled !== name) {
      try {
        updateCardApi({ cardId: id, name: titleFiled });
      } catch (error) {
        console.log(error);
        // 優化：更新失敗要顯示錯誤訊息
      }
    }
    setIsEdit(false);
  };

  const coverUrl = cardData?.attachment.at(0)?.dirname;

  return (
    <>
      <ModalHeaderStyled>
        {/* 封面 */}
        {coverUrl && (
          <Image src={coverUrl} width={"100%"} className="coverImg" />
        )}
        {/* 列表名稱 */}
        <CardHeaderToolbarStyled>
          <Row align="middle" gutter={24}>
            <Col flex="none" className="col">
              <InboxOutlined className="icon" />
              <p>在「{props.listName}」列表中</p>
            </Col>
            <Col flex="none" className="col">
              <UsergroupAddOutlined className="icon" />
              <p>加入</p>
            </Col>
            <Col flex="none" className="col">
              <EyeOutlined className="icon" />
              <p>追蹤</p>
            </Col>
          </Row>
        </CardHeaderToolbarStyled>
        {/* 標題 */}
        <CardTitleStyled>
          <Row align="middle" gutter={4}>
            <Col flex="auto">
              {isEdit ? (
                <TextArea
                  autoSize
                  placeholder="請輸入標題"
                  value={titleFiled}
                  onChange={(e) => setTitleFiled(e.target.value)}
                  onFocus={() => setIsEdit(true)}
                  onBlur={submitTitleField}
                  onKeyDown={handleKeyDown}
                  className="titleInput"
                />
              ) : (
                <h2 onClick={() => setIsEdit(true)} className="titleTxt">
                  {titleFiled}
                </h2>
              )}
            </Col>
          </Row>
        </CardTitleStyled>
      </ModalHeaderStyled>
    </>
  );
};

export default ModalHeader;
