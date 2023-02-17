import { Layout } from "antd";
import LayoutHeader from "./LayoutHeader";
import LayoutSidebar from "./LayoutSidebar";
import LayoutContent from "./LayoutContent";
import LayoutFooter from "./LayoutFooter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveUserMe } from "@/store/authSlice";
import api from "@/services";
import "./style.scss";

const MainLayout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    api.auth.getMe().then((res) => dispatch(saveUserMe(res)))
  }, [dispatch]);
  
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
