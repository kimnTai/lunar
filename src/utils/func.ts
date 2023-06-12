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

export const isDarkColor = (color: string) => {
  // 將顏色代碼轉換為RGB值
  const hexToRGB = (hex: string) =>
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (_, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      ?.map((x) => parseInt(x, 16));

  // 獲取RGB值的亮度
  const getBrightness = (rgb: number[]) =>
    (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

  // 將顏色代碼轉換為RGB值並計算亮度
  const rgb = hexToRGB(color);
  const brightness = getBrightness(rgb || []);

  // 根據亮度判斷是否為深色
  return brightness < 128;
};
