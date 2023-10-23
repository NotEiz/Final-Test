import { Routes, Route } from "react-router-dom";
import { routes } from "./routeConsts";
console.log(routes.slice(0, 4));
const LoggedIn = () => {
  return (
    <>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </>
  );
};

export default LoggedIn;
