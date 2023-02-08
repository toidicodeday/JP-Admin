import { useTypedDispatch, useTypedSelector } from "@/store";
import { saveAuthToken } from "@/store/authSlice";
import { selectAccessToken } from "@/store/authSlice/selector";
import { STORAGE } from "@/utils/constants/storage.constant";
import Cookies from "js-cookie";
import { useEffect, useMemo } from "react";

const useReinitAccessToken = () => {
  const dispatch = useTypedDispatch();
  const accessToken = useTypedSelector(selectAccessToken);

  const isUserLogin = useMemo(
    () => Boolean(accessToken) || Boolean(Cookies.get(STORAGE.ACCESS_TOKEN)),
    [accessToken]
  );

  useEffect(() => {
    const cookiesAccessToken = Cookies.get(STORAGE.ACCESS_TOKEN);
    const cookiesRefreshToken = Cookies.get(STORAGE.REFRESH_TOKEN);
    if (cookiesAccessToken && accessToken === null) {
      dispatch(
        saveAuthToken({
          accessToken: cookiesAccessToken,
          refreshToken: cookiesRefreshToken,
        })
      );
    }
  }, [dispatch, accessToken]);

  // console.log("accessToken", {
  //   cookesAccessToken: Cookies.get(STORAGE.ACCESS_TOKEN),
  //   accessToken,
  // });

  return { isUserLogin };
};

export default useReinitAccessToken;
