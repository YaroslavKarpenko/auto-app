import React from 'react';
import NewAd from '../components/NewAd';
import AdsList from '../components/AdsList';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import CarSearchFilter from '../components/CarSearchFilter';
import Pagination from '../components/Pagination';

const Data: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  React.useEffect(() => {
    if (!isAuth) {
      navigate('/signIn');
    }
  }, [isAuth, navigate]);

  return isAuth ? (
    <div className={`mx-80 mt-10 min-h-screen`}>
      <div className="flex flex-row mb-5">
        <NewAd />
        <CarSearchFilter />
      </div>
      <AdsList />
      <Pagination />
    </div>
  ) : (
    ''
  );
};

export default Data;
