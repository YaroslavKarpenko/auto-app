import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { removeUser } from '../store/user/slice';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(removeUser());
  };

  const navigate = useNavigate();
  const { isAuth, username } = useAuth();

  return (
    <div className="flex flex-row items-center px-80 h-14 text-xl gap-10 text-gray-300">
      {isAuth ? (
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row gap-10">
            <button
              onClick={() => {
                navigate('/');
              }}
              className=" hover:underline underline-offset-[6px] decoration-[3px] transition-all	duration-200	ease-in-out">
              Головна
            </button>
            <button
              onClick={() => {
                navigate('/myAds');
              }}
              className=" hover:underline underline-offset-[6px] decoration-[3px] transition-all	duration-200	ease-in-out">
              Мої оголошення
            </button>
          </div>
          <div className="flex flex-row gap-3">
            <Link to={'/aboutMe'} className="flex flex-row items-center">
              {username}
              <PersonIcon fontSize="small" />
            </Link>
            <button
              onClick={handleLogOut}
              className=" hover:underline underline-offset-[6px] decoration-[3px] transition-all	duration-200	ease-in-out">
              Вийти <LogoutIcon fontSize="small" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <Link
            to={'/signIn'}
            className=" hover:underline underline-offset-[6px] decoration-[3px] transition-all	duration-200	ease-in-out">
            Увійти
          </Link>
          <Link
            to={'/signUp'}
            className=" hover:underline underline-offset-[6px] decoration-[3px] transition-all	duration-200	ease-in-out">
            Зареєструватися
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
