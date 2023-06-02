import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const SpinPage: React.FC = () => (
  <div
    className="d-center"
    style={{ height: "100%", backgroundColor: "var(--graye9)" }}
  >
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </div>
);

export default SpinPage;
