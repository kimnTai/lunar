import React, { useRef, useState } from "react";
// import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { Button, Space, Checkbox, Input, Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  PopoverDateStyled,
  AntCalendarStyled,
  PopoverSectionTitleStyled,
  DateSelectorStyled,
} from "./PopverDateStyle";
// import 'dayjs/locale/zh-tw';
// dayjs.locale('zh-tw');

const PopoverDate: React.FC = ({ close }) => {
  // const [startDate, setStartDate] = useState<Dayjs>(() => dayjs(new Date()));
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [editDateType, setEditDateType] = useState<string>(""); // start or end or ''
  const [isCheckStartFeild, setIsCheckStartFeild] = useState<boolean>(false);
  const [isCheckEndFeild, setIsCheckEndFeild] = useState<boolean>(false);
  const endDateInputRef = useRef(null);

  const handleSelectDate = (value: Dayjs) => {
    if (editDateType === "start") {
      setStartDate(value);
    } else if (editDateType === "end") {
      setEndDate(value);
    }
  };

  const handleDateCheckboxChange = (e: any, dateField: string) => {
    switch (dateField) {
      case "start":
        setIsCheckStartFeild(e.target.checked);
        break;
      case "end":
        setIsCheckEndFeild(e.target.checked);
        break;
      default:
        break;
    }

    if (e.target.checked) {
      switch (dateField) {
        case "start":
          setEditDateType("start");
          break;
        case "end":
          setEditDateType("end");
          // endDateInputRef.current?.focus(); // 沒反應
          break;
        default:
          break;
      }
    } else {
      switch (dateField) {
        case "start":
          setStartDate(null);
          break;
        case "end":
          setEndDate(null);
          break;
        default:
          break;
      }
    }
  };

  const handleSaveDate = () => {
    // TODO
    close();
  };

  const handleRemoveDate = () => {
    // TODO
    setEditDateType("");
    setStartDate(null);
    setEndDate(null);
    setIsCheckEndFeild(false);
    setIsCheckStartFeild(false);
    close();
  };

  return (
    <PopoverDateStyled>
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
            value={editDateType === "start" ? startDate : endDate}
            fullscreen={false}
            onChange={handleSelectDate}
            onSelect={handleSelectDate}
          />
          <DateSelectorStyled>
            <Space
              size={0}
              direction="vertical"
              style={{ display: "flex", marginBottom: "16px" }}
            >
              <PopoverSectionTitleStyled>起始日</PopoverSectionTitleStyled>
              <Space size={4}>
                <Checkbox
                  checked={isCheckStartFeild}
                  onChange={(e) => handleDateCheckboxChange(e, "start")}
                />
                <Input
                  type="text"
                  value={startDate?.format("YYYY年MM月DD日") || ""}
                  onFocus={() => setEditDateType("start")}
                  className={isCheckStartFeild ? "isShow" : "isHidden"}
                  placeholder="年月日"
                />
                {!isCheckStartFeild && (
                  <span className="dateDisplay">
                    {startDate?.format("YYYY年MM月DD日") || "年月日"}
                  </span>
                )}
              </Space>
            </Space>
            <Space
              size={0}
              direction="vertical"
              style={{ display: "flex", marginBottom: "16px" }}
            >
              <PopoverSectionTitleStyled>截止日</PopoverSectionTitleStyled>
              <Space size={4}>
                <Checkbox
                  checked={isCheckEndFeild}
                  onChange={(e) => handleDateCheckboxChange(e, "end")}
                />
                <Input
                  type="text"
                  value={endDate?.format("YYYY年MM月DD日") || ""}
                  ref={endDateInputRef}
                  onFocus={() => setEditDateType("end")}
                  className={isCheckEndFeild ? "isShow" : "isHidden"}
                  placeholder="年月日"
                />
                {!isCheckEndFeild && (
                  <span className="dateDisplay">
                    {endDate?.format("YYYY年MM月DD日") || "年月日"}
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
          <Button block onClick={handleRemoveDate}>移除</Button>
        </Card>
      </Space>
    </PopoverDateStyled>
  );
};

export default PopoverDate;
