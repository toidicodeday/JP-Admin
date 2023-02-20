import authService from "./authServices";
import courseServices from "./courseServices";
import lessonService from "./lessonService";
import questionService from "./questionService";

const api = {
  auth: authService,
  course: courseServices,
  lesson: lessonService,
  question: questionService
};

export default api;
