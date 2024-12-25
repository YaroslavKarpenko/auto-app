/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Form from '../components/Form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createUser } from '../store/user/slice';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { selectLoadingStatusUser } from '../store/user/selectors';
import { LoadingStatus } from '../store/ad/slice';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const loadingStatus = useAppSelector(selectLoadingStatusUser);

  React.useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const form = event.target as HTMLFormElement;
      const email = form.email.value;
      const username = form.username.value;
      const password = form.password.value;
      const phone = form.phone.value;
      dispatch(createUser({ username, password, email, phone }));
    } catch (error: unknown) {
      setErrorMessage('error' as string);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      {loadingStatus === LoadingStatus.PENDING ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center px-40 mt-20">
          <h1 className="text-3xl font-bold mb-8">Sign up</h1>
          <span className="flex flex-row mb-4">
            Already have an account?{' '}
            <Link to={'/signIn'} className="flex underline">
              Log in
            </Link>
          </span>
          <Form
            onSubmit={(e) => handleSignUp(e)}
            className="flex flex-col gap-3 items-center justify-center">
            <Form.Input
              name="email"
              placeholder="email"
              type="email"
              className="flex w-56 rounded-xl px-3 py-1 shadow-custom"
            />
            <Form.Input
              name="username"
              type="name"
              placeholder="name"
              className="flex w-56 rounded-xl px-3 py-1 shadow-custom"
            />
            <Form.Input
              name="password"
              placeholder="password"
              type="password"
              className="flex w-56 rounded-xl px-3 py-1 shadow-custom"
            />
            <Form.Input
              name="phone"
              placeholder="phone"
              type="phone"
              className="flex w-56 rounded-xl px-3 py-1 shadow-custom"
            />
            <Form.Submit className="mb-3">Sign up</Form.Submit>
          </Form>
          {errorMessage && (
            <Alert variant="outlined" severity="error">
              {errorMessage}
            </Alert>
          )}
        </div>
      )}
    </>
  );
};

export default SignUp;
