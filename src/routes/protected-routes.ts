import Dashboard from "@/pages/Dashboard";
import CourseList from "@/pages/CoursesPage/CourseList";
import Account from "@/pages/Account";
import IRoute from "@/utils/helpers/route.helper";
// import { HomeOutlined } from "@ant-design/icons";
import CourseCreate from "@/pages/CoursesPage/CourseCreate";
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
    component: CourseList,
    icon: FaBook,
    children: [
      {
        path: "/courses-create",
        key: "courses detail",
        name: "Courses Create",
        component: CourseCreate,
        hidden: true,
      },
      {
        path: "/:id",
        key: "courses edit",
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
