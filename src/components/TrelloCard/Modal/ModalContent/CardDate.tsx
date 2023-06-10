import React, { useEffect, useState } from "react";
import { Checkbox, Col, Space, Tag } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useCardModalContext } from "@/context/CardModalContext";
import { useAppDispatch } from "@/hooks";
import { updateCardDateAction } from "@/redux/cardSlice";
import {
  CardDateStyled,
  SectionContentStyled,
  SectionHeaderStyled,
} from "./style";
import { useParamCard } from "@/hooks/useParamCard";

const CardDate: React.FC = () => {
  const dispatch = useAppDispatch();
  const cardData = useParamCard();
  const { setOpenPopover, PopoverType } = useCardModalContext();
  const { startDate, dueDate, dueComplete } = cardData?.date ?? {}; // 2023-05-22T00:00:00.000Z

  const [isCompleted, setIsCompleted] = useState(dueComplete);
  const [isExpired, setIsExpired] = useState(false);

  const handleComplete = async ({ target }: CheckboxChangeEvent) => {
    if (!cardData) {
      return;
    }
    try {
      await dispatch(
        updateCardDateAction({
          cardId: cardData.id,
          dueComplete: target.checked,
        })
      );
      setIsCompleted(target.checked);
    } catch (error) {
      console.log(error);
    }
  };

  // 逾期判斷
  useEffect(() => {
    if (dueDate && !isCompleted) {
      const yesterday = dayjs().subtract(1, "day");
      const endDate = dayjs(dueDate);
      setIsExpired(endDate.isBefore(yesterday));
    } else {
      setIsExpired(false);
    }
  }, [dueDate, isCompleted]);

  // 沒有設定日期不顯示日期區塊
  if (!cardData || !cardData?.date) {
    return null;
  }

  return (
    <>
      <SectionHeaderStyled align="middle" gutter={8}>
        <Col flex="none">
          <h3>到期日</h3>
        </Col>
      </SectionHeaderStyled>
      <SectionContentStyled>
        {cardData?.date && (
          <CardDateStyled>
            <Space
              className="cardDate"
              onClick={() => {
                setOpenPopover({
                  isShow: true,
                  type: PopoverType.DATE,
                  position: {
                    top: 100,
                    left: 100,
                  },
                });
              }}
            >
              {startDate ? dayjs(startDate).format("MM月DD日") : null}
              {startDate && dueDate ? " - " : null}
              {dueDate ? dayjs(dueDate).format("MM月DD日") : null}
              {isExpired && <Tag color="red">逾期</Tag>}
              <EditOutlined />
            </Space>

            <Space size={8} className="checkFinish">
              <Checkbox
                checked={isCompleted}
                onChange={(e) => handleComplete(e)}
              >
                已完成
              </Checkbox>
            </Space>
          </CardDateStyled>
        )}
      </SectionContentStyled>
    </>
  );
};

export default CardDate;
