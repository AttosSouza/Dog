import React from 'react';
import { UserContext } from '../../context/UserContext';
import { Link, Route, Routes } from 'react-router-dom';
import UserHeader from './UserHeader';
import Feed from '../../components/Feed';
import UserPhotoPost from './UserPhotoPost';
import Gallery from './Gallery';
import NotFound from '../NotFound';

const User = () => {
  const { data } = React.useContext(UserContext);
  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="post" element={<UserPhotoPost />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
