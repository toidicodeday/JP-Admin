import IRoute from "@/utils/helpers/route.helper";
import { lazy } from "react";

const Forbidden = lazy(() => import("../pages/Error/Forbidden"));
const NotFound = lazy(() => import("../pages/Error/NotFound"));
const Unauthorize = lazy(() => import("../pages/Error/Unauthorize"));

const routes: IRoute[] = [
  {
    path: "/403",
    key: "/403",
    name: "Forbidden",
    component: Forbidden,
  },
  {
    path: "/404",
    key: "/404",
    name: "Not Found",
    component: NotFound,
  },
  {
    path: "/401",
    key: "/401",
    name: "Not Authorize",
    component: Unauthorize,
  },
];

export default routes;
