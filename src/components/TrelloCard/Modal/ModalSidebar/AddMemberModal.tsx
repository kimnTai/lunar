import { CSSProperties, ChangeEvent, useState } from "react";
import { Avatar, Button, Card, Col, Input, List } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { searchLunarMemberApi } from "@/api/search";
import { useAppDispatch } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import type { UserProps } from "@/interfaces/user";
import { addCardMemberAction } from "@/redux/cardSlice";
import openNotification from "@/utils/openNotification";
import { AddMemberModalStyled } from "./style";

const AddMemberModal: React.FC<{
  setIsOpenAddMember: Function;
  style?: CSSProperties;
}> = ({ setIsOpenAddMember, style }) => {
  const dispatch = useAppDispatch();
  const cardData = useParamCard();
  const [resultMember, setResultMember] = useState<UserProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (e.target.value.length > 1) {
      await searchLunarMemberApi({ query: e.target.value }).then((res) => {
        setResultMember(res.result);
      });
    }
    setIsLoading(false);
  }, 800);

  const handleAddCardMember = async (member: UserProps) => {
    const cardId = cardData?._id;
    if (cardId) {
      await dispatch(addCardMemberAction({ cardId, userIdList: [member._id] }));
      openNotification({
        message: `加入成功`,
      });
    }
    setIsOpenAddMember(false);
  };

  return (
    <AddMemberModalStyled style={{ ...style }}>
      <Card
        title="成員"
        extra={
          <Button
            className="ant-close"
            icon={<CloseOutlined style={{ fontSize: "12px" }} />}
            onClick={() => setIsOpenAddMember(false)}
          />
        }
        size={"small"}
        style={{ width: "auto" }}
      >
        <Input
          placeholder="搜尋成員"
          onChange={(e) => handleSearch(e)}
          prefix={<SearchOutlined />}
        />
        {resultMember && (
          <List
            className="search-list-items"
            itemLayout="horizontal"
            dataSource={resultMember}
            loading={isLoading}
            locale={{ emptyText: "這個人似乎尚未註冊 Lunar。" }}
            renderItem={(member) => (
              <List.Item
                className="search-list-item"
                key={member._id}
                onClick={() => handleAddCardMember(member)}
              >
                <List.Item.Meta
                  avatar={<Avatar src={member.avatar} />}
                  title={member.name}
                  description={member.email}
                />
              </List.Item>
            )}
          />
        )}

        <Col className="board-member-list">
          <p>卡片成員</p>
          <List
            itemLayout="horizontal"
            dataSource={cardData?.member}
            locale={{ emptyText: "尚無成員" }}
            renderItem={(member) => (
              <List.Item key={member.userId._id}>
                <List.Item.Meta
                  style={{ alignItems: "center" }}
                  avatar={<Avatar src={member.userId.avatar} />}
                  title={member.userId.name}
                />
              </List.Item>
            )}
          />
        </Col>
      </Card>
    </AddMemberModalStyled>
  );
};

export default AddMemberModal;
