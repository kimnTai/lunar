import "./matchMedia.ts";
import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import Login from "@/pages/Login/index";
import { useDispatch } from "react-redux";

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
    // console.log(screen)
    expect(screen.getByText("讓工作，更有序")).toBeInTheDocument();
  });
});
