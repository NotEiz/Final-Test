import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <AppRoutes />
    </>
  );
};

export default App;
