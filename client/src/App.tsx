import { ConfigProvider, theme } from "antd";
import EmailForm from "./components/EmailForm/EmailForm";
import { MainLayout } from "./components/MainLayout/MainLayout";
import "./index.css";

const customTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#9d66ff",
    colorSuccess: "#00f5e1",
    colorBgLayout: "#101010",
    colorBgContainer: "#1a1a1a",
    borderRadius: 8,
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
