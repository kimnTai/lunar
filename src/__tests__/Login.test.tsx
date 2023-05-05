import "./matchMedia.ts";
import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import Login from "@/pages/Login/index";

afterEach(() => {
  cleanup();
});

describe("登入頁面測試", () => {
  test("讀取頁面", async () => {
    render(
      <Login
        loginAction={vi.fn()}
        signInAction={() => {}}
        loginGoogle={() => {}}
        getOrganization={() => {}}
        login={false}
        signIn={false}
      />
    );
    expect(screen.getByText("讓工作，更有序")).toBeInTheDocument();
  });
});
