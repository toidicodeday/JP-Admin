import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import Account from "@/pages/Account";
import IRoute from "@/utils/helpers/route.helper";
import { HomeOutlined } from "@ant-design/icons";
import CourseCreate from "@/pages/Courses/CourseCreate";
import { FaBook } from 'react-icons/fa';
import { ImHome } from 'react-icons/im';
import { MdAccountCircle } from 'react-icons/md';


const routes: IRoute[] = [
  {
    path: "/",
    key: "dashboard",
    name: "Dashboard",
    component: Dashboard,
    icon: ImHome,
  },
  {
    path: "/courses",
    key: "courses",
    name: "Courses",
    component: Courses,
    icon: FaBook,
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
  {
    path: "/account",
    key: "account",
    name: "",
    component: Account,
    icon: MdAccountCircle,
    hidden: true,
  },
];

export default routes;
