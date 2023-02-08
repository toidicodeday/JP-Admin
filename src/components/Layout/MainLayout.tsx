import { Layout } from "antd";
import LayoutHeader from "./LayoutHeader";
import LayoutFooter from "./LayoutFooter";
import LayoutSidebar from "./LayoutSidebar";
import LayoutContent from "./LayoutContent";
import "./style.scss";

const MainLayout = () => {
  return (
    <Layout className="font-sans">
      <Layout className="relative site-layout h-screen overflow-hidden">
        <LayoutSidebar />
        <Layout.Content>
          <LayoutHeader />
          <LayoutContent />
          <LayoutFooter />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
