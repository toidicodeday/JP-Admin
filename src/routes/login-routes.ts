import LoginPage from "@/pages/LoginPage";
import MissPassLayout from "@/pages/LoginPage/components/MissPassLayout";
import IRoute from "@/utils/helpers/route.helper";

const routes: IRoute[] = [
  {
    path: "/",
    key: "redirectLogin",
    name: "redirectLogin",
    redirect: "/login",
  },
  {
    path: "/login",
    key: "login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/miss-pass",
    key: "miss-pass",
    name: "MissPass",
    component: MissPassLayout
  }
];

export default routes;
