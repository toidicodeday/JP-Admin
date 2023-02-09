import { Route, Routes, Navigate } from "react-router-dom";
import {
  createProtectedRoute,
  createRoute,
  createUnauthenRoute,
} from "@/utils/helpers/route.helper";
import protectedRoutes from "./protected-routes";
import publicRoutes from "./public-routes";
import loginRoutes from "./login-routes";
import MainLayout from "@/components/Layout/MainLayout";
import useReinitSessionLoggedIn from "@/hooks/useReinitSessionLoggedIn";

type Props = {};

const AppRoutes = (props: Props) => {
  const { isUserLogin } = useReinitSessionLoggedIn();
  console.log('❌ ~ AppRoutes ~ isUserLogin', isUserLogin)

  return (
    <Routes>
      {publicRoutes.map((route) => createRoute(route, ""))}
      {loginRoutes.map((route) => createUnauthenRoute(route, "", isUserLogin))}

      {!isUserLogin && (
        <Route
          key="loginPath"
          path="*"
          element={<Navigate to="/login" replace />}
        />
      )}

      {isUserLogin && (
        <Route element={<MainLayout />}>
          {protectedRoutes.map((route) =>
            createProtectedRoute(route, "/", isUserLogin)
          )}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
