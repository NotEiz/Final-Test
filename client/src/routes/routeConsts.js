import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Question from "../pages/Question";
import NewQuesstionForm from "../pages/NewQuestionForm";
import EditQuestionForm from "../pages/EditQuestionForm";
import EditAnswer from "../pages/EditAnswer";

export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const QUESTION_PATH = "/:id";
export const NEW_QUESTION_PATH = "/new";
export const EDIT_QUESTION_PATH = `${QUESTION_PATH}/edit`;
export const EDIT_ANSWER_PATH = `/:id/editAnswer`;

export const navbarLinks = [
  { title: "Login", path: LOGIN_PATH },
  { title: "Home", path: HOME_PATH },
  { title: "Register", path: REGISTER_PATH },
];

export const routes = [
  { path: HOME_PATH, Component: Home },
  { path: LOGIN_PATH, Component: Login },
  { path: REGISTER_PATH, Component: Register },
  { path: QUESTION_PATH, Component: Question },
  { path: NEW_QUESTION_PATH, Component: NewQuesstionForm },
  { path: EDIT_QUESTION_PATH, Component: EditQuestionForm },
  { path: EDIT_ANSWER_PATH, Component: EditAnswer },
];
