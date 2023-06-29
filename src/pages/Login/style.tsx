import styled from "styled-components";
import { Button } from "antd";
import Bg_createAccount from "@/assets/images/bg_createAccount.png";

export const LoginCss = styled.div`
  position: relative;
  background-image: url(${Bg_createAccount});
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;

  .header {
    position: absolute;
    left: 21.15%;
    top: 28px;
    z-index: 5;
  }
  .ant-card {
    position: absolute;
    width: 448px;
    font-size: 14px;
    top: calc(50% - 614px / 2);
    left: calc(67.18% - 448px / 2);
    z-index: 6;
    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .ant-card-body {
    padding: "40px 64px 32px 64px";
  }
  .cardHeader {
    margin-bottom: 24px;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    width: 100%;
  }
  .ant-form-item {
    margin-bottom: 12px;
    input {
      height: 48px;
      font-size: 16px;
    }
  }
  .terms {
    color: var(--gray9f);
    text-align: center;
  }
  .have-account {
    margin-top: 24px;
    text-align: center;
    color: var(--gray66);
  }

  .contentText {
    position: absolute;
    left: 26.04%;
    top: 50%;
    z-index: 5;

    h3 {
      font-size: 32px;
      font-weight: 700;
    }
    span {
      font-size: 16px;
      display: block;
    }
  }

  .background {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .red_ball {
      position: absolute;
      left: 45.31%;
      top: 27.685%;
      object-fit: cover;
    }
    .blue_ball {
      position: absolute;
      top: 52.5%;
      left: 39.895%;
      object-fit: cover;
    }
    .bg_blue {
      position: absolute;
      left: 0;
      bottom: 0;
      object-fit: cover;
    }
    .bg_gray {
      position: absolute;
      top: 0;
      right: 0;
      object-fit: cover;
    }
  }
`;

export const ThirdPartyButtonCss = styled(Button)`
  width: 100%;
  font-size: 14px;
  margin-top: 8px;
  height: 44px;
  img {
    margin-right: 8px;
  }
  span {
    width: 144px;
  }
`;
