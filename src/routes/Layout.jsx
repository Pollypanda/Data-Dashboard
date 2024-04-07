import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <div className="nav-links">
          <div className="nav-link" key="home-button">
            <Link to="/" className="link">
              {/* <span className="text">Home</span> */}
            </Link>
          </div>
          {/* <div className="nav-link" key="about-button">
            <Link to="/about" className="link">
              <span className="text">About</span>
            </Link>
          </div> */}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
