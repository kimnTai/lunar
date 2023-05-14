import React from "react";
import { Row, Col, Image } from "antd";
import { ContainerOutlined } from "@ant-design/icons";
import {
  InboxOutlined,
  UsergroupAddOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { CardsProps } from "@/interfaces/cards";
import { updateCardApi } from "@/api/cards";
import {
  ModalHeaderStyled,
  CardHeaderToolbarStyled,
  TitleInputStyled,
} from "./style";

const ModalHeader: React.FC<{ cardData: CardsProps }> = ({ cardData }) => {
  const { id, name } = cardData;
  const [isEdit, setIsEdit] = React.useState(false);
  const [titleFiled, setTitleFiled] = React.useState(name);

  // Title Enter Submit
  const handleKeyDown = (event) => {
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
        {/* Title */}
        <Row align="middle" gutter={4}>
          <Col flex="none">
            <ContainerOutlined style={{ fontSize: "24px" }} />
          </Col>
          <Col flex="auto">
            <TitleInputStyled
              type="text"
              placeholder="請輸入標題"
              value={titleFiled}
              onChange={(e) => setTitleFiled(e.target.value)}
              onFocus={() => setIsEdit(true)}
              onBlur={submitTitleField}
              onKeyDown={handleKeyDown}
              bordered={isEdit}
            />
          </Col>
        </Row>
      </ModalHeaderStyled>
    </>
  );
};

export default ModalHeader;
