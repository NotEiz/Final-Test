import { useContext } from "react";
import { Link } from "react-router-dom";
import { StyledHeader } from "./styled/StyledHeader";
import { StyledNavBar } from "./styled/NavItems";
import { HOME_PATH, LOGIN_PATH, REGISTER_PATH } from "../routes/routeConsts";
import { UserContext } from "../contexts/userContext";
import LogoutIcon from "@mui/icons-material/Logout";
const Header = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header>
      <StyledHeader>
        <StyledNavBar>
          {!isLoggedIn && (
            <Link to={REGISTER_PATH} onClick={handleLogout}>
              Register
            </Link>
          )}
          <Link to={HOME_PATH}>Home</Link>
          {isLoggedIn ? (
            <Link to={HOME_PATH} onClick={handleLogout}>
              <LogoutIcon className="logout" />
            </Link>
          ) : (
            <Link to={LOGIN_PATH}>Login</Link>
          )}
        </StyledNavBar>
      </StyledHeader>
    </header>
  );
};

export default Header;
