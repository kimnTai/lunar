import React, { useState } from "react";
import { useParams } from "react-router";
import { Button, message, Popover, Upload } from "antd";
import { PaperClipOutlined, WalletOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { newAttachmentAction, selectCardById } from "@/redux/cardSlice";

const AttachmentBox: React.FC = () => {
  const { cardId } = useParams();
  const cardData = useAppSelector(selectCardById(cardId));
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <Popover
      placement="bottom"
      trigger="click"
      open={isPopoverOpen}
      onOpenChange={setPopoverOpen}
      content={
        <Upload
          accept={`.png, .jpg`}
          onChange={(info) => {
            if (info.file.status === "done") {
              message.success(`${info.file.name} 上傳成功`);
            }
            if (info.file.status === "error") {
              message.error(`${info.file.name} 上傳失敗`);
            }
          }}
          customRequest={async (options) => {
            if (typeof options.file === "string" || !cardData) {
              options.onError?.(new Error("上傳錯誤"));
              return;
            }
            try {
              await dispatch(
                newAttachmentAction({
                  file: options.file,
                  filename: `${options.filename}`,
                  cardId: cardData._id,
                })
              );
              options.onSuccess?.("");
            } finally {
              setPopoverOpen(false);
            }
          }}
        >
          <Button>上傳封面圖片</Button>
        </Upload>
      }
    >
      <a className="button-link">
        <span style={{ marginRight: "6px" }}>
          <PaperClipOutlined />
        </span>
        <span>附件</span>
      </a>
      {!cardData?.attachment.length && (
        <a className="button-link">
          <span style={{ marginRight: "6px" }}>
            <WalletOutlined />
          </span>
          <span>封面</span>
        </a>
      )}
    </Popover>
  );
};

export default AttachmentBox;
