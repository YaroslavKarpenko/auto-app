import React from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/ads';
import { useAppSelector } from '../store/hooks';
import { selectToken } from '../store/user/selectors';

interface CarData {
  id: string;
  name: string;
  race: number;
  releaseYear: number;
  mark: string;
  model: string;
  ownerName: string;
  ownerPhone: string;
  cost: number;
  image: string;
  address: string;
  description: string;
  publicDate: string;
  ownerId: string;
}

const Car = () => {
  const { id } = useParams<{ id: string }>();
  const token = useAppSelector(selectToken);
  const [car, setCar] = React.useState<CarData>();

  React.useEffect(() => {
    if (token && id) {
      api.fetchSingleAd(token, id).then((data) => {
        console.log(data);
        setCar(data);
      });
    }
  }, [token, id]);

  return (
    <>
      {car && (
        <div className="mx-80 mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img src={car.image} alt={car.name} className="w-full h-96 object-cover rounded-lg" />
            </div>
            <div className="md:w-1/2 ml-4 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
              <p className="text-lg mb-2">
                {car.mark} {car.model}
              </p>
              <p className="text-lg mb-2">Рік випуску: {car.releaseYear}</p>
              <p className="text-lg mb-2">Пробіг: {car.race} км</p>
              <p className="text-lg mb-2">Ціна: {car.cost} $</p>
              <p className="text-lg mb-2">Дата створення: {car.publicDate}</p>
              <p className="text-lg mb-2">Локація: {car.address}</p>
              <div className="flex items-center mt-4">
                <button
                  onClick={() => {
                    console.log(car.ownerId);
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  <Link to={`/user/${car.ownerId}`}>Оголошення цього користувача</Link>
                </button>
              </div>
              <div className="mt-6 p-4 border-t-2 border-gray-200">
                <h2 className="text-xl font-bold">Опис</h2>
                <p className="text-gray-700 mt-2">{car.description}</p>
              </div>
              <div className="mt-6 p-4 border-t-2 border-gray-200">
                <h2 className="text-xl font-bold">Контакти власника</h2>
                <p className="text-gray-700 mt-2">Ім'я: {car.ownerName}</p>
                <p className="text-gray-700 mt-1">Телефон: {car.ownerPhone}</p>
              </div>
              <button
                onClick={() => window.history.back()}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Назад
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Car;
