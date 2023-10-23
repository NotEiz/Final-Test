import { useContext } from "react";
import LoggedIn from "./routes/LoggedIn";
import NotLoggedIn from "./routes/NotLoggedIn";
import Header from "./components/Header";
import { UserContext } from "./contexts/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <>
      <Header />
      <ToastContainer />
      {isLoggedIn ? <LoggedIn /> : <NotLoggedIn />}
    </>
  );
};

export default App;
