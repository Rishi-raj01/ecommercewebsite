import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { isDarkTheme, toggleTheme } = useTheme();

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("User logged out successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className={`container-fluid bg-${isDarkTheme ? 'dark' : 'light'}`}>
        <button className="navbar-toggler" type="button" onClick={handleToggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>

        <Link to="/" className={`navbar-brand ${isDarkTheme ? 'text-light' : 'text-dark'}`} style={{ fontSize: "2.2rem" }}>
          <GiShoppingBag style={{ marginRight: '0.5rem' }} />
          Ecommerce App
        </Link>

        <button className="btn btn-outline-secondary ms-3" onClick={toggleTheme}>
          {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
        </button>

        <div className={`${isCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <SearchInput />
            </li>
            <li className="nav-item d-flex align-items-center">
              {!auth.user ? (
                <>
                  <NavLink to="/signup" className={`nav-link ${isDarkTheme ? 'text-light' : 'text-dark'} me-2`}>
                    Signup
                  </NavLink>
                  <NavLink to="/login" className={`nav-link ${isDarkTheme ? 'text-light' : 'text-dark'}`}>
                    Login
                  </NavLink>
                </>
              ) : (
                <div className="dropdown">
                  <NavLink className={`nav-link dropdown-toggle ${isDarkTheme ? 'text-light' : 'text-dark'}`} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {auth?.user?.name}
                  </NavLink>
                  <ul className={`dropdown-menu ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                    <li>
                      <NavLink to={`/dashboard/${auth?.user?.role === "admin" ? "admin" : "user"}`} className="dropdown-item">
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink onClick={handleLogout} className="dropdown-item" to="#">
                        Logout
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className={`nav-link ${isDarkTheme ? 'text-light' : 'text-dark'}`}>
                <Badge count={cart?.length} showZero offset={[10, -5]}>
                  Cart
                </Badge>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
