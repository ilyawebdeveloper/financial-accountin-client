import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar.tsx';

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-roboto pb-20 text-white">
      <SideBar />
      {/* <Header /> */}
      <div className="container ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
