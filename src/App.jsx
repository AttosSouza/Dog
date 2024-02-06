import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/Styles/global.css';
import Signup from './pages/Signup';
import { UserStorage } from './context/UserContext';
import User from './pages/Account/User';
import ProtectedRoute from './components/Helper/ProtectedRoute';
import Photo from './components/Photo/Photo';
import UserProfile from './pages/Account/UserProfile';
import NotFound from './pages/NotFound';
import LoginPasswordLost from './pages/PasswordLost/LoginPasswordLost';
import LoginPasswordReset from './pages/PasswordReset/LoginPasswordReset';

const App = () => {
  return (
    <BrowserRouter>
      <UserStorage>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="account/*"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route path="photo/:id" element={<Photo />} />
          <Route path="profile/:user" element={<UserProfile />} />
          <Route path="/passwordlost" element={<LoginPasswordLost />} />
          <Route path="/passwordreset" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserStorage>
    </BrowserRouter>
  );
};

export default App;
