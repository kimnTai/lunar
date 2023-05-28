import React, { useEffect } from "react";
import { Checkbox, Col, Space, Tag } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import dayjs from "dayjs";
import { DateProps } from "@/interfaces/cards";
import { useCardModalContext } from "@/context/CardModalContext";
import PopoverDate from "@/components/PopoverDate";
import {
  CardDateStyled,
  SectionContentStyled,
  SectionHeaderStyled,
} from "./style";
import { EditOutlined } from "@ant-design/icons";
import { updateCardDateApi } from "@/api/cards";

const CardDate: React.FC = () => {
  const { cardData } = useCardModalContext();
  const { id = "", date = {} as DateProps } = cardData ?? {};
  const { startDate = "", dueDate = "", dueComplete = false } = date ?? {}; // 2023-05-22T00:00:00.000Z

  // 沒有設定日期不顯示日期區塊
  if (!date) {
    return null;
  }

  const [isOpenPopoverDate, setIsOpenPopoverDate] =
    React.useState<boolean>(false);
  const [isCompleted, setIsCompleted] = React.useState<boolean>(dueComplete);
  const [isExpired, setIsExpired] = React.useState<boolean>(false);

  const handleComplete = async (_e: CheckboxChangeEvent) => {
    try {
      await updateCardDateApi(id, {
        dueComplete: _e.target.checked,
      });
      setIsCompleted(_e.target.checked);
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

  return (
    <>
      <SectionHeaderStyled align="middle" gutter={8}>
        <Col flex="none">
          <h3>到期日</h3>
        </Col>
      </SectionHeaderStyled>
      <SectionContentStyled>
        {date && (
          <CardDateStyled>
            <Space
              className="cardDate"
              onClick={() => {
                setIsOpenPopoverDate(true);
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
      {isOpenPopoverDate && (
        <PopoverDate
          close={() => setIsOpenPopoverDate(false)}
          position={{ top: 100, left: 100 }}
        />
      )}
    </>
  );
};

export default CardDate;
