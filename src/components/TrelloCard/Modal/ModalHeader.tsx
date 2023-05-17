import React, { useContext } from "react";
import { Row, Col, Image, Input } from "antd";
import {
  InboxOutlined,
  UsergroupAddOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { CardModalContext } from "@/components/TrelloCard/Modal/index.tsx";
import { updateCardApi } from "@/api/cards";
import {
  ModalHeaderStyled,
  CardHeaderToolbarStyled,
  CardTitleStyled,
} from "./style";

const { TextArea } = Input;

const ModalHeader: React.FC = () => {
  const { cardData } = useContext(CardModalContext);
  const { id = "", name = "" } = cardData ?? {};
  const [isEdit, setIsEdit] = React.useState(false);
  const [titleFiled, setTitleFiled] = React.useState(name);

  // Title Enter Submit
  const handleKeyDown = (event: any) => {
    const { keyCode, key } = event;

    if (keyCode === 13 || key.toUpperCase() === "ENTER") {
      submitTitleField();
      event?.target?.blur();
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

  return (
    <>
      <ModalHeaderStyled>
        {/* 封面 */}
        <Image
          src="https://unsplash.it/720/160"
          width={"100%"}
          className="coverImg"
        />
        {/* 列表名稱 */}
        <CardHeaderToolbarStyled>
          <Row align="middle" gutter={24}>
            <Col flex="none" className="col">
              <InboxOutlined className="icon" />
              <p>在「ＯＯＯＯＯ」列表中</p>
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
