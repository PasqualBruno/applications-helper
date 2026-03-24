import { ConfigProvider, theme } from "antd";
import EmailForm from "./components/EmailForm/EmailForm";
import { MainLayout } from "./components/MainLayout/MainLayout";
import "./index.css";

const customTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#f97316",
    colorBgLayout: "#000000",
    colorBgContainer: "#161b22",
    colorBorder: "#30363d",
    colorTextBase: "#ffffff",
    borderRadius: 6,
  },
  components: {
    Input: {
      colorBgContainer: "#0a0a0a",
      colorBorder: "#30363d",
      controlOutline: "rgba(249, 115, 22, 0.1)",
    },
    Button: {
      colorPrimary: "#f97316",
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <MainLayout>
        <EmailForm />
      </MainLayout>
    </ConfigProvider>
  );
}

export default App;
