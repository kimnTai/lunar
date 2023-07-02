import React, { useState } from "react";
import AvatarCustom from "@/components/AvatarCustom";
import { Button, Col, Input, List, Popover, Row, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { CommentProps } from "@/interfaces/comments";
import {
  deleteCardCommentAction,
  updateCardCommentAction,
} from "@/redux/cardSlice";
import { selectUser } from "@/redux/userSlice";
import openNotification from "@/utils/openNotification";
import CardCommentForm from "./CardCommentForm";
import { CardCommentListStyled, SectionHeaderStyled } from "./style";

const getTimeText = (time: string) => {
  const seconds = (Date.now() - new Date(time).getTime()) / 1000;
  const [days, hours, minutes] = [
    seconds / 60 / 60 / 24,
    (seconds / 60 / 60) % 24,
    (seconds / 60) % 60,
  ].map((item) => `${~~item}`);

  return `${days} 天 ${hours} 時 ${minutes} 分 前`;
};

const PopoverDelete: React.FC<{ commentData: CommentProps }> = ({
  commentData,
}) => {
  const dispatch = useAppDispatch();

  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);
  const [isDeleteSubmitting, setIsDeleteSubmitting] = useState(false);

  const handleDeleteComment = async () => {
    setIsDeleteSubmitting(true);

    try {
      await dispatch(
        deleteCardCommentAction({
          cardId: commentData.cardId,
          commentId: commentData._id,
        })
      );
      openNotification({
        message: `評論刪除成功`,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteSubmitting(false);
      setIsOpenDeleteConfirm(false);
    }
  };

  return (
    <Popover
      overlayStyle={{ width: "300px" }}
      trigger="click"
      open={isOpenDeleteConfirm}
      title={
        <Row justify="center" gutter={0}>
          <Col flex="none">
            <Space size={8}>
              <ExclamationCircleOutlined style={{ color: "red" }} />
              刪除評論
            </Space>
          </Col>
        </Row>
      }
      content={
        <Row gutter={0}>
          <Col span={24}>
            刪除評論是永久性的，無法復原
            <br />
            <br />
          </Col>
          <Col span={24}>
            <Button
              block
              danger
              onClick={handleDeleteComment}
              loading={isDeleteSubmitting}
            >
              刪除
            </Button>
          </Col>
          <Col span={24}>
            <Button
              block
              type="text"
              onClick={() => setIsOpenDeleteConfirm(false)}
            >
              取消
            </Button>
          </Col>
        </Row>
      }
    >
      <Button type="text" onClick={() => setIsOpenDeleteConfirm(true)}>
        刪除
      </Button>
    </Popover>
  );
};

const Comment: React.FC<{ itemData: CommentProps }> = ({ itemData }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [commentField, setCommentField] = useState(itemData.comment);
  const [isUpdateSubmitting, setIsUpdateSubmitting] = useState(false);

  const handleUpdateComment = async () => {
    setIsUpdateSubmitting(true);

    try {
      await dispatch(
        updateCardCommentAction({
          cardId: itemData.cardId,
          commentId: itemData._id,
          comment: commentField,
        })
      );
      openNotification({
        message: `評論更新成功`,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdateSubmitting(false);
      setIsCommentEdit(false);
    }
  };

  return (
    <>
      <List.Item
        actions={(() => {
          if (!isCommentEdit && itemData.userId._id === user._id) {
            return [
              <a
                key="list-loadmore-edit"
                onClick={() => {
                  setIsCommentEdit(true);
                }}
              >
                編輯
              </a>,
              <PopoverDelete commentData={itemData} />,
            ];
          }
        })()}
      >
        <List.Item.Meta
          avatar={
            <AvatarCustom
              username={itemData.userId.name}
              imgUrl={itemData.userId.avatar}
            />
          }
          title={
            <Space size={12}>
              <span className="userName">{itemData.userId.name}</span>
              <span className="timeText">
                {getTimeText(itemData.updatedAt)}
              </span>
            </Space>
          }
          description={
            !isCommentEdit ? (
              <div className="comment">{itemData.comment}</div>
            ) : (
              <Row className={isCommentEdit ? "isShow" : "isHidden"}>
                <Col span={24}>
                  <Row gutter={[16, 4]}>
                    <Col span={24}>
                      <Input.TextArea
                        value={commentField}
                        onChange={(e) => setCommentField(e.target.value)}
                        onPressEnter={(event) => {
                          event.preventDefault();
                          handleUpdateComment();
                        }}
                        placeholder="填寫評論"
                      />
                    </Col>
                    <Col span={24}>
                      <Space>
                        <Button
                          type="primary"
                          size="small"
                          onClick={handleUpdateComment}
                          loading={isUpdateSubmitting}
                        >
                          儲存
                        </Button>
                        <Button
                          size="small"
                          onClick={() => setIsCommentEdit(false)}
                        >
                          取消
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          }
        />
      </List.Item>
    </>
  );
};

const CardComment: React.FC = () => {
  const cardData = useParamCard();

  return (
    <>
      <SectionHeaderStyled align="middle" gutter={8}>
        <Col flex="none">
          <h3>評論</h3>
        </Col>
      </SectionHeaderStyled>
      <CardCommentListStyled>
        <List
          itemLayout="horizontal"
          dataSource={cardData?.comment}
          locale={{ emptyText: " " }}
          renderItem={(item) => <Comment itemData={item} />}
        />
      </CardCommentListStyled>
      <CardCommentForm />
    </>
  );
};

export default CardComment;
