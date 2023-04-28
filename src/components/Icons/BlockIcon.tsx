import React from "react";
import Block from "@/assets/images/Block";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const BlockIcon: React.FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={Block} {...props} />;
};

export default BlockIcon;
