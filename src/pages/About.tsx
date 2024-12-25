import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectToken } from '../store/user/selectors';
import { fetchUserInformation } from '../api/user';

interface User {
  id: string;
  username: string;
  registrationDate: string;
  phone: string;
  carCount: string;
}

const About = () => {
  const token = useAppSelector(selectToken);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    if (token) {
      fetchUserInformation(token).then((data) => setUser(data));
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-80 mt-10 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Про мене</h1>
      {user ? (
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold">Ім'я користувача:</span>
              <span className="text-gray-800">{user.username}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold">Дата реєстрації:</span>
              <span className="text-gray-800">{user.registrationDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold">Телефон:</span>
              <span className="text-gray-800">{user.phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold">Кількість оголошень:</span>
              <span className="text-gray-800">{user.carCount}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-600">Завантаження інформації про користувача...</div>
      )}
    </div>
  );
};

export default About;
