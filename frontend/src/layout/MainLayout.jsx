import { Outlet } from 'react-router';
import Navbar from '../common/Navbar';

function MainLayout() {
  return (
    <div className=''>
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
