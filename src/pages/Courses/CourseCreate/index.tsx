import { Tabs, TabsProps } from 'antd';
import React from 'react';
import InfoTab from './Tabs/InfoTab';
import LessonTab from './Tabs/LessonTab'

const CourseCreate = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `General Infomation`,
      children: <InfoTab />,
    },
    {
      key: '2',
      label: `Lessons`,
      children: <LessonTab />,
      disabled: true
    },
  ];
  return (
    <div className="pt-6 px-8 pb-10">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default CourseCreate;
