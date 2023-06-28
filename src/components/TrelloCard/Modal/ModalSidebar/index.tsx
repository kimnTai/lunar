import React, { useState } from "react";
import { Button, Col, Divider } from "antd";
import {
  ArrowRightOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  ShareAltOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useCardModalContext } from "@/context/CardModalContext";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { addCardMemberAction } from "@/redux/cardSlice";
import openNotification from "@/utils/openNotification";
import AddMemberModal from "./AddMemberModal";
import AttachmentBox from "./AttachmentBox";
import CloneCard from "./CloneCard";
import CloseCard from "./CloseCard";
import LabelModal from "./LabelModal";
import MoveCard from "./MoveCard";
import SidebarBox from "./SidebarBox";
import { ModalSidebarStyled, ModalStyle } from "./style";

const ModalSidebar: React.FC = () => {
  const dispatch = useAppDispatch();

  const { setOpenPopover, PopoverType } = useCardModalContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenAddMember, setIsOpenAddMember] = useState(false);
  const [isOpenLabel, setIsOpenLabel] = useState(false);

  const userId = useAppSelector((state) => state.user.user._id);
  const cardData = useParamCard();

  const handleJoinCard = async () => {
    const cardId = cardData?._id;
    if (!cardId) {
      return;
    }
    setIsLoading(true);

    try {
      await dispatch(addCardMemberAction({ cardId, userIdList: [userId] }));
      openNotification({
        message: `加入成功`,
      });
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
        {isOpenLabel && (
          <LabelModal setIsOpenLabel={setIsOpenLabel} style={{ top: "64px" }} />
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
            {
              label: "標籤",
              value: "label",
              icon: <TagOutlined />,
              onClickEvent: () => {
                setIsOpenLabel(true);
              },
            },
            {
              label: "待辦清單",
              value: "checklist",
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
              value: "date",
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
        <SidebarBox className={"mid"} title={"動作"} data={[]} />
        <MoveCard>
          <a className="button-link">
            <span style={{ marginRight: "6px" }}>
              <ArrowRightOutlined />
            </span>
            <span>移動</span>
          </a>
        </MoveCard>
        <CloneCard />
        <Divider style={{ margin: "8px 0" }} />
        <CloseCard />
        <Button
          className="button-link"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            openNotification({
              message: "已複製到剪貼簿",
            });
          }}
        >
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
