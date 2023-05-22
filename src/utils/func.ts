import type { MenuProps } from "antd";
import type { RcFile } from "antd/es/upload";

type MenuItem = Required<MenuProps>["items"][number];

export const getMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

export const getBase64 = async (file: RcFile) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  await new Promise((resolve) => (reader.onload = resolve));

  return `${reader.result}`;
};
