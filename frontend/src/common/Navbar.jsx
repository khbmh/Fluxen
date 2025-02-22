import { useContext } from 'react';
import { NavLink, Link } from 'react-router';
import { AuthContext } from '../contexts/AuthProvider';
import { DataContext } from '../contexts/Data';
import { HiOutlineSun } from 'react-icons/hi2';
import { PiMoonStarsLight } from 'react-icons/pi';

function Navbar() {
  const { user } = useContext(AuthContext);
  const { handleDark, isDark } = useContext(DataContext);
  return (
    <div className="h-[10vh] lg:h-[12vh] w-full">
      <ul
        className={`grid grid-cols-4 items-center justify-between gap-4 p-2 fixed w-full h-[8vh] lg:h-[10vh]  ${
          isDark ? 'text-[#030a00] bg-[#f8fff5]' : 'text-[#f8fff5] bg-[#030a00]'
        } `}
      >
        <Link className="col-span-1 justify-baseline logo text-2xl" to="/">
          Fluxen
        </Link>
        <ul className="flex col-span-2 justify-center items-center gap-3 md:gap-8 lg:gap-16">
          <NavLink to="/">Home</NavLink>
          <NavLink to="tasks">Tasks</NavLink>
          {user ? (
            <NavLink to="profile">Profile</NavLink>
          ) : (
            <NavLink to="auth/login">Login</NavLink>
          )}
        </ul>

        <button
          className="flex justify-end col-span-1 text-2xl"
          onClick={handleDark}
        >
          {isDark ? <PiMoonStarsLight /> : <HiOutlineSun />}
        </button>
      </ul>
    </div>
  );
}

export default Navbar;
