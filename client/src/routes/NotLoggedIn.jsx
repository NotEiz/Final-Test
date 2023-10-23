import { Routes, Route } from "react-router-dom";
import { routes } from "./routeConsts";

const NotLoggedIn = () => {
  return (
    <>
      <Routes>
        {routes.slice(0, 4).map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </>
  );
};

export default NotLoggedIn;
