import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userEmail, setUserEmail] = useState(""); 

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const clickHandler = () => {
    navigate("/login");
  };

  const isLoginPage = location.pathname === "/login"; 
  const isListPage = location.pathname === "/dashboard"; 

  return (
    <header className="topNav">
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              className="nav__logo"
              src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
              alt=""
            />
          </Link>

          <div className="navbar">
            <form className="d-flex align-items-center" role="search">
              <select className="form-select me-3" aria-label="Language selection">
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>

              {isLoginPage || !userEmail ? (
                <button
                  className="btn btn-danger"
                  style={{ width: "150px" }} 
                  onClick={clickHandler}
                >
                  Sign In
                </button>
              ) : (
                <span className="text-white">
                  Logged in as <strong>{userEmail}</strong>
                </span>
              )}
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;