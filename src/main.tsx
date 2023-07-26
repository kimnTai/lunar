import "@/assets/scss/index.scss";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";

dayjs.extend(isBetween);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
