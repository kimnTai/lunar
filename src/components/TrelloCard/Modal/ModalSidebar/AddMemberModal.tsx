import { CSSProperties, ChangeEvent, useState } from "react";
import { Button, Card, Col, Input, List } from "antd";
import {
  CloseOutlined,
  MinusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { debounce } from "lodash";
import { searchLunarMemberApi } from "@/api/search";
import AvatarCustom from "@/components/AvatarCustom";
import { useAppDispatch } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import type { UserProps } from "@/interfaces/user";
import { addCardMemberAction, deleteCardMemberAction } from "@/redux/cardSlice";
import openNotification from "@/utils/openNotification";
import { AddMemberModalStyled } from "./style";

const AddMemberModal: React.FC<{
  setIsOpenAddMember: Function;
  style?: CSSProperties;
}> = ({ setIsOpenAddMember, style }) => {
  const dispatch = useAppDispatch();
  const cardData = useParamCard();
  const [resultMember, setResultMember] = useState<UserProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (e.target.value.length >= 1) {
      await searchLunarMemberApi({ query: e.target.value }).then((res) => {
        setResultMember(res.result);
      });
    }
    setIsLoading(false);
  }, 800);

  const handleAddCardMember = async (member: UserProps) => {
    if (!cardData) {
      return;
    }
    setIsLoading(true);

    await dispatch(
      addCardMemberAction({
        cardId: cardData._id,
        userIdList: [member._id],
      })
    );

    openNotification({
      message: `加入成功`,
    });
    setIsLoading(false);
    setIsOpenAddMember(false);
  };

  // 拿 Id 做 loading 判斷，因為 boolean 會所有按鈕一起轉
  const [removeId, setRemoveId] = useState("");
  const handleRemoveCardMember = async (memberId: string) => {
    const cardId = cardData?._id;
    setRemoveId(memberId);
    if (cardId) {
      await dispatch(deleteCardMemberAction({ cardId, memberId }));
    }
    setRemoveId("");
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
        <List
          className="search-list-items"
          itemLayout="horizontal"
          dataSource={resultMember}
          loading={isLoading}
          locale={{
            emptyText: resultMember.length ? "這個人似乎尚未註冊 Lunar。" : " ",
          }}
          renderItem={(member) => (
            <List.Item
              className="search-list-item"
              key={member._id}
              onClick={() => handleAddCardMember(member)}
            >
              <List.Item.Meta
                avatar={
                  <AvatarCustom username={member.name} imgUrl={member.avatar} />
                }
                title={member.name}
                description={member.email}
              />
            </List.Item>
          )}
        />

        <Col className="board-member-list">
          <p>卡片成員</p>
          <List
            itemLayout="horizontal"
            dataSource={cardData?.member}
            locale={{ emptyText: "尚無成員" }}
            renderItem={(member) => (
              <List.Item
                key={member.userId._id}
                actions={[
                  <Button
                    danger
                    shape="circle"
                    key={member.userId._id}
                    style={{
                      width: "24px",
                      height: "24px",
                      padding: 0,
                      minWidth: "auto",
                      marginLeft: "8px",
                    }}
                    icon={<MinusOutlined />}
                    loading={removeId === member.userId._id}
                    onClick={() => {
                      handleRemoveCardMember(member.userId._id);
                    }}
                  />,
                ]}
              >
                <List.Item.Meta
                  style={{ alignItems: "center" }}
                  avatar={
                    <AvatarCustom
                      username={member.userId.name}
                      imgUrl={member.userId.avatar}
                    />
                  }
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
