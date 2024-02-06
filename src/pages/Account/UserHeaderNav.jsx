import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import MyPhotos from '../../assets/Icons/feed.svg?react';
import Gallery from '../../assets/Icons/gallerytest.svg?react';
import Add from '../../assets/Icons/add.svg?react';
import Logout from '../../assets/Icons/logout.svg?react';

import styles from './UserHeaderNav.module.css';
import useMedia from '../../hooks/useMedia';

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);

  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    navigate('/');
  }

  const { pathname } = useLocation();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/account" end>
          <MyPhotos />
          {mobile ? 'Home' : 'Home'}
        </NavLink>
        <NavLink to="/account/gallery">
          <Gallery />
          {mobile ? 'Gallery' : 'Gallery'}
        </NavLink>
        <NavLink to="/account/post">
          {' '}
          <Add />
          {mobile ? 'Post Photos' : 'Post photos'}
        </NavLink>
        <button onClick={handleLogout}>
          {' '}
          <Logout />
          {mobile ? 'Logout' : 'Log out'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
