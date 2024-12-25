import React from 'react';
import CarSearchFilter from './CarSearchFilter';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectToken } from '../store/user/selectors';
import { selectAdList, selectLoadingStatus } from '../store/ad/selectors';
import { selectMark, selectModel, selectPage } from '../store/filter/selectors';
import { initializeAds, LoadingStatus } from '../store/ad/slice';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const AdsList: React.FC = () => {
  const loadingStatus = useAppSelector(selectLoadingStatus);
  const token = useAppSelector(selectToken);
  const ads = useAppSelector(selectAdList);
  const page = useAppSelector(selectPage);
  const markId = useAppSelector(selectMark);
  const modelId = useAppSelector(selectModel);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (token) {
      dispatch(initializeAds({ token, page, markId, modelId }));
    }
  }, [dispatch, page, token, markId, modelId]);

  return (
    <>
      {loadingStatus === LoadingStatus.PENDING ? (
        <div className="flex justify-center items-center min-h-screen mt-[-100px]">
          <CircularProgress />
        </div>
      ) : (
        <div className="gap-5">
          <div className="flex flex-col flex-wrap gap-6">
            {ads.map((ad) => (
              <div key={ad.id} className="w-full flex p-4 bg-gray-300 rounded-lg shadow-md">
                <div className="w-1/3 relative">
                  <img
                    src={ad.image}
                    alt={ad.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>

                <div className="w-2/3 pl-20 flex flex-col justify-between items-center text-xl">
                  <div className=" gap-2 flex flex-col">
                    <h2 className=" text-3xl font-bold">{ad.mark + ' ' + ad.model} </h2>

                    <p className=" text-gray-600">
                      Пробіг: {ad.race} км | Рік випуску: {ad.releaseYear}
                    </p>
                    <p className=" text-green-500 text-2xl font-semibold">{ad.cost}$</p>
                    <p className=" text-gray-600">Локація: {ad.address}</p>
                    <button className="bg-gray-900 hover:bg-gray-800 transition-all	duration-200	ease-in-out text-gray-300 text-lg w-full justify-center px-5 py-1 rounded-xl shadow-custom">
                      <Link to={`/ads/${ad.id}`}>Детальніше</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdsList;
