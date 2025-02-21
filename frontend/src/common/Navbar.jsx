import { NavLink } from 'react-router';

function Navbar() {
  return (
    <div>
      <ul>
        <NavLink to="/">Home</NavLink>
        <NavLink to="tasks">Tasks</NavLink>
        <NavLink to="profile">Profile</NavLink>
        <NavLink to="auth/login">Login</NavLink>
      </ul>
    </div>
  );
}

export default Navbar;
