import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/Main';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyAds from './pages/MyAds';
import Car from './pages/Car';
import UsersAds from './pages/UsersAds';
import CurrentUserAd from './pages/CurrentUserAd';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/myAds" element={<MyAds />} />
        <Route path="/myAds/:id" element={<CurrentUserAd />} />
        <Route path="/ads/:id" element={<Car />} />
        <Route path="/user/:id" element={<UsersAds />} />
        <Route path="/aboutMe" element={<About />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;

