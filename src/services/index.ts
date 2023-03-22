import authService from "./authServices";
import courseServices from "./courseServices";
import fileService from "./fileService";
import lessonService from "./lessonService";
import questionService from "./questionService";
import teamService from "./teamService";
import userService from "./userService";

const api = {
  auth: authService,
  course: courseServices,
  lesson: lessonService,
  question: questionService,
  file: fileService,
  team: teamService,
  user: userService,
};

export default api;
