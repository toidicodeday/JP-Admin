import authService from "./authServices";
import courseServices from "./courseServices";
import fileService from "./fileService";
import lessonService from "./lessonService";
import questionService from "./questionService";

const api = {
  auth: authService,
  course: courseServices,
  lesson: lessonService,
  question: questionService,
  file: fileService,
};

export default api;
