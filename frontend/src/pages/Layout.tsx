import { Outlet, Link } from "react-router-dom";
import "./pages.scss"

const Layout = () => {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="dropdown navigation">
        <div className="navbar-item has-dropdown is-hoverable">
          <div className="navbar-link">
            <img src="https://w7.pngwing.com/pngs/267/362/png-transparent-computer-icons-encapsulated-postscript-others-miscellaneous-button-icon-burger-menu.png" alt="Menu" />
          </div>
          <div className="navbar-dropdown">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/profile" className="navbar-item">Profile</Link>
            <hr className="navbar-divider"/>
            <div className="navbar-item">
              Version 0.1.0
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;
