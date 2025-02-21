import { Outlet } from 'react-router';
import AuthNav from '../common/AuthNav';

function AuthLayout() {
  return (
    <div className="">
      <AuthNav />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
