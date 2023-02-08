import Dashboard from "@/pages/Dashboard";
import IRoute from "@/utils/helpers/route.helper";
import { HomeOutlined } from "@ant-design/icons";

const routes: IRoute[] = [
  {
    path: "/",
    key: "dashboard",
    name: "Dashboard",
    component: Dashboard,
    icon: HomeOutlined,
  },
  
];

export default routes;
