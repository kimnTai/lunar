import React from "react";
import { Image } from "antd";
import { useCardModalContext } from "@/context/CardModalContext";
import CardTitle from "./CardTitle";
import CardHeaderToolbar from "./CardHeaderToolbar";
import { ModalHeaderStyled } from "./style";

const ModalHeader: React.FC = () => {
  const { cardData } = useCardModalContext();

  const coverUrl = cardData?.attachment.at(0)?.dirname;

  return (
    <>
      <ModalHeaderStyled>
        {/* 封面 */}
        {coverUrl && (
          <Image
            src={coverUrl}
            width={"100%"}
            className="coverImg"
            style={{
              objectFit: "cover",
            }}
          />
        )}
        {/* 列表名稱 */}
        <CardHeaderToolbar />
        {/* 標題 */}
        <CardTitle />
      </ModalHeaderStyled>
    </>
  );
};

export default ModalHeader;
