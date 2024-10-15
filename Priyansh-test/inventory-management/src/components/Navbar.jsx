import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Navbar.css'; 

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">InventoryApp(Home)</Link>
      <div className="nav-links">
        {currentUser ? (
          <>
            <Link to="/dashboard">Dashboard(Form)</Link>
            <Link to="/selling" className="nav-btn">Selling</Link> 
            <Link to="/admin" className="nav-btn">Admin</Link> 
            <button onClick={logout} className="nav-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/signup" className="nav-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
