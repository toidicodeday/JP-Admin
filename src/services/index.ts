import authService from "./authServices";
import courseServices from "./courseServices";

const api = {
  auth: authService,
  course: courseServices
};

export default api;
