import React, { useState } from "react";
import styled from "styled-components";
import {
  PlusOutlined,
  DownOutlined,
  HolderOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Input, Button, Dropdown, Space, Col, Row, Tooltip } from "antd";
import { Link } from "react-router-dom";

const HeaderCss = styled.div`
  padding: 4px 6px;
  background-color: var(--dark);
  .headerFunc {
    padding-right: 10px;
  }
  .serch {
    width: 200px;
  }
`;

const items: MenuProps["items"] = [
  {
    label: "Submit and continue",
    key: "1",
  },
];
const { Search } = Input;
export const Header: React.FC<{ openNav: Function }> = ({ openNav }) => {
  const [serch, setSerch] = useState("");
  return (
    <HeaderCss>
      <Row justify="space-between" align="middle">
        <Col>
          <Row align="middle">
            <Col>
              <Button
                onClick={() => openNav()}
                type="link"
                style={{
                  height: "42px",
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
                ghost
              >
                <HolderOutlined />
              </Button>
            </Col>
            <Col>
              <div>IAmLOGO</div>
            </Col>
            <Col>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Button ghost>
                  <Space>
                    工作區
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Button ghost>
                  <Space>
                    更多
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </Col>
            <Col>
              <Button ghost>
                <PlusOutlined />
              </Button>
            </Col>
          </Row>
        </Col>
        <Col className="headerFunc">
          <Row align="middle">
            <Col>
              <Search
                placeholder="搜尋"
                onSearch={setSerch}
                className="serch"
              />
            </Col>
            <Col>
              <Tooltip title="search">
                <Button shape="circle" icon={<BellOutlined />} ghost />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="search">
                <Button
                  shape="circle"
                  icon={<QuestionCircleOutlined />}
                  ghost
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="search">
                <Button type="primary" shape="circle" icon={<UserOutlined />} />
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
    </HeaderCss>
  );
};
