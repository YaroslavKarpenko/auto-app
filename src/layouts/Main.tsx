import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout: React.FC = () => {
  return (
    <>
      <div className=" flex flex-col min-h-screen bg-gradient-to-b  from-gray-900 to-gray-500">
        <Header />
        <div className="h-[1px] w-full bg-gray-300"></div>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
