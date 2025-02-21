import { Outlet } from 'react-router';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import ScrollSave from '../utils/ScrollSave';
import { useContext } from 'react';
import { DataContext } from '../contexts/Data';

function MainLayout() {
  const { isDark } = useContext(DataContext);
  return (
    <div
      className={`${
        isDark ? 'text-[#030a00]  bg-[#f8fff5]' : 'text-[#f8fff5] bg-[#030a00]'
      }`}
    >
      <Navbar />
      <div className="container mx-auto min-h-screen">
        <ScrollSave />
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
}

export default MainLayout;
