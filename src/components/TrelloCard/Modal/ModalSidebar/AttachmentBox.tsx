import React, { useState } from "react";
import { Button, message, Popover, Upload } from "antd";
import { PaperClipOutlined, WalletOutlined } from "@ant-design/icons";
import { newImageFileUrl } from "@/api/upload";
import { newAttachment } from "@/api/attachment";
import { useCardModalContext } from "@/context/CardModalContext";

const AttachmentBox: React.FC = () => {
  const { cardData, setCardData } = useCardModalContext();
  const [isPopoverOpen, setPopoverOpen] = useState(false);

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
          customRequest={(options) => {
            if (typeof options.file === "string" || !cardData) {
              options.onError?.(new Error("上傳錯誤"));
              return;
            }

            newImageFileUrl(options.file)
              .then((res) =>
                newAttachment({
                  filename: `${options.filename}`,
                  dirname: res.result.link,
                  cardId: cardData._id,
                })
              )
              .then(({ result }) => {
                setCardData((state) => {
                  if (state) {
                    return {
                      ...state,
                      attachment: [...state.attachment, result],
                    };
                  }
                  return state;
                });

                options.onSuccess?.(result.dirname);
              })
              .finally(() => {
                setPopoverOpen(false);
              });
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
