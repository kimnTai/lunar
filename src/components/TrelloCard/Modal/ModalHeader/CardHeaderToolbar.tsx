import React from "react";
import { Row, Col, message } from "antd";
import {
  InboxOutlined,
  UsergroupAddOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useCardModalContext } from "@/context/CardModalContext";
import { useAppSelector } from "@/hooks";
import { addCardMemberApi } from "@/api/cards";
import { selectListByCardId } from "@/redux/boardSlice";
import { selectUser } from "@/redux/userSlice";
import { CardHeaderToolbarStyled } from "./style";

const CardHeaderToolbar: React.FC = () => {
  const { cardData, setCardData } = useCardModalContext();
  const currentList = useAppSelector(selectListByCardId(cardData?._id));
  const user = useAppSelector(selectUser);

  const isInMember = cardData?.member.find(
    ({ userId }) => userId._id === user._id
  );

  return (
    <CardHeaderToolbarStyled>
      <Row align="middle" gutter={24}>
        <Col flex="none" className="col">
          <InboxOutlined className="icon" />
          <p>在「{currentList?.name}」列表中</p>
        </Col>
        {!isInMember && (
          <Col flex="none" className="col">
            <UsergroupAddOutlined className="icon" />
            <p
              onClick={async () => {
                if (!cardData) {
                  return;
                }
                const { result } = await addCardMemberApi({
                  cardId: cardData?._id,
                  userIdList: [user._id],
                });
                setCardData(result);
                message.success(`加入成功`);
              }}
            >
              加入
            </p>
          </Col>
        )}
        <Col flex="none" className="col">
          <EyeOutlined className="icon" />
          <p>追蹤</p>
        </Col>
      </Row>
    </CardHeaderToolbarStyled>
  );
};

export default CardHeaderToolbar;
