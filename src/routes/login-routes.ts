import LoginPage from "@/pages/LoginPage";
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
];

export default routes;
