import React from "react";
import { HomeCss, Section1Css, Section2Css } from "./style";
import { Button, Input, Form } from "antd";

const HomeContent: React.FC = () => {
  return (
    <HomeCss>
      <>
        <Section1Css>
          <h1>
            Lunar 讓團隊更容易管理
            <br />
            專案和任務
          </h1>
          <div className="textArea">
            將您所有任務、團隊成員都整合在一起，追蹤並管理一切事務
          </div>

          <Form
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "21px",
            }}
          >
            <Form.Item
              name="email"
              rules={[{ type: "email" }]}
              style={{ display: "flex", marginBottom: 0, height: "40px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                marginBottom: 0,
                marginLeft: "26px",
                height: "40px",
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

          <img src="" alt="" className="" />
        </Section1Css>
        <div style={{ height: "113px" }}></div>
      </>
      <Section2Css>
        <span className="text">實際運用</span>
        <h2>適用於任何大型或小型專案的工作流程</h2>
      </Section2Css>
    </HomeCss>
  );
};

export default HomeContent;
