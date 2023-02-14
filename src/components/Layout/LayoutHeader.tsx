import { loggedOut } from "@/store/authSlice";
import { getMenuKeyFromPath } from "@/utils/helpers/menu.helper";
import { Avatar, Dropdown, Layout, MenuProps } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import avatar from "@images/avatar.svg";
import routes from "@/routes/protected-routes";

const LayoutHeader: React.FC = () => {
  const location = useLocation();
  const [activeMenuKey, setActiveMenuKey] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const activeMenuKey = getMenuKeyFromPath(routes, location.pathname);
    if (activeMenuKey) setActiveMenuKey(activeMenuKey);
  }, [location.pathname]);

  const pageHeaderTitle = useMemo(() => {
    switch (activeMenuKey) {
      case "dashboard":
        return "DASHBOARD";
      case "staff":
        return "QUẢN LÝ NHÂN SỰ";
      case "project":
      case "project-edit":
        return "QUẢN LÝ DỰ ÁN";
      case "finance":
        return "QUẢN LÝ TÀI CHÍNH";
      case "report":
        return "BÁO CÁO";
      case "salary":
        return "BẢNG LƯƠNG";
      default:
        return activeMenuKey;
    }
  }, [activeMenuKey]);

  const handleLogout = () => {
    dispatch(loggedOut());
    navigate("/login");
  };
  const handleAccount = () => {
    navigate("/account")
  }
  const dropdownMenu: MenuProps["items"] = [
    { key: "logout", label: "Đăng xuất", onClick: handleLogout },
    { key: "account", label: "Account Infomation", onClick: handleAccount },

  ];

  return (
    <Layout.Header className="!px-0 !h-20 bg-white">
      <div className="h-full w-full px-4 flex justify-between items-center">
        <p className="font-bold text-lg">{pageHeaderTitle.toUpperCase()}</p>

        <Dropdown menu={{ items: dropdownMenu }} trigger={["click"]}>
          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar src={avatar} size="large" />
            <p className="text-base">Admin_01</p>
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default LayoutHeader;
