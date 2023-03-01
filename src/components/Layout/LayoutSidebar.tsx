import { createMenus, getMenuKeyFromPath } from "@/utils/helpers/menu.helper";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import routes from "@/routes/protected-routes";

type Props = {};

const WIDTH_EXPANDED = 230;
const WIDTH_COLLAPSED = 50;

const LayoutSidebar = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState("1");

  const menuItems = createMenus(routes);

  useEffect(() => {
    const activeMenuKey = getMenuKeyFromPath(routes, location.pathname);
    if (activeMenuKey) setActiveMenuKey(activeMenuKey);
    setMounted(true);
  }, [location.pathname, mounted]);

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={WIDTH_EXPANDED}
      collapsedWidth={WIDTH_COLLAPSED}
    >
      <div className="pt-9 pb-12 text-center">
        {!collapsed ? (
          <p className="text-white text-3xl font-bold ">JP ADMIN</p>
        ) : (
          <p className="text-white text-xl font-bold ">JP</p>
        )}
      </div>
      <Menu
        className="text-white font-normal text-lg"
        theme="dark"
        selectedKeys={[activeMenuKey]}
        mode="inline"
        items={menuItems}
      />
    </Layout.Sider>
  );
};

export default LayoutSidebar;
