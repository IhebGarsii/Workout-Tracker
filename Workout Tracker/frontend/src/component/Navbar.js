import { Link } from "react-router-dom";
import { useLogOut } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogOut();
  const { user } = useAuthContext();

  const handelLogout = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>workout body</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handelLogout}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link id="signup-nav" to="/signup">
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
