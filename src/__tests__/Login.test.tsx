import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import Login from "@/pages/Login/index";
import { nextPosition } from "@/utils/cardFunc";

afterEach(() => {
  cleanup();
});

describe("登入頁面測試", () => {
  test("讀取頁面", async () => {
    render(<Login isSignUpPage={false} />);
    expect(screen.getByText("讓工作，更有序")).toBeInTheDocument();
  });
});

describe("拖曳座標計算測試", () => {
  test("nextPosition 測試", async () => {
    const items = [
      { _id: "1", position: "100" },
      { _id: "2", position: "200" },
      { _id: "3", position: "300" },
      { _id: "4", position: "400" },
    ];
    // 空陣列新增
    expect(nextPosition([])).toBe(65535);
    // 插入新項目到最後一個位置
    expect(nextPosition(items)).toBe(65935);
    // 插入新項目到特定索引位置
    expect(nextPosition(items, 0)).toBe(50);
    expect(nextPosition(items, 1)).toBe(150);
    expect(nextPosition(items, 2)).toBe(250);
    expect(nextPosition(items, 3)).toBe(350);
    expect(nextPosition(items, 4)).toBe(65935);
    // 拖曳 id:2 項目時
    expect(nextPosition(items, 0, "2")).toBe(50);
    expect(nextPosition(items, 1, "2")).toBe(200);
    expect(nextPosition(items, 2, "2")).toBe(350);
    expect(nextPosition(items, 3, "2")).toBe(65935);
    // FIXME: id 為 NaN 時
    expect(nextPosition(items, NaN, "2")).toBe(65535);
  });
});
