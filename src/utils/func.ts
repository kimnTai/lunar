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

// https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
export const stringToHSL = (param: {
  target: string;
  options?: {
    hue?: [number, number];
    sat?: [number, number];
    lit?: [number, number];
  };
}) => {
  const { target } = param;
  if (target.length === 0) {
    return "";
  }

  let hash = 0;

  for (let i = 0; i < target.length; i++) {
    hash = target.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const range = (hash: number, min: number, max: number) => {
    let diff = max - min;
    let x = ((hash % diff) + diff) % diff;
    return x + min;
  };

  let opts = param.options || {};
  opts.hue = opts.hue || [0, 360];
  opts.sat = opts.sat || [75, 100];
  opts.lit = opts.lit || [40, 60];

  const h = range(hash, opts.hue[0], opts.hue[1]);
  const s = range(hash, opts.sat[0], opts.sat[1]);
  const l = range(hash, opts.lit[0], opts.lit[1]);

  return `hsl(${h}, ${s}%, ${l}%)`;
};
