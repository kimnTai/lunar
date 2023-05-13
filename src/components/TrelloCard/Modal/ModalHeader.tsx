import React from "react";
import { Row, Col } from "antd";
import { ContainerOutlined } from "@ant-design/icons";
import { CardsProps } from "@/interfaces/cards";
import { updateCardApi } from "@/api/cards";
import { ModalHeaderStyled, TitleInputStyled } from "./style";

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
    <ModalHeaderStyled>
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
  );
};

export default ModalHeader;
