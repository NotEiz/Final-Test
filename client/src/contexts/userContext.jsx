import { createContext } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../components/hooks/useLocalStorage";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const isLoggedIn = !!user;

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export { UserContext, UserProvider };
