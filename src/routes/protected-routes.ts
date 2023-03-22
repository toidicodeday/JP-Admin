import Dashboard from "@/pages/Dashboard";
import CourseList from "@/pages/CoursesPage/CourseList";
import Account from "@/pages/Account";
import IRoute from "@/utils/helpers/route.helper";
import CourseCreate from "@/pages/CoursesPage/CourseCreate";
import { FaBook } from 'react-icons/fa';
import { ImHome } from 'react-icons/im';
import { HiUserGroup } from 'react-icons/hi';
import { MdAccountCircle } from 'react-icons/md';
import TeamPage from "@/pages/TeamPage";
import Admin from "@/pages/TeamPage/components/Members";
import Members from "@/pages/TeamPage/components/Members";
import UserPage from "@/pages/UserPage";
import UserAction from "@/pages/UserPage/UserAction";


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
        key: "courses create",
        name: "Courses Create",
        component: CourseCreate,
        hidden: true,
      },
      {
        path: "/:id",
        key: "courses edit",
        name: "Courses edit",
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
  {
    path: "/team",
    key: "team",
    name: "Team Manager",
    component: TeamPage,
    icon: HiUserGroup,
    children: [
      {
        path: "/member",
        key: "member",
        name: "Member",
        component: Members,
        hidden: true,
        children: [
          {
            path: "/:id",
            key: "admin member",
            name: "Admin member",
            component: Admin,
            hidden: true,
          }
        ]
      },
    ],
  },
  {
    path: "/users",
    key: "users",
    name: "User Manager",
    component: UserPage,
    icon: MdAccountCircle,
    children: [
      {
        path: "/:id",
        key: "user action",
        name: "User Action",
        component: UserAction,
        hidden: true
      }
    ]
  }
];

export default routes;
