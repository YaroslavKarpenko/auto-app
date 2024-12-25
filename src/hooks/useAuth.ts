import { useAppSelector } from '../store/hooks';
import { selectToken, selectUsername } from '../store/user/selectors';

const useAuth = () => {
  const username = useAppSelector(selectUsername);
  const token = useAppSelector(selectToken);

  return {
    isAuth: !!token,
    username,
    token,
  };
};

export default useAuth;
