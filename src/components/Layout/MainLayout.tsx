import { Layout } from "antd";
import LayoutHeader from "./LayoutHeader";
// import LayoutFooter from "./LayoutFooter";
import LayoutSidebar from "./LayoutSidebar";
import LayoutContent from "./LayoutContent";
import "./style.scss";
import LayoutFooter from "./LayoutFooter";

const MainLayout = () => {
  return (
    <Layout className="font-sans">
      <Layout className="relative site-layout h-screen overflow-hidden">
        <LayoutSidebar />
        <Layout.Content>
          <LayoutHeader />
          <Layout.Content className="layout_content-wrap">
            <LayoutContent />
            <LayoutFooter />
          </Layout.Content>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
