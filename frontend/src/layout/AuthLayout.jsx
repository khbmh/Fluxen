import { Outlet } from 'react-router';
import AuthNav from '../common/AuthNav';
import { DataContext } from '../contexts/Data';
import { useContext } from 'react';
import Navbar from '../common/Navbar';

function AuthLayout() {
  const { isDark } = useContext(DataContext);
  return (
    <div
      className={`${
        isDark ? 'text-[#030a00]  bg-[#f8fff5]' : 'text-[#f8fff5] bg-[#030a00]'
      }`}
    >
      {/* <AuthNav /> */}
      <Navbar/>
      <div className="container mx-auto min-h-screen mt-[20vh]">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
