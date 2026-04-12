 import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="top-bar">
        Development version — features and content may change
        <span className="resources">View resources</span>
      </div>

      <div className="nav-bar">
        <div className="logo">
          <div className="logo-box">BS</div>
          <div>
            <strong>Booking System</strong>
            <p className="subtitle">Secure resource booking</p>
          </div>
        </div>

        {/* ADD THIS */}
        <div style={{ marginLeft: "auto" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/form">Form</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;