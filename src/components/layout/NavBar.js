import { Link, NavLink } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav >
      {props.user && <span >{props.user.username} in da house!</span>}
      <ul className="nav justify-content-end flex-column flex-sm-row">

        <li className="nav-item">
          <Link to="/home" className="nav-link">Write</Link>
        </li>

        <li className="nav-item">
          <NavLink to="/blog" className="nav-link">More</NavLink>
        </li>

        <li className="nav-item">
          <NavLink to='/' className="nav-link">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
