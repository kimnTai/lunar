import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

const SpinPage: React.FC = () => (
  <div
    className="d-center"
    style={{ height: "100%", backgroundColor: "var(--graye9)" }}
  >
    <Spin indicator={antIcon} />
  </div>
);

export default SpinPage;
