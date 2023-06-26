import React, { ReactNode, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { List, Row, Select, Spin } from "antd";
import { debounce } from "lodash";
import { searchCardsApi } from "@/api/search";
import { SearchCardInputStyled } from "./style";
import { SearchOutlined } from "@ant-design/icons";

const SearchCardInput: React.FC = () => {
  const navigate = useNavigate();
  const { workSpaceId } = useParams();

  const [spinning, setSpinning] = useState(false);
  const [options, setOptions] = useState<
    {
      value: string;
      label: ReactNode;
    }[]
  >([]);

  const onSearch = debounce(async (query: string) => {
    if (query.length < 1) {
      return;
    }
    setSpinning(true);
    setOptions([]);

    try {
      const { result } = await searchCardsApi({ query });

      const _options = result.map((card) => ({
        value: `/board/${card.boardId._id}/cards/${card._id}`,
        label: (
          <List itemLayout="horizontal">
            <List.Item>
              <List.Item.Meta
                title={card.name}
                description={card.boardId.name}
              />
            </List.Item>
          </List>
        ),
      }));

      setOptions(_options);
    } catch (error) {}

    setSpinning(false);
  }, 800);

  return (
    <SearchCardInputStyled>
      <Select
        showSearch
        labelInValue
        filterOption={false}
        placeholder={
          <p className="d-center">
            <SearchOutlined
              style={{
                fontSize: "15px",
                marginRight: "12px",
                color: workSpaceId ? "black" : "white",
              }}
            />
            搜尋所有卡片
          </p>
        }
        className={workSpaceId ? "search" : "darkSearch"}
        suffixIcon={null}
        notFoundContent={
          spinning && (
            <Row
              justify={"center"}
              style={{
                padding: "8px",
              }}
            >
              <Spin />
            </Row>
          )
        }
        options={options}
        onSearch={onSearch}
        onChange={({ key }) => {
          navigate(key);
          setOptions([]);
        }}
        // TODO:型別
        value={[] as any}
      />
    </SearchCardInputStyled>
  );
};

export default SearchCardInput;
