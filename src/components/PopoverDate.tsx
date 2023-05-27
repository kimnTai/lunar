import React, { useEffect, useRef, useState } from "react";
import { Button, Space, Checkbox, Input, Card, InputRef } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { DateProps } from "@/interfaces/cards";
import { useCardModalContext } from "@/context/CardModalContext";
import { newCardDateApi, deleteCardDateApi } from "@/api/cards";
import {
  PopoverDateStyled,
  AntCalendarStyled,
  PopoverSectionTitleStyled,
  DateSelectorStyled,
} from "./PopverDateStyle";

import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

interface PopoverDateProps {
  close: () => void;
  position: {
    top: number;
    left?: number;
    right?: number;
  };
}

const PopoverDate: React.FC<PopoverDateProps> = ({ close, position }) => {
  const { cardData, setCardData } = useCardModalContext();
  const { id = "", date = {} as DateProps } = cardData ?? {};
  const { startDate = "", dueDate = "" } = date ?? {}; // 2023-05-22T00:00:00.000Z

  const [startDateField, setStartDateField] = useState<Dayjs | null>(
    startDate ? () => dayjs(startDate) : null
  ); // dayjs object
  const [endDateField, setEndDateField] = useState<Dayjs | null>(
    dueDate ? () => dayjs(dueDate) : null
  );
  const [editDateType, setEditDateType] = useState<string>(""); // start or end or ""
  const [isCheckStartField, setIsCheckStartField] = useState<boolean>(false);
  const [isCheckEndField, setIsCheckEndField] = useState<boolean>(true);

  const startDateFieldRef = useRef<InputRef | null>(null);
  const endDateFieldRef = useRef<InputRef | null>(null);

  const handleCalendarValue = () => {
    if (editDateType === "" && !startDateField && !endDateField) {
      // 初始都沒有設定日期日曆指定今天
      return dayjs(new Date());
    } else {
      switch (editDateType) {
        case "start":
          return startDateField ? startDateField : undefined; // 因 Calendar value 只接受 dayjs 或 undefined
        case "end":
          return endDateField ? endDateField : undefined;
        default:
          return undefined;
      }
    }
  };

  const handleSelectDate = (value: Dayjs) => {
    if (editDateType === "start") {
      // 起始日設定的比截止日晚，則截止日設為起始日隔天
      if (endDateField && value.isAfter(endDateField)) {
        setStartDateField(value);
        setEndDateField(value.add(1, "day"));
        return;
      }
      setStartDateField(value);
    } else if (editDateType === "end") {
      // 截止日設定的比起始日早，則起始日設為截止日前一天
      if (startDateField && value.isBefore(startDateField)) {
        setEndDateField(value);
        setStartDateField(value.subtract(1, "day"));
        return;
      }
      setEndDateField(value);
    }
  };

  const handleDateCheckboxChange = (e: any, dateField: string) => {
    switch (dateField) {
      case "start":
        setIsCheckStartField(e.target.checked);
        if (e.target.checked) {
          setEditDateType("start");
        } else {
          setStartDateField(null);
        }
        break;
      case "end":
        setIsCheckEndField(e.target.checked);
        if (e.target.checked) {
          setEditDateType("end");
        } else {
          setEndDateField(null);
        }
        break;
      default:
        break;
    }
  };

  const handleSaveDate = async () => {
    // 未勾選起始和截止日按儲存 = 移除日期
    if (!isCheckStartField && !isCheckEndField) {
      handleRemoveDate();
      return;
    }

    try {
      const {
        result: { _id, cardId, dueComplete, startDate, dueDate },
      } = await newCardDateApi(id, {
        startDate: startDateField?.format() ?? "",
        dueDate: endDateField?.format() ?? "",
      });

      // 更新卡片畫面資料
      setCardData({
        ...cardData!,
        date: {
          _id: _id,
          cardId: cardId,
          dueComplete: dueComplete,
          dueReminder: 0,
          startDate: startDate,
          dueDate: dueDate,
        },
      });
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveDate = async () => {
    try {
      await deleteCardDateApi(id);
      setEditDateType("");
      setStartDateField(null);
      setEndDateField(null);
      setIsCheckEndField(false);
      setIsCheckStartField(false);

      // 更新卡片畫面資料
      setCardData({
        ...cardData!,
        date: null,
      });

      close();
    } catch (error) {
      console.error(error);
    }
  };

  // 打開 popover，日期若已設，打勾 checkbox
  useEffect(() => {
    if (startDateField) {
      setIsCheckStartField(true);
    }
    if (endDateField) {
      setIsCheckEndField(true);
    }
  }, []);

  // 打開 popover 後自動 focus 起始日輸入框
  useEffect(() => {
    if (!startDateField && !endDateField) {
      // 日期尚未設定
      endDateFieldRef?.current?.focus();
      setEndDateField(dayjs(new Date()));
    } else if (startDateField && !endDateField) {
      // 只設定起始日
      startDateFieldRef?.current?.focus();
    } else {
      // 只設定截止日, or 起始日和截止日都設定
      endDateFieldRef?.current?.focus();
    }
  }, []);

  // 顯示連續日期區間
  const dateCellRender = (date: dayjs.Dayjs) => {
    if (!startDateField || !endDateField) {
      return null;
    }

    const isInRange = date?.isBetween(
      startDateField,
      endDateField,
      "day",
      "[]"
    );
    return isInRange ? <div className="range-marker" /> : null;
  };

  return (
    <PopoverDateStyled position={position}>
      <Space direction="vertical" size={16}>
        <Card
          title={"日期"}
          extra={
            <Button type="link" icon={<CloseOutlined />} onClick={close} />
          }
          size="small"
          style={{ width: 326 }}
        >
          <AntCalendarStyled
            value={handleCalendarValue()}
            fullscreen={false}
            onChange={handleSelectDate}
            onSelect={handleSelectDate}
            cellRender={dateCellRender}
          />
          <DateSelectorStyled>
            <Space size={0} direction="vertical" className="dayPickerForm">
              <PopoverSectionTitleStyled>起始日</PopoverSectionTitleStyled>
              <Space size={4}>
                <Checkbox
                  checked={isCheckStartField}
                  onChange={(e) => handleDateCheckboxChange(e, "start")}
                />
                <Input
                  type="text"
                  value={startDateField?.format("YYYY年MM月DD日") || ""}
                  onFocus={() => setEditDateType("start")}
                  className={isCheckStartField ? "isShow" : "isHidden"}
                  placeholder="年月日"
                  ref={startDateFieldRef}
                />
                {!isCheckStartField && (
                  <span className="dateDisplay">
                    {startDateField?.format("YYYY年MM月DD日") || "年月日"}
                  </span>
                )}
              </Space>
            </Space>
            <Space size={0} direction="vertical" className="dayPickerForm">
              <PopoverSectionTitleStyled>截止日</PopoverSectionTitleStyled>
              <Space size={4}>
                <Checkbox
                  checked={isCheckEndField}
                  onChange={(e) => handleDateCheckboxChange(e, "end")}
                />
                <Input
                  type="text"
                  value={endDateField?.format("YYYY年MM月DD日") || ""}
                  onFocus={() => setEditDateType("end")}
                  className={isCheckEndField ? "isShow" : "isHidden"}
                  placeholder="年月日"
                  ref={endDateFieldRef}
                />
                {!isCheckEndField && (
                  <span className="dateDisplay">
                    {endDateField?.format("YYYY年MM月DD日") || "年月日"}
                  </span>
                )}
              </Space>
            </Space>
          </DateSelectorStyled>
          <Button
            type="primary"
            block
            onClick={handleSaveDate}
            style={{ marginBlock: "8px" }}
          >
            儲存
          </Button>
          <Button block onClick={handleRemoveDate}>
            移除
          </Button>
        </Card>
      </Space>
    </PopoverDateStyled>
  );
};

export default PopoverDate;
