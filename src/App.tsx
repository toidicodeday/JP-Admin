import "./styles/index.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Row } from "antd";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <React.Suspense
        fallback={
          <Row
            justify="center"
            align="middle"
            className="max-w-full min-h-screen text-blue-500 text-base"
          >
            <LoadingOutlined spin className="text-xl" />
          </Row>
        }
      >
        <AppRoutes />
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
