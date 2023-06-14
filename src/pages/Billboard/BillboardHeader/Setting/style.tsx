import styled from "styled-components";

export const SettingContentStyle = styled.div`
  .peopleView {
    position: absolute;
    width: 250px;
    height: 260px;
    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
    right: -25px;
    top: 0px;
    border-radius: 8px;
  }
  .peopleTitle {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    text-align: center;
    border-bottom: 1px solid var(--ds-border, #091e4221);
  }

  .changeWorkSpaceView {
    position: absolute;
    width: 250px;
    height: 160px;
    background: #ffffff;
    box-shadow: 0px -1px 16px rgba(0, 0, 0, 0.16);
    right: -25px;
    top: 19px;
    border-radius: 8px;
  }
`;
