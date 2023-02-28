import LoginPage from "@/pages/LoginPage";
import ForgotPassword from "@/pages/LoginPage/components/ForgotPassword";
import ResetPassword from "@/pages/LoginPage/components/ResetPassword";
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
    path: "/reset-password",
    key: "reset-pass",
    name: "resetPass",
    component: ResetPassword
  },
  {
    path: "/forgot-password",
    key: "forgot-pass",
    name: "forgotPass",
    component: ForgotPassword
  }
];

export default routes;
