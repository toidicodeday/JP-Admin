import { useTypedDispatch, useTypedSelector } from "@/store";
import { saveLoggedInInfo } from "@/store/authSlice";
import { selectSessionId } from "@/store/authSlice/selector";
import { STORAGE } from "@/utils/constants/storage.constant";
import Cookies from "js-cookie";
import { useEffect, useMemo } from "react";

const useReinitSessionLoggedIn = () => {
  const dispatch = useTypedDispatch();
  const sessionId = useTypedSelector(selectSessionId);

  const cookieSessionId =
    Cookies.get(STORAGE.SESSION_ID) !== "undefined"
      ? Cookies.get(STORAGE.SESSION_ID)
      : undefined;

  const isUserLogin = useMemo(
    () => Boolean(sessionId || cookieSessionId),
    [cookieSessionId, sessionId]
  );

  useEffect(() => {
    const cooessionId =
      Cookies.get(STORAGE.SESSION_ID) !== "undefined"
        ? Cookies.get(STORAGE.SESSION_ID)
        : undefined;

    if (sessionId === null && cooessionId) {
      dispatch(
        saveLoggedInInfo({
          userId: Cookies.get(STORAGE.USER_ID) || "",
          sessionId: Cookies.get(STORAGE.SESSION_ID) || "",
        })
      );
    }
  }, [dispatch, sessionId]);

  return { isUserLogin };
};

export default useReinitSessionLoggedIn;
