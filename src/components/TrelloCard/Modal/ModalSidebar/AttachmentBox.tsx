import React, { useState } from "react";
import { Button, Popover, Upload } from "antd";
import { PaperClipOutlined, WalletOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/hooks";
import { newAttachmentAction } from "@/redux/cardSlice";
import { useParamCard } from "@/hooks/useParamCard";
import openNotification from "@/utils/openNotification";

const AttachmentBox: React.FC = () => {
  const cardData = useParamCard();
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
          onChange={({ file }) => {
            if (file.status === "done") {
              openNotification({
                message: `${file.name} 上傳成功`,
              });
            }
            if (file.status === "error") {
              openNotification({
                message: `${file.name} 上傳失敗`,
                success: false,
              });
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
