import { Skeleton } from "antd";
import { WorkSpaceCardCss } from "./style";

// 目前沒用到
const SkeletonCard: React.FC = () => {
  return (
    <WorkSpaceCardCss
      background-image={"none"}
      style={{ backgroundColor: "var(--gray9f)" }}
    >
      <Skeleton active />
    </WorkSpaceCardCss>
  );
};

export default SkeletonCard;
