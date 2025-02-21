import { NavLink } from 'react-router';

function AuthNav() {
  return (
    <div>
      <ul className={`p-2 pt-5`}>
        <NavLink className='logo text-2xl' to="/">Fluxen</NavLink>
      </ul>
    </div>
  );
}

export default AuthNav;
