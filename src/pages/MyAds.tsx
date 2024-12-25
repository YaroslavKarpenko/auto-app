import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../api/ads';
import { useAppSelector } from '../store/hooks';
import { selectToken } from '../store/user/selectors';
import { CircularProgress } from '@mui/material';

const MyAds = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const token = useAppSelector(selectToken);
  const [ads, setAds] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!isAuth) {
      navigate('/signIn');
    }
    if (token) {
      setIsLoading(true); // Начало загрузки
      api
        .fetchAllAdsForCurrentUser(token)
        .then((data) => {
          setAds(data);
        })
        .catch((error) => {
          console.error('Ошибка загрузки объявлений:', error);
        })
        .finally(() => {
          setIsLoading(false); // Завершение загрузки
        });
    }
  }, [isAuth, navigate, token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-500">
        <CircularProgress />
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-500">
        Оголошення не знайдено.
      </div>
    );
  }

  return (
    <div className="mx-80 mt-10">
      <div className="gap-5">
        <h2 className="flex mb-10 items-start justify-center text-3xl text-gray-300">
          Мої оголошення
        </h2>
        <div className="flex flex-col flex-wrap gap-6">
          {ads.map((ad) => (
            <div key={ad.id} className="w-full flex p-4 bg-gray-300 rounded-lg shadow-md">
              <div className="w-1/3 relative">
                <img src={ad.image} alt={ad.name} className="w-full h-48 object-cover rounded-md" />
              </div>

              <div className="w-2/3 pl-20 flex flex-col justify-between items-center text-xl">
                <div className=" gap-2 flex flex-col">
                  <h2 className=" text-3xl font-bold">{ad.mark + ' ' + ad.model} </h2>

                  <p className=" text-gray-600">
                    Пробіг: {ad.race} км | Рік випуску: {ad.releaseYear}
                  </p>
                  <p className=" text-green-500 text-2xl font-semibold">{ad.cost}$</p>
                  <p className=" text-gray-600">Знаходиться: {ad.address}</p>
                  <button className="bg-gray-900 hover:bg-gray-800 transition-all	duration-200	ease-in-out text-gray-300 text-lg w-full justify-center px-5 py-1 rounded-xl shadow-custom">
                    <Link to={`/myAds/${ad.id}`}>Детальніше</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAds;
