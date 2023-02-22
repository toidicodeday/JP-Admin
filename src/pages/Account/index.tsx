import { Form, Input, message, Modal, Spin, Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import accountImg from "@images/account-img.png";
import AccountInfoTabs from "./components/AccountInfoTabs";
import ChangePasswordTabs from "./components/ChangePasswordTabs";
import { Models } from "appwrite";
import { useTypedSelector } from "@/store";
import { selectUserMe } from "@/store/authSlice/selector";
import api from "@/services";
import { useDispatch } from "react-redux";
import { saveUserMe } from "@/store/authSlice";
import { RiEditBoxFill } from "react-icons/ri";

const Account = () => {
  const accountInfo = useTypedSelector(selectUserMe);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<string>();
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  useEffect(() => {
    if (accountInfo?.prefs?.avatar) {
      const userAvatar = api.file.previewImage(accountInfo?.prefs?.avatar);
      setAvatar(userAvatar.href || accountImg);
    } else {
      setAvatar(accountImg);
    }
  }, [accountInfo?.prefs?.avatar]);

  const items: TabsProps["items"] = [
    {
      key: "accountInfo",
      label: `Account Infomation`,
      children: <AccountInfoTabs />,
    },
    {
      key: "changePasswod",
      label: `Change password`,
      children: <ChangePasswordTabs />,
    },
  ];

  const onUpdateUserAvatar = async (file: File) => {
    setLoadingAvatar(true);
    const response = await api.file.uploadImage(file);

    if (response) {
      const responseAvatar = await api.auth.updateUserMePref({
        avatar: response.$id,
      });
      if (responseAvatar) {
        message.success("Update avatar successful!");
        dispatch(saveUserMe(responseAvatar));
      }
    }
    setLoadingAvatar(false);
  };

  return (
    <div className="pt-6 px-8 pb-10">
      <div className="bg-white">
        <div className="flex justify-center">
          <Spin spinning={loadingAvatar}>
            <label className=" w-44 h-44 block group mt-9 mb-12 rounded-full cursor-pointer border border-solid border-slate-100">
              <input
                type="file"
                value=""
                accept="image/*"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    onUpdateUserAvatar(e.target.files[0]);
                  }
                }}
              />
              <img
                className="w-full h-full object-cover rounded-full "
                src={avatar || accountImg}
                alt=""
                onLoadStart={() => setLoadingAvatar(true)}
                onLoadedData={() => setLoadingAvatar(false)}
                onError={() => setLoadingAvatar(false)}
              />
              <div className="group-hover:opacity-100 opacity-0 bg-slate-500/40 w-44 h-44 absolute top-0 left-0 rounded-full flex justify-center items-center">
                <RiEditBoxFill className="text-white text-3xl" />
              </div>
            </label>
          </Spin>
        </div>
        <div className="px-12 pb-52">
          <Tabs defaultActiveKey="accountInfo" items={items} />
        </div>
      </div>
    </div>
  );
};

export default Account;
