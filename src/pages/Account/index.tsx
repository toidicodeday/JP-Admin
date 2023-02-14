import { Tabs, TabsProps } from 'antd';
import React from 'react';
import accountImg from '../../assets/images/account-img.png'
import AccountInfoTabs from './AccountTabs/AccountInfoTabs';
import ChangePasswordTabs from './AccountTabs/ChangePasswordTabs';

const onChange = (key: string) => {
    console.log(key);
  };
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Account Infomation`,
      children: <AccountInfoTabs/>,
    },
    {
      key: '2',
      label: `Change password`,
      children: <ChangePasswordTabs/>,
    },
  ];
  

const Account = () =>{
  return (
    <div className='pt-6 px-8 pb-10'>
     <div className="bg-white">
     <div className="flex justify-center">
        <img className='w-44 h-44 mt-9 mb-12' src={accountImg} alt="" />
      </div>
     <div className="px-12 pb-52">
     <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
     </div>
     </div>
    </div>
  );
}

export default Account;
