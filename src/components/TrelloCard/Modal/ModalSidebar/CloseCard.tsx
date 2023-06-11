import React, { useState } from "react";
import { Button } from "antd";
import { ContainerOutlined } from "@ant-design/icons";
import { closeCardAction } from "@/redux/cardSlice";
import { useAppDispatch } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { useNavigate } from "react-router";

const CloseCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cardData = useParamCard();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      className="button-link"
      loading={loading}
      onClick={async () => {
        if (!cardData) {
          return;
        }
        setLoading(true);
        try {
          await dispatch(closeCardAction(cardData._id));
          //TODO:封存後畫面滯留，告知該卡片已封存
          navigate(`/board/${cardData.boardId}`);
        } catch (error) {}
        setLoading(false);
      }}
    >
      <span style={{ marginRight: "6px" }}>
        <ContainerOutlined />
      </span>
      <span>封存</span>
    </Button>
  );
};

export default CloseCard;
