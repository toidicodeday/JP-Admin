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
    setAvatar(accountInfo?.prefs?.avatar);
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

  const [visibleModal, setVisibleModal] = useState(false);
  const [avatarInputText, setAvatarInputText] = useState("");
  const updateUserAvatar = async () => {
    setLoadingAvatar(true);
    const response = await api.auth.updateUserMePref({
      avatar: avatarInputText,
    });
    setLoadingAvatar(false);
    setVisibleModal(false);
    if (response) {
      message.success("Update avatar successful!");
      dispatch(saveUserMe(response));
    }
  };

  return (
    <div className="pt-6 px-8 pb-10">
      <div className="bg-white">
        <div className="flex justify-center">
          <Spin spinning={loadingAvatar}>
            <div
              className="group mt-9 mb-12 rounded-full cursor-pointer"
              onClick={() => {
                if (!loadingAvatar) {
                  setVisibleModal(true);
                  setAvatarInputText(avatar || "");
                }
              }}
            >
              <img
                className="w-44 h-44 object-cover rounded-full"
                src={avatar || accountImg}
                alt=""
                onLoadStart={() => setLoadingAvatar(true)}
                onLoadedData={() => setLoadingAvatar(false)}
                onError={() => setLoadingAvatar(false)}
              />
              <div className="group-hover:opacity-100 opacity-0 bg-slate-500/40 w-44 h-44 absolute top-0 left-0 rounded-full flex justify-center items-center">
                <RiEditBoxFill className="text-white text-3xl" />
              </div>
            </div>
          </Spin>
        </div>
        <div className="px-12 pb-52">
          <Tabs defaultActiveKey="accountInfo" items={items} />
        </div>
      </div>
      <Modal
        title="Update avatar"
        open={visibleModal}
        onOk={updateUserAvatar}
        onCancel={() => setVisibleModal(false)}
        okButtonProps={{ loading: loadingAvatar }}
      >
        <Input
          value={avatarInputText}
          onChange={(e) => setAvatarInputText(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Account;
