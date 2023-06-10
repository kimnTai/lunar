import React, { useState } from "react";
import {
  UserOutlined,
  ContainerOutlined,
  ShareAltOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
  CheckSquareOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, message } from "antd";
import { ModalStyle, ModalSidebarStyled } from "./style";
import AttachmentBox from "./AttachmentBox";
import CloneCardBox from "./CloneCardBox";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useCardModalContext } from "@/context/CardModalContext";
import AddMemberModal from "./AddMemberModal";
import { addCardMemberAction } from "@/redux/cardSlice";
import { useParamCard } from "@/hooks/useParamCard";

const ModalSidebar: React.FC = () => {
  const dispatch = useAppDispatch();

  const { setOpenPopover, PopoverType } = useCardModalContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenAddMember, setIsOpenAddMember] = useState(false);

  const userId = useAppSelector((state) => state.user.user._id);
  const cardData = useParamCard();

  const SidebarBox: React.FC<{
    title: string;
    className?: string;
    data: any[];
  }> = ({ title, data, className }) => {
    return (
      <div className={className}>
        <h3>{title}</h3>
        <div className="action-list">
          {data.map((ele, idx) => (
            <Button
              block
              key={idx}
              className="button-link"
              onClick={ele.onClickEvent}
              loading={ele.loading}
            >
              <span style={{ marginRight: "6px" }}>{ele.icon}</span>
              <span>{ele.label}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const handleJoinCard = async () => {
    const cardId = cardData?._id;
    if (!cardId) {
      return;
    }
    setIsLoading(true);

    try {
      await dispatch(addCardMemberAction({ cardId, userIdList: [userId] }));
      message.success(`加入成功`);
    } catch (error) {}

    setIsLoading(false);
  };
  return (
    <>
      <ModalSidebarStyled style={ModalStyle}>
        {!cardData?.member.some((user) => user.userId._id === userId) && (
          <Col>
            <h4>建議</h4>
            <Button
              className="button-link"
              onClick={handleJoinCard}
              icon={<UserOutlined />}
              loading={isLoading}
            >
              加入
            </Button>
          </Col>
        )}
        {/** Modal */}
        {isOpenAddMember && (
          <AddMemberModal
            setIsOpenAddMember={setIsOpenAddMember}
            style={{ top: " 32px", left: 0 }}
          />
        )}
        <SidebarBox
          className={"mid"}
          title={"新增至卡片"}
          data={[
            {
              label: "成員",
              value: "member",
              icon: <UserOutlined />,
              onClickEvent: () => {
                setIsOpenAddMember(true);
              },
            },
            { label: "標籤", value: "member", icon: <TagOutlined /> },
            {
              label: "代辦清單",
              value: "member",
              icon: <CheckSquareOutlined />,
              onClickEvent: () => {
                setOpenPopover({
                  isShow: true,
                  type: PopoverType.CHECKLIST,
                  position: { top: 230, right: 20 },
                });
              },
            },
            {
              label: "日期",
              value: "member",
              icon: <ClockCircleOutlined />,
              onClickEvent: () => {
                setOpenPopover({
                  isShow: true,
                  type: PopoverType.DATE,
                  position: { top: 100, right: 20 },
                });
              },
            },
          ]}
        />

        <AttachmentBox />
        <SidebarBox
          className={"mid"}
          title={"動作"}
          data={[
            { label: "移動", value: "move", icon: <ArrowRightOutlined /> },
          ]}
        />
        <CloneCardBox />
        <Divider style={{ margin: "8px 0" }} />
        <Button className="button-link">
          <span style={{ marginRight: "6px" }}>
            <ContainerOutlined />
          </span>
          <span>封存</span>
        </Button>
        <Button className="button-link">
          <span style={{ marginRight: "6px" }}>
            <ShareAltOutlined />
          </span>
          <span>分享</span>
        </Button>
      </ModalSidebarStyled>
    </>
  );
};

export default ModalSidebar;
