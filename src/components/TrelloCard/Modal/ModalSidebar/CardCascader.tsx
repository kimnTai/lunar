import React, { useState } from "react";
import { Cascader, Form, FormItemProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { getBoardApi } from "@/api/boards";
import { useAppSelector } from "@/hooks";
import { selectOrganization } from "@/redux/organizationSlice";
import { nextPosition } from "@/utils/cardFunc";

const CardCascader: React.FC<FormItemProps> = (props) => {
  const organization = useAppSelector(selectOrganization);

  const [options, setOptions] = useState(
    organization
      .filter(({ board }) => board.length)
      .map(({ id, name, board }) => ({
        value: id,
        label: name,
        children: board.map(({ id, name }) => ({
          value: id,
          label: name,
          isLeaf: false,
        })),
      }))
  );

  const loadData = async (selectedOptions: DefaultOptionType[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    if (!targetOption || selectedOptions.length !== 2) {
      return;
    }

    const { result } = await getBoardApi(`${targetOption.value}`);

    targetOption.children = result.list.map(({ id, name, card }) => ({
      value: id,
      label: name,
      children: [
        ...card.map((_, index, array) => ({
          value: nextPosition(array, index),
          label: index,
        })),
        {
          value: nextPosition(card, card.length),
          label: card.length,
        },
      ],
    }));

    setOptions([...options]);
  };
  return (
    <Form.Item {...props}>
      <Cascader
        placement={"bottomRight"}
        options={options}
        loadData={loadData}
      />
    </Form.Item>
  );
};

export default CardCascader;
