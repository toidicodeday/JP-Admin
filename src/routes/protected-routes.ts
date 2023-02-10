import Dashboard from "@/pages/Dashboard";
import Courses  from "@/pages/Courses";
import CourseDetail from "@/pages/Courses/CourseCreate";
import IRoute from "@/utils/helpers/route.helper";
import { HomeOutlined } from "@ant-design/icons";
import CourseCreate from "@/pages/Courses/CourseCreate";

const routes: IRoute[] = [
  {
    path: "/",
    key: "dashboard",
    name: "Dashboard",
    component: Dashboard,
    icon: HomeOutlined,
  },
  {
    path: "/courses",
    key: "courses",
    name: "Courses",
    component: Courses,
    icon: HomeOutlined,
    children: [
      {
        path: "/courses-create",
        key: "courses detail",
        name: "Courses Detail",
        component: CourseCreate,
        hidden: true,
      },
    ],
  },
];

export default routes;
