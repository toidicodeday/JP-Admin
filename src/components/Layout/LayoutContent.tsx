import { Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import { Row } from "antd";
import { Outlet } from "react-router-dom";

// type Props = {};

const LayoutContent = () => {
  return (
    <Suspense
      fallback={
        <Row
          justify="center"
          align="middle"
          className="max-w-full min-h-screen text-blue-500 text-base"
        >
          <LoadingOutlined spin className="text-9xl" />
        </Row>
      }
    >
      <div className="flex-grow layout__content">
        <Outlet />
      </div>
    </Suspense>
  );
};

export default LayoutContent;
