import api from "@/services";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Card, Layout, Statistic } from "antd";
import { useEffect, useState } from "react";
import bookLover from "@images/book-lover.png";

type Props = {
  //
};

const INIT_TOTAL = 0;

const HomePage = (props: Props) => {
  const [totalCourse, setTotalCourse] = useState(INIT_TOTAL);
  const [totalLesson, setTotalLesson] = useState(INIT_TOTAL);
  const [totalQuestion, setTotalQuestion] = useState(INIT_TOTAL);
  const [totalUser, setTotalUser] = useState(INIT_TOTAL);
  const [totalAdmin, setTotalAdmin] = useState(INIT_TOTAL);

  useEffect(() => {
    api.course.getCourseTotal().then(setTotalCourse);
    api.lesson.getLessonTotal().then(setTotalLesson);
    api.question.getQuestionTotal().then(setTotalQuestion);
  }, []);

  return (
    <div className="pt-6 px-8 pb-10">
      <div className="flex flex-wrap gap-3">
        <Card className="grow bg-purple-300">
          <Statistic title="Total course" value={totalCourse} />
        </Card>
        <Card className="grow bg-green-300">
          <Statistic title="Total lesson" value={totalLesson} />
        </Card>
        <Card className="grow bg-pink-300">
          <Statistic title="Total question" value={totalQuestion} />
        </Card>
      </div>
      <div className="flex justify-center py-6">
        <img className="w-96 h-96" src={bookLover} alt="DashboardImage" />
      </div>
    </div>
  );
};

export default HomePage;
