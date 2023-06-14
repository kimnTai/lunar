import React, { ReactNode, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { List, Row, Select, Spin } from "antd";
import { debounce } from "lodash";
import { searchCardsApi } from "@/api/search";

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

      const _options = result.map(({ card, board }) => ({
        value: `/board/${card.boardId}/cards/${card._id}`,
        label: (
          <List itemLayout="horizontal">
            <List.Item>
              <List.Item.Meta title={card.name} description={board.name} />
            </List.Item>
          </List>
        ),
      }));

      setOptions(_options);
    } catch (error) {}

    setSpinning(false);
  }, 800);

  return (
    <Select
      showSearch
      labelInValue
      filterOption={false}
      placeholder="搜尋所有卡片"
      // FIXME: 樣式跑掉了
      className={workSpaceId ? "search" : "darkSearch"}
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
      }}
    />
  );
};

export default SearchCardInput;
