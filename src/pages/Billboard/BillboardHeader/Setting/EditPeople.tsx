import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";

const EditPeople: React.FC<{
  setState: React.Dispatch<
    React.SetStateAction<"NONE" | "WORKSPACE" | "PEOPLE">
  >;
  setPeople: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setState, setPeople }) => {
  const PeopleClick = (e: any) => {
    const str = e.currentTarget.innerText.split("\n\n")[0];
    setPeople(str);
    setState("NONE");
  };
  return (
    <div className="peopleView">
      <div className="peopleTitle">
        <p>評論權限</p>
        <Button
          size="small"
          type="text"
          icon={
            <CloseOutlined
              style={{
                color: "var(--gray66)",
              }}
            />
          }
          style={{ position: "absolute", right: 3 }}
          onClick={() => setState("NONE")}
        />
      </div>
      <div className="peopleContent">
        <Button
          type="text"
          onClick={PeopleClick}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "0 12px",
            height: "64px",
            lineHeight: "32px",
          }}
        >
          Disabled
          <p
            style={{
              fontSize: "12px",
              marginTop: "-10px",
              marginLeft: "2px",
              color: "gray",
            }}
          >
            沒有人可以發表評論
          </p>
        </Button>
        <Button
          type="text"
          onClick={PeopleClick}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "0 12px",
            height: "64px",
            lineHeight: "32px",
          }}
        >
          成員
          <p
            style={{
              fontSize: "12px",
              marginTop: "-10px",
              marginLeft: "2px",
              color: "gray",
            }}
          >
            管理員及成員可以發表評論
          </p>
        </Button>
        <Button
          type="text"
          onClick={PeopleClick}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "0 12px",
            height: "64px",
            lineHeight: "32px",
          }}
        >
          工作區成員
          <p
            style={{
              fontSize: "12px",
              marginTop: "-10px",
              marginLeft: "2px",
              color: "gray",
            }}
          >
            此工作區的所有成員皆可發表評論
          </p>
        </Button>
      </div>
    </div>
  );
};

export default EditPeople;
